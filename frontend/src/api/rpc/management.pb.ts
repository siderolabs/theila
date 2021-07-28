/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CommonTheila from "../common/theila.pb"
import * as fm from "../fetch.pb"
import * as GoogleProtobufEmpty from "../google/protobuf/empty.pb"

export enum TaskStatusSpecPhase {
  FAILED = "FAILED",
  RUNNING = "RUNNING",
  COMPLETE = "COMPLETE",
}

export type UpgradeInfoResponse = {
  fromVersion?: string
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

export type KubernetesVersionSpec = {
  version?: string
}

export class ManagementService {
  static UpgradeInfo(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<UpgradeInfoResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, UpgradeInfoResponse>(`/management.ManagementService/UpgradeInfo`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
}