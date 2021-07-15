// This Runtime Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ResourceService as WrappedResourceService, CreateRequest } from './rpc/resource.pb';
import { ContextService as WrappedContextService, ListContextsRequest, ListContextsResponse } from './rpc/context.pb';
import { Runtime, Context, Cluster } from './common/theila.pb';
import { MachineService as WrappedMachineService } from './talos/machine/machine.pb';
import { GetRequest, ListRequest, Metadata, Spec } from './talos/resource/resource.pb';
import { context, getContext } from '../context';
import { backOff, IBackOffOptions } from "exponential-backoff";
import { ref, Ref } from 'vue';
import { RouteLocationNormalized } from 'vue-router';

const pathPrefix = "/api";
const prefix = {pathPrefix: pathPrefix};

type OptionsPartial = {
  runtime?: Runtime
  metadata?: Object
}

export const getCluster = (route: RouteLocationNormalized) => {
  const res = {};
  const query = route.query;

  if(query.cluster)
    res["cluster"] = query.cluster;

  if(query.uid)
    res["uid"] = query.uid

  if(query.namespace)
    res["namespace"] = query.namespace;

  return res;
}

export class Options {
  public headers: Headers;
  public pathPrefix: string = pathPrefix;
  public signal: AbortSignal;

  private controller: AbortController = new AbortController()

  constructor(runtime?: Runtime, metadata?: Object) {
    this.headers = new Headers();
    this.signal = this.controller.signal;

    if(!runtime)
      runtime = Runtime.Kubernetes;

    const md = metadata ? metadata : {};
    md["runtime"] = runtime.toString();

    if(context.current.value) {
      md["context"] = md["context"] || getContext(runtime);
    }

    for(const key in md) {
      this.headers.append(`Grpc-Metadata-${key}`, md[key]);
    }
  }

  public abort() {
    this.controller.abort();
  }

  public static fromPartial(obj?: Partial<OptionsPartial>): Options {
    if(!obj)
      return new Options();

    return new Options(obj.runtime, obj.metadata);
  }
}

export const subscribe = (method: Function, params: Object, handler: Function, options?: OptionsPartial) => {
  return new Stream(method, params, handler, options);
}

export class Stream {
  private stopped: boolean = false;
  private options: Options;

  public err: Ref<any> = ref(null);

  constructor(method: Function, params: Object, handler: Function, options?: Partial<OptionsPartial>) {
    const backoffOptions:Partial<IBackOffOptions> = {
      numOfAttempts: Infinity,
      startingDelay: 5000,
      maxDelay: 500 * 1000,
      jitter: "full",
      retry: () => !this.stopped,
    };

    const opts = options || {};

    this.options = Options.fromPartial(opts);

    backOff(async () => {
      try {
        this.err.value = null;

        await method(params, (resp) => {
          if(resp.metadata && resp.metadata.error) {
            throw new Error(resp.metadata.error);
          } else {
            handler(resp);
          }
        }, this.options);
      } catch(e) {
        handler({
          error: e,
        });

        this.err.value = e.toString();
        throw e;
      }
    }, backoffOptions).catch((e) => {
      this.err.value = e.toString();
    });
  }

  public shutdown() {
    this.stopped = true;
    this.options.abort();
  }
}

type Resource = {
  metadata?: Metadata,
  spec: any,
  type: any,
};

// define a wrapper for grpc resource service.
export class ResourceService {
  static async Get(request: GetRequest, options?: Partial<OptionsPartial>): Promise<Object> {
    const res = await WrappedResourceService.Get(request, Options.fromPartial(options));
    if (res.body == null) {
      throw new Error("empty body in the response");
    }

    return JSON.parse(res.body);
  }

  static async List(request: ListRequest, options?: Partial<OptionsPartial>): Promise<Object[]> {
    const res = await WrappedResourceService.List(request, Options.fromPartial(options));
    if (res.messages == null) {
      throw new Error("empty body in the response");
    }

    const results:Object[] = [];

    for (const raw of res.messages) {
      results.push(JSON.parse(raw));
    }

    return results;
  }

  static async Create(resource: Partial<Resource>, options?: Partial<OptionsPartial>): Promise<void> {
    const protoSpec = resource.type.encode(resource.type.fromPartial(resource.spec)).finish();

    const request: CreateRequest = {
      resource: {
        metadata: resource.metadata,
        spec: {
          protoSpec: protoSpec,
        }
      }
    }

    monkeyPatchUint8Array(request);

    await WrappedResourceService.Create(request, Options.fromPartial(options));
  }
  
  static async GetConfig(cluster: Cluster, options?: Partial<OptionsPartial>): Promise<string> {
    const res = await WrappedResourceService.GetConfig(cluster, Options.fromPartial(options));

    if(!res.data) {
      return "";
    }

    return res.data;
  }
}

export const MachineService = createProxy(WrappedMachineService);
export const ContextService = createProxy(WrappedContextService);

// TODO: workaround for https://github.com/grpc-ecosystem/protoc-gen-grpc-gateway-ts/issues/22
// remove when the PR is merged to upstream
function monkeyPatchUint8Array(data: any) {
  for(const key in data) {
    if(typeof data[key] === 'object') {
      monkeyPatchUint8Array(data[key]);
    }

    if(data[key].constructor === Uint8Array) {
      data[key].toJSON = () => {
        return btoa(new TextDecoder().decode(data[key]));
      }
    }
  }
}

function createProxy(service: any): any {
  const handler = {
    get(target: any, prop: any, receiver: any) {
      if(target[prop] && (typeof target[prop]) === "function") {
        return (...args: any[]) => {
          if(args.length == 0) {
            args.push({});
          }

          const opts = args[args.length - 1];
          // check if the last arg is a function (streaming request)
          // or if has only a single argument
          if((typeof opts) === "function" || args.length == 1)
            args.push(prefix);
          else if(opts.metadata) // it's the partial object, so it should be converted
            args[args.length - 1] = Options.fromPartial(opts)

          return target[prop](...args);
        };
      }

      return target[prop];
    }
  }

  return new Proxy(service, handler)
}
