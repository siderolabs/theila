// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ClusterResourceService, GetFromClusterRequest, ListFromClusterRequest, ConfigRequest} from './resource.pb';
import { ContextService as WrappedContextService, ListContextsRequest, ListContextsResponse } from './context.pb';
import { Source, Context } from '../common/theila.pb';
import { context } from '../context';

const prefix = {pathPrefix: "/api"};

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

// define a wrapper for grpc clusters service.
export class ContextService {
  static List(): Promise<ListContextsResponse> {
    return WrappedContextService.List({}, prefix);
  }
}
