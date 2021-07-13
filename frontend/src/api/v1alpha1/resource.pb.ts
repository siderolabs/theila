/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufTimestamp from "../google/protobuf/timestamp.pb"
export type Metadata = {
  namespace?: string
  type?: string
  id?: string
  version?: string
  owner?: string
  phase?: string
  created?: GoogleProtobufTimestamp.Timestamp
  updated?: GoogleProtobufTimestamp.Timestamp
  finalizers?: string[]
}

export type Spec = {
  protoSpec?: Uint8Array
  yamlSpec?: string
}

export type Resource = {
  metadata?: Metadata
  spec?: Spec
}