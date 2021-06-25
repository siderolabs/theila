// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ClusterResourceService, GetFromClusterRequest, ListFromClusterRequest, ConfigRequest} from './resource.pb';
import { ContextService as WrappedContextService, ListContextsRequest, ListContextsResponse } from './context.pb';
import { MachineService as WrappedMachineService } from '../talos/machine/machine.pb';
import { Source, Context } from '../common/theila.pb';
import { context } from '../context';
import { backOff, IBackOffOptions } from "exponential-backoff";
import { ref, Ref } from 'vue';

const pathPrefix = "/api";
const prefix = {pathPrefix: pathPrefix};

export class Options {
  public headers: Headers;
  public pathPrefix: String = pathPrefix;
  public signal: AbortSignal;

  private controller: AbortController = new AbortController()

  constructor(source?: Source, metadata?: Object) {
    this.headers = new Headers();
    this.signal = this.controller.signal;

    if(!source)
      source = Source.Kubernetes;

    const md = metadata ? metadata : {};
    md["source"] = source.toString();

    if(context.current.value) {
      md["context"] = md["context"] || source === Source.Talos ? context.current.value.cluster : context.current.value.name;
    }

    for(const key in md) {
      this.headers.append(`Grpc-Metadata-${key}`, md[key]);
    }
  }

  public abort() {
    this.controller.abort();
  }
}

export const subscribe = (method: Function, params: Object, handler: Function, options?: Options) => {
  return new Stream(method, params, handler, options);
}

export class Stream {
  private stopped: boolean = false;
  private options: Options;

  public err: Ref<any> = ref(null);

  constructor(method: Function, params: Object, handler: Function, options?: Options) {
    const backoffOptions:Partial<IBackOffOptions> = {
      numOfAttempts: Infinity,
      startingDelay: 5000,
      maxDelay: 500 * 1000,
      jitter: "full",
      retry: () => !this.stopped,
    };

    const opts = options || new Options();

    this.options = opts;

    backOff(async () => {
      try {
        this.err.value = null;

        await method(params, handler, opts);
      } catch(e) {
        handler({
          error: e,
        });

        this.err.value = e;
        throw e;
      }
    }, backoffOptions).catch((e) => {
      this.err.value = e;
    });
  }

  public shutdown() {
    this.stopped = true;
    this.options.abort();
  }
}


function populateCurrentContext(source?: Source, ctx?: Context) {
  let res = ctx;
  if (context.current.value) {
    if (!res) {
      res = {};
    }

    if (res && !res.name) {
      res.name = source == Source.Talos ? context.current.value.cluster : context.current.value.name;
    }
  }

  return res;
}

// define a wrapper for grpc resource service.
export class ResourceService {
  static async Get(request: GetFromClusterRequest): Promise<Object> {
    request.context = populateCurrentContext(request.source, request.context);

    const res = await ClusterResourceService.Get(request, prefix);
    if (res.body == null) {
      throw new Error("empty body in the response");
    }

    return JSON.parse(res.body);
  }

  static async List(request: ListFromClusterRequest): Promise<Object[]> {
    request.context = populateCurrentContext(request.source, request.context);

    const res = await ClusterResourceService.List(request, prefix);
    if (res.messages == null) {
      throw new Error("empty body in the response");
    }

    const results:Object[] = [];

    for (const raw of res.messages) {
      results.push(JSON.parse(raw));
    }

    return results;
  }
  
  static async GetConfig(request: ConfigRequest): Promise<string> {
    request.context = populateCurrentContext(request.source, request.context);

    const res = await ClusterResourceService.GetConfig(request, prefix);

    if(!res.data) {
      return "";
    }

    return res.data;
  }
}

// define a wrapper for grpc machine service.
export const MachineService = createProxy(WrappedMachineService);
export const ContextService = createProxy(WrappedContextService);

function createProxy(service: any): any {
  const handler = {
    get(target: any, prop: any, receiver: any) {
      if(target[prop] && (typeof target[prop]) === "function") {
        return (...args: any[]) => {
          if(args.length == 0) {
            args.push({});
          }

          if(!args[args.length - 1].pathPrefix)
            args.push(prefix);

          return target[prop](...args);
        };
      }

      return target[prop];
    }
  }

  return new Proxy(service, handler)
}
