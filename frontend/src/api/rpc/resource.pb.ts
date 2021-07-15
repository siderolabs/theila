/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CommonTheila from "../common/theila.pb"
import * as fm from "../fetch.pb"
import * as ResourceResource from "../talos/resource/resource.pb"
import * as CosiResourceResource from "../v1alpha1/resource.pb"

export enum TaskStatusSpecPhase {
  FAILED = "FAILED",
  RUNNING = "RUNNING",
  COMPLETE = "COMPLETE",
}

export type GetResponse = {
  body?: string
}

export type ListResponse = {
  messages?: string[]
}

export type CreateRequest = {
  resource?: CosiResourceResource.Resource
}

export type CreateResponse = {
}

export type UpdateRequest = {
  currentVersion?: string
  resource?: CosiResourceResource.Resource
}

export type UpdateResponse = {
}

export type DeleteRequest = {
  namespace?: string
  type?: string
  id?: string
}

export type DeleteResponse = {
}

export type ConfigResponse = {
  data?: string
}

export type UpgradeK8sSpec = {
  fromVersion?: string
  toVersion?: string
  context?: CommonTheila.Context
}

export type TaskStatusSpec = {
  phase?: TaskStatusSpecPhase
  progress?: number
  error?: string
}

export type TaskLogSpec = {
  line?: string
}

export class ResourceService {
  static Get(req: ResourceResource.GetRequest, initReq?: fm.InitReq): Promise<GetResponse> {
    return fm.fetchReq<ResourceResource.GetRequest, GetResponse>(`/theila.resource.ResourceService/Get`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static List(req: ResourceResource.ListRequest, initReq?: fm.InitReq): Promise<ListResponse> {
    return fm.fetchReq<ResourceResource.ListRequest, ListResponse>(`/theila.resource.ResourceService/List`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Create(req: CreateRequest, initReq?: fm.InitReq): Promise<CreateResponse> {
    return fm.fetchReq<CreateRequest, CreateResponse>(`/theila.resource.ResourceService/Create`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Update(req: UpdateRequest, initReq?: fm.InitReq): Promise<UpdateResponse> {
    return fm.fetchReq<UpdateRequest, UpdateResponse>(`/theila.resource.ResourceService/Update`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Delete(req: DeleteRequest, initReq?: fm.InitReq): Promise<DeleteResponse> {
    return fm.fetchReq<DeleteRequest, DeleteResponse>(`/theila.resource.ResourceService/Delete`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static GetConfig(req: CommonTheila.Cluster, initReq?: fm.InitReq): Promise<ConfigResponse> {
    return fm.fetchReq<CommonTheila.Cluster, ConfigResponse>(`/theila.resource.ResourceService/GetConfig`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
}