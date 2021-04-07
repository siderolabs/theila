// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { v4 as uuidv4 } from 'uuid';

// Message is an abstract websocket connection message.
export class Message { 
  public uid: string;
  public kind: Kind = Kind.None;
  public spec: any;

  constructor(kind?: Kind, spec?: any) {
    if (kind)
      this.kind = kind;

    this.spec = spec;
    this.uid = uuidv4();
  }

  public encode(): string {
    return JSON.stringify({
      "kind": this.kind,
      "spec": this.spec,
      "metadata": {
        "uid": this.uid,
      }
    })
  }
  
  public decode(data: string): void {
    const parsed:Object = JSON.parse(data);
    
    this.kind = parsed["kind"];
    this.spec = parsed["spec"];
    this.uid = parsed["metadata"]["uid"];
  }
}

// Source defines available resource data backends.
export enum Source {
  // Kubernetes reads from Kubernetes same as kubectl does.
  Kubernetes = "kubernetes",
  // Talos reads from gRPC and Talos controller-runtime.
  Talos = "talos",
}

export enum Kind {
  // Client -> Server
  None = "None",
  Watch = "Watch",
  Unsubscribe = "Unsubscribe",
  Update = "EventItemUpdate",
  Add = "EventItemAdd",
  Delete = "EventItemDelete",

  // Server -> Client
  Error = "Error"
}

// WatchRequest initializes resource watch.
export class WatchRequest extends Message {
  /**
   * @param src: The source for resource requests,
   * which is either Talos, that pulls the data from Talos gRPC,
   * or Kubernetes, which pulls the data from Kubernetes control-plane.
   * @param resource: The resource name. For Talos it should be resource definition.
   * For Kubernetes it should be either crd or a built-in type (e.g. pod, node and such).
   */
  constructor(src: Source, resource: string) {
    super(Kind.Watch, {
      "source": src,
      "resource": resource,
    });
  }
}

// UnsubscribeRequest stops resource watch.
export class UnsubscribeRequest extends Message {
  /**
   * @param: uid: Subscription UID.
   */
  constructor(uid: string) {
    super(Kind.Unsubscribe, {
      "uid": uid,
    });
  }
}
