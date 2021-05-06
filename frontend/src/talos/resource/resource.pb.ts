/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CommonCommon from "../../common/common.pb"
import * as fm from "../../fetch.pb"

export enum EventType {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  DESTROYED = "DESTROYED",
}

export type Resource = {
  metadata?: Metadata
  spec?: Spec
}

export type Metadata = {
  namespace?: string
  type?: string
  id?: string
  version?: string
  owner?: string
  phase?: string
  finalizers?: string[]
}

export type Spec = {
  yaml?: Uint8Array
}

export type GetRequest = {
  namespace?: string
  type?: string
  id?: string
}

export type Get = {
  metadata?: CommonCommon.Metadata
  definition?: Resource
  resource?: Resource
}

export type GetResponse = {
  messages?: Get[]
}

export type ListRequest = {
  namespace?: string
  type?: string
}

export type ListResponse = {
  metadata?: CommonCommon.Metadata
  definition?: Resource
  resource?: Resource
}

export type WatchRequest = {
  namespace?: string
  type?: string
  id?: string
}

export type WatchResponse = {
  metadata?: CommonCommon.Metadata
  eventType?: EventType
  definition?: Resource
  resource?: Resource
}

export class ResourceService {
  static Get(req: GetRequest, initReq?: fm.InitReq): Promise<GetResponse> {
    return fm.fetchReq<GetRequest, GetResponse>(`/resource.ResourceService/Get`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static List(req: ListRequest, entityNotifier?: fm.NotifyStreamEntityArrival<ListResponse>, initReq?: fm.InitReq): Promise<void> {
    return fm.fetchStreamingRequest<ListRequest, ListResponse>(`/resource.ResourceService/List`, entityNotifier, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Watch(req: WatchRequest, entityNotifier?: fm.NotifyStreamEntityArrival<WatchResponse>, initReq?: fm.InitReq): Promise<void> {
    return fm.fetchStreamingRequest<WatchRequest, WatchResponse>(`/resource.ResourceService/Watch`, entityNotifier, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
}