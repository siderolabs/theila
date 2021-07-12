/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

export enum Source {
  Kubernetes = "Kubernetes",
  Talos = "Talos",
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