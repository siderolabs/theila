/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CommonTheila from "../common/theila.pb"
import * as fm from "../fetch.pb"
import * as ResourceResource from "../talos/resource/resource.pb"
export type GetFromClusterRequest = {
  resource?: ResourceResource.GetRequest
  context?: CommonTheila.Context
  source?: CommonTheila.Source
}

export type GetFromClusterResponse = {
  body?: string
}

export type ListFromClusterRequest = {
  resource?: ResourceResource.ListRequest
  context?: CommonTheila.Context
  source?: CommonTheila.Source
  selectors?: string[]
}

export type ListFromClusterResponse = {
  messages?: string[]
}

export type ConfigRequest = {
  cluster?: CommonTheila.Cluster
  source?: CommonTheila.Source
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
  static GetConfig(req: ConfigRequest, initReq?: fm.InitReq): Promise<ConfigResponse> {
    return fm.fetchReq<ConfigRequest, ConfigResponse>(`/resource.ClusterResourceService/GetConfig`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
}