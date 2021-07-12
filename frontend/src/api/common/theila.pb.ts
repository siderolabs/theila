/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

export enum Runtime {
  Kubernetes = "Kubernetes",
  Talos = "Talos",
  Theila = "Theila",
}

export type Cluster = {
  name?: string
  namespace?: string
  uid?: string
}

export type Context = {
  name?: string
  cluster?: Cluster
  nodes?: string[]
}