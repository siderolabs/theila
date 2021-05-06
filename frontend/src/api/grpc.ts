// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ClusterResourceService, GetFromClusterRequest, ListFromClusterRequest} from './resource.pb';

const prefix = {pathPrefix: "api"};

// define a wrapper for grpc resource service.
export class ResourceService {
  static async Get(request: GetFromClusterRequest): Promise<Object> {
    const res = await ClusterResourceService.Get(request, prefix);
    if (res.body == null) {
      throw new Error("empty body in the response");
    }

    return JSON.parse(res.body);
  }

  static async List(request: ListFromClusterRequest): Promise<Object[]> {
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
}
