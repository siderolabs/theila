/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CommonTheila from "../common/theila.pb"
import * as fm from "../fetch.pb"
import * as ResourceResource from "../talos/resource/resource.pb"
export type GetFromClusterRequest = {
  resource?: ResourceResource.GetRequest
}

export type GetFromClusterResponse = {
  body?: string
}

export type ListFromClusterRequest = {
  resource?: ResourceResource.ListRequest
  selectors?: string[]
}

export type ListFromClusterResponse = {
  messages?: string[]
}

export type ConfigResponse = {
  data?: string
}

export class ClusterResourceService {
  static Get(req: GetFromClusterRequest, initReq?: fm.InitReq): Promise<GetFromClusterResponse> {
    return fm.fetchReq<GetFromClusterRequest, GetFromClusterResponse>(`/resource.ClusterResourceService/Get`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static List(req: ListFromClusterRequest, initReq?: fm.InitReq): Promise<ListFromClusterResponse> {
    return fm.fetchReq<ListFromClusterRequest, ListFromClusterResponse>(`/resource.ClusterResourceService/List`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static GetConfig(req: CommonTheila.Cluster, initReq?: fm.InitReq): Promise<ConfigResponse> {
    return fm.fetchReq<CommonTheila.Cluster, ConfigResponse>(`/resource.ClusterResourceService/GetConfig`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
}