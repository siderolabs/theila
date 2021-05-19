// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { reactive, ref } from 'vue';
import { Client, Callback, ClientReconnected } from './client';
import { Source, Context } from '../common/theila';
import { Message, WatchSpec, UnsubscribeSpec, Kind } from './message';
import { v4 as uuidv4 } from 'uuid';

export class SubscriptionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SubscriptionError";
  }
}

export interface CompareFunc {
  (a: Object, b: Object): number;
}

export default class Watch {
  private client: Client;
  private source?: Source;
  private resource?: Object;
  private uid!: string;
  private callback: Callback;
  private context?: Object;
  private handler?: any;
  private compare?: CompareFunc;

  public items: any;
  public loading: any;
  public err: any;
  public running: any;

  constructor(client: Client) {
    this.client = client;
    this.handler = this.handleReconnect.bind(this);

    this.items = ref([]);
    this.loading = ref(false);
    this.err = ref("");
    this.running = ref(false);

    this.callback = (message: Message) => {
      const spec = JSON.parse(message.spec);
      let index = 0;
      let foundIndex = -1;

      switch(message.kind) {
        case Kind.EventItemAdd:
          foundIndex = this.findIndex(spec);
          if(foundIndex != -1) {
            return;
          }

          index = getInsertionIndex(this.items.value, spec, this.compare);

          this.items.value.splice(index, 0, spec);

          break;
        case Kind.EventItemDelete:
          foundIndex = this.findIndex(spec);
          if(foundIndex != -1) {
            this.items.value.splice(foundIndex, 1);
          }
          break;
        case Kind.EventItemUpdate:
          foundIndex = this.findIndex(spec["old"]);
          if(foundIndex != -1) {
            this.items.value[foundIndex] = spec["new"];
          }
          break;
        case Kind.EventError:
          this.stop();
          this.err.value = spec;
          break;
      }
    };
  }

  public async start(source: Source, resource: Object, context?: Object, compare?: CompareFunc): Promise<Message> {
    this.loading.value = true;
    this.err.value = "";
    this.items.value.splice(0, this.items.value.length);

    this.source = source;
    this.resource = resource;
    this.context = context;
    this.compare = compare;

    const params = {
      resource: this.resource,
      source: this.source,
    }

    if (this.context) {
      params["context"] = Context.fromPartial(this.context);
    }

    const watchSpec = WatchSpec.fromPartial(params);

    const watchRequest = newMessage(
      Kind.Watch,
      watchSpec,
    );

    let message:Message;

    try {
      message = await this.client.send(watchRequest);

      if (!message.spec) {
        throw new Error("empty spec in the response");
      }

      const spec = JSON.parse(message.spec);

      this.client.subscribe(spec["uid"], this.callback);
      this.uid = spec["uid"];

      this.client.addListener(ClientReconnected, this.handler);
    } catch(err) {
      this.err.value = err;
      throw err;
    } finally {
      this.loading.value = false;
    }

    this.running.value = true;

    return message;
  }

  public stop(): Promise<Message> {
    this.items.value.splice(0, this.items.value.length);
    this.running.value = false;

    if (!this.uid) {
      return Promise.reject(new SubscriptionError("failed to stop: not subscribed"));
    }

    if (!this.client.unsubscribe(this.uid, this.callback)) {
      return Promise.reject(new SubscriptionError("failed to stop: not subscribed"))
    }

    const unsubscribe = newMessage(
      Kind.Unsubscribe,
      UnsubscribeSpec.fromPartial({
        uid: this.uid,
      }),
    );

    this.uid = null!;
    this.client.removeListener(ClientReconnected, this.handler);

    return this.client.send(unsubscribe);
  }

  public async handleReconnect() {
    if (this.uid == null || this.source == null || this.resource == null) {
      return;
    }

    try {
      await this.start(this.source, this.resource, this.context, this.compare);
    } catch(e) {
      console.log("failed to restart watch", e)
    }
  }

  private findIndex(item: Object): number {
    if(!this.items.value) {
      return -1;
    }

    return this.items.value.findIndex(element => {
      return this.id(element) === this.id(item);
    })
  }

  public id(item: Object): string {
    if(item["metadata"] == null) {
      return "";
    }

    const name = this.source === Source.Kubernetes ? item["metadata"]["name"] : item["metadata"]["id"];

    return `${item["metadata"]["namespace"]}.${name}`;
  }
}

function newMessage(kind: Kind, spec: any): Message {
  return Message.fromPartial({
    kind: kind,
    metadata: {
      uid: uuidv4(),
    },
    spec: JSON.stringify(spec),
  });
}

function getInsertionIndex(arr: Object[], item: Object, compare?: CompareFunc): number {
  const itemsCount = arr.length;
  if (compare == null) {
    return itemsCount;
  }

  if (itemsCount === 0) {
    return 0;
  }

  const lastItem = arr[itemsCount - 1];

  if (compare(item, lastItem) >= 0) {
    return itemsCount;
  }

  const getMidPoint = (start, end) => Math.floor((end - start) / 2) + start;
  let start = 0;
  let end = itemsCount - 1;
  let index = getMidPoint(start, end);

  while (start < end) {
    const curItem = arr[index];

    const comparison = compare(item, curItem);

    if (comparison === 0) {
      break;
    } else if (comparison < 0) {
      end = index;
    } else {
      start = index + 1;
    }
    index = getMidPoint(start, end);
  }

  return index;
}
