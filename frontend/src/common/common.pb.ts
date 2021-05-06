/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufAny from "../google/protobuf/any.pb"
import * as GoogleRpcStatus from "../google/rpc/status.pb"

export enum Code {
  FATAL = "FATAL",
  LOCKED = "LOCKED",
}

export enum ContainerDriver {
  CONTAINERD = "CONTAINERD",
  CRI = "CRI",
}

export type Error = {
  code?: Code
  message?: string
  details?: GoogleProtobufAny.Any[]
}

export type Metadata = {
  hostname?: string
  error?: string
  status?: GoogleRpcStatus.Status
}

export type Data = {
  metadata?: Metadata
  bytes?: Uint8Array
}

export type DataResponse = {
  messages?: Data[]
}

export type Empty = {
  metadata?: Metadata
}

export type EmptyResponse = {
  messages?: Empty[]
}