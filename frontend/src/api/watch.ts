// This Runtime Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { reactive, ref, watch, Ref, onMounted, onUnmounted, toRefs } from 'vue';
import { Client, Callback, ClientReconnected } from './client';
import { Runtime, Context } from './common/theila';
import { Message, WatchSpec, UnsubscribeSpec, Kind } from './socket/message';
import { v4 as uuidv4 } from 'uuid';
import { context as ctx } from '../context';

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
  private source: Runtime = Runtime.Kubernetes;
  private resource?: Object;
  private uid!: string;
  private callback: Callback;
  private context?: Object;
  private handler?: any;
  private compare?: CompareFunc;

  public sort: Ref<CompareFunc>;
  public items?: any;
  public loading: any;
  public err: any;
  public running: any;

  constructor(client: Client, items?: any, callback?: any) {
    this.client = client;
    this.handler = this.handleReconnect.bind(this);

    this.loading = ref(false);
    this.err = ref("");
    this.running = ref(false);
    this.sort = ref(defaultCompareFunc(this));

    if(items) {
      this.items = items;

      watch(this.sort, () => {
        this.items.value.sort(this.sort.value);
      });
    }

    this.callback = (message: Message) => {
      const spec = JSON.parse(message.spec);
      let index = 0;
      let foundIndex = -1;

      if(!message.metadata || message.metadata.uid != this.uid) {
        return;
      }

      if(message.kind == Kind.EventError) {
        this.stop();
        this.err.value = spec;
        return;
      }

      if(callback)
        callback(message, spec);

      if(!this.items)
        return;

      switch(message.kind) {
        case Kind.EventItemAdd:
          foundIndex = this.findIndex(spec);
          if(foundIndex != -1) {
            return;
          }

          index = getInsertionIndex(this.items.value, spec, this.sort.value);

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
      }
    };
  }

  // setup is meant to be called from the component setup method
  // and provides seamless integration with the reactive properties of the component.
  public setup(props: any, componentContext: any) {
    const {
      resource,
      context,
      kubernetes,
      talos,
      compareFn,
    } = toRefs(props);

    watch([
      resource,
      context,
      kubernetes,
      talos,
      compareFn,
      ctx.current,
    ], (val, oldVal) => {
      if(JSON.stringify(val) != JSON.stringify(oldVal)) {
        startWatch();
      }
    });

    const startWatch = async () => {
      stopWatch();

      if(!resource.value) {
        return;
      }

      let source:Runtime;

      if(kubernetes.value) {
        source = Runtime.Kubernetes;
      } else if(talos.value) {
        source = Runtime.Talos;
      } else {
        throw new Error("unknown source specified");
      }

      const compare = compareFn && compareFn.value ? compareFn.value : defaultCompareFunc(this);
      const c = {};

      if(context && context.value) {
        Object.assign(c, context.value)
      }

      // override the context name by the current default one unless it's explicitly defined
      if(ctx.current.value) {
        if(!componentContext.context || !componentContext.context.name)
          c["name"] = source == Runtime.Kubernetes ? ctx.current.value.name : ctx.current.value.cluster;
      }

      this.start(
        source,
        resource.value,
        c,
        compare,
      );
    };

    const stopWatch = async () => {
      if(this.running.value) {
        await this.stop();
      }
    };

    const handleReconnect = async () => {
      await startWatch();
    }

    onMounted(async () => {
      ctx.api.addListener(ClientReconnected, handleReconnect);

      await startWatch();
    });

    onUnmounted(async () => {
      ctx.api.removeListener(ClientReconnected, handleReconnect);

      await stopWatch();
    });
  }

  public async start(source: Runtime, resource: Object, context?: Object, compare?: CompareFunc): Promise<Message> {
    this.loading.value = true;
    this.err.value = "";

    if (this.items)
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
    if(this.items)
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
    if(!this.items || !this.items.value) {
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

    const name = this.source === Runtime.Kubernetes ? item["metadata"]["name"] : item["metadata"]["id"];

    return `${item["metadata"]["namespace"] || "default"}.${name}`;
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

export function defaultCompareFunc(w: Watch) {
  return (a, b) => {
    if(w.id(a) === w.id(b)) {
      return 0;
    } else if(w.id(a) > w.id(b)) {
      return 1;
    }

    return -1;
  };
}
