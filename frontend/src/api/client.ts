// This Runtime Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Runtime } from './common/theila';
import { Message, Kind } from './socket/message';
import { backOff, IBackOffOptions } from "exponential-backoff";
import { EventEmitter } from 'events';
import { DateTime, Duration } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

declare const client: Client;

export class SocketError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SocketError";
  }
}

export class AwaitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AwaitError";
  }
}

export class RequestError extends Error {
  public response: Message;
  constructor(response: Message) {
    let err: any = "unknown";

    if (response.spec) {
      err = JSON.parse(response.spec)["error"];
    }

    super(err);

    this.response = response;
    this.name = "RequestError";
  }
}

export interface Callback {
  (Message): void
}

interface Subscription {
  callback(Message): void
}

class AwaitCallback {
  private cb: Callback;

  constructor(cb: Callback) {
    this.cb = cb;
  }

  callback(message: Message): void {
    this.cb(message);
  }
}

const SubscriptionEvent = "subscriptionEvent";

export const ClientReconnected = "clientReconnected";
export const ClientDisconnected = "clientDisconnected";

class CallbackList extends EventEmitter {
  constructor() {
    super();
  }

  callback(message: Message): void {
    this.emit(SubscriptionEvent, message)
  }
}

// Client is used to establish connection to the websocket provided by the backend
// and defines low level methods implemented by the protocol.
export class Client extends EventEmitter {
  private ws: any = null;
  private connected: boolean = false;
  private subcriptions = new Map<string, Subscription>();
  private timeout: number = 30000;
  private address: string;
  private lastReconnect?: DateTime;

  constructor(address?: string, timeout?: number) {
    super();

    this.address = address || window.location.host;

    if (timeout) {
      this.timeout = timeout;
    }
  }

  // connect opens web socket.
  // should receive the session after that.
  public connect(timeout?: number): Promise<void> {
    this.ws = new WebSocket("ws://" + this.address + "/ws");
    this.ws.binaryType = "arraybuffer";

    this.ws.onmessage = this.onmessage.bind(this);
    this.ws.onclose = () => {
      const reconnect = this.connected;

      this.connected = false;
      this.emit(ClientDisconnected);

      if (reconnect) {
        this.reconnect();
      }
    }

    return new Promise((resolve, reject) => {
      this.ws.onopen = (e: any) => {
        this.connected = true;

        resolve();
      }

      this.ws.onerror = (e: any) => {
        reject(e);

        this.ws.onerror = null;
      }

      setTimeout(() => {
        reject(new SocketError("timeout expired while waiting for socket to connect"));
      }, timeout || this.timeout);
    })
  }
  
  // send message to the socket and wait for server to reply using the same socket.
  public send(message: Message, timeout?: number): Promise<Message> {
    if (!this.connected) {
      throw new SocketError("socket connection not established")
    }

    if (!message.metadata) {
      message.metadata = {
        uid: uuidv4(),
      };
    }

    const uid = message.metadata.uid;

    const p:Promise<Message> = new Promise((resolve, reject) => {
      this.subcriptions[uid] = new AwaitCallback((response: Message) => {
        if (response.kind == Kind.Error) {
          reject(new RequestError(response));
        } else {
          resolve(response);
        }
      })

      const data = Message.encode(message).finish();
      this.ws.send(data);

      setTimeout(() => {
        reject(new AwaitError("timeout expired while waiting for message: " + uid + " response"));
      }, timeout || this.timeout);
    })

    p.finally(() => {
      delete this.subcriptions[uid];
    })

    return p
  }

  public subscribe(uid: string, func: Callback): void {
    if (this.subcriptions[uid] == null) {
      this.subcriptions[uid] = new CallbackList();
    }

    const callbacks:CallbackList = this.subcriptions[uid] as CallbackList;

    callbacks.addListener(SubscriptionEvent, func);
  }

  public unsubscribe(uid: string, func: Callback): boolean {
    if (this.subcriptions[uid] == null) {
      return true;
    }

    const callbacks:CallbackList = this.subcriptions[uid] as CallbackList;

    callbacks.removeListener(SubscriptionEvent, func);

    if(callbacks.listenerCount(SubscriptionEvent) == 0) {
      delete this.subcriptions[uid];

      return true;
    }

    return false;
  }

  private onmessage(event: MessageEvent): void {
    const message = Message.decode(new Uint8Array(event.data)); 

    if (!message.metadata) {
      console.error("api socket no metadata in the message", message);

      return;
    }

    const sub = this.subcriptions[message.metadata.uid];

    if (sub == null) {
      console.error("api socket orphaned message", message)

      return;
    }

    sub.callback(message);
  }

  private async reconnect() {
    console.warn("lost connection to server, reconnecting in...");

    // trottle reconnection rate in case if server has closed the connection without an error.
    if (this.lastReconnect != null) {
      const delta = this.lastReconnect.diff(DateTime.now()).milliseconds;
      const minDelay = 1000;

      const d = minDelay + minDelay * Math.random() - delta;
      if (d > 0) {
        console.log(`delay ${d}ms`)

        await delay(d);
      }
    }

    this.lastReconnect = DateTime.now();

    try {
      const backoffOptions:Partial<IBackOffOptions> = {
        numOfAttempts: Infinity,
        maxDelay: 500 * 1000,
        jitter: "full",
      };

      await backOff(async () => {
        try {
          await this.connect(this.timeout);
        } catch(e) {
          console.error("failed to connect to server", e);
          throw e;
        }
      }, backoffOptions);
    } catch(e) {
      console.error("failed to reconnect to server", e)

      return;
    }

    console.log("reconnected to server");
    this.emit(ClientReconnected);

    return;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
