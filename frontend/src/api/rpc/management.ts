/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { Context } from "../common/theila";
import { Empty } from "../google/protobuf/empty";

export const protobufPackage = "management";

export interface UpgradeInfoResponse {
  /** FromVersion is the lowest detected Kubernetes version. */
  from_version: string;
}

export interface UpgradeK8sSpec {
  /** K8s version to upgrade from. */
  from_version: string;
  /** K8s version to upgrade to. */
  to_version: string;
  /** Context to use. */
  context: Context | undefined;
}

export interface TaskStatusSpec {
  /** Upgrade task state. */
  phase: TaskStatusSpec_Phase;
  /** Progress represents the task progress [0,1]. */
  progress: number;
  /** Failure reason. */
  error: string;
}

export enum TaskStatusSpec_Phase {
  FAILED = 0,
  RUNNING = 1,
  COMPLETE = 2,
  UNRECOGNIZED = -1,
}

export function taskStatusSpec_PhaseFromJSON(
  object: any
): TaskStatusSpec_Phase {
  switch (object) {
    case 0:
    case "FAILED":
      return TaskStatusSpec_Phase.FAILED;
    case 1:
    case "RUNNING":
      return TaskStatusSpec_Phase.RUNNING;
    case 2:
    case "COMPLETE":
      return TaskStatusSpec_Phase.COMPLETE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TaskStatusSpec_Phase.UNRECOGNIZED;
  }
}

export function taskStatusSpec_PhaseToJSON(
  object: TaskStatusSpec_Phase
): string {
  switch (object) {
    case TaskStatusSpec_Phase.FAILED:
      return "FAILED";
    case TaskStatusSpec_Phase.RUNNING:
      return "RUNNING";
    case TaskStatusSpec_Phase.COMPLETE:
      return "COMPLETE";
    default:
      return "UNKNOWN";
  }
}

export interface TaskLogSpec {
  /** Line represents a single log line. */
  line: string;
}

export interface KubernetesVersionSpec {
  /** Version kubernetes version. */
  version: string;
}

const baseUpgradeInfoResponse: object = { from_version: "" };

export const UpgradeInfoResponse = {
  encode(
    message: UpgradeInfoResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.from_version !== "") {
      writer.uint32(10).string(message.from_version);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UpgradeInfoResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpgradeInfoResponse } as UpgradeInfoResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from_version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpgradeInfoResponse {
    const message = { ...baseUpgradeInfoResponse } as UpgradeInfoResponse;
    if (object.from_version !== undefined && object.from_version !== null) {
      message.from_version = String(object.from_version);
    } else {
      message.from_version = "";
    }
    return message;
  },

  toJSON(message: UpgradeInfoResponse): unknown {
    const obj: any = {};
    message.from_version !== undefined &&
      (obj.from_version = message.from_version);
    return obj;
  },

  fromPartial(object: DeepPartial<UpgradeInfoResponse>): UpgradeInfoResponse {
    const message = { ...baseUpgradeInfoResponse } as UpgradeInfoResponse;
    if (object.from_version !== undefined && object.from_version !== null) {
      message.from_version = object.from_version;
    } else {
      message.from_version = "";
    }
    return message;
  },
};

const baseUpgradeK8sSpec: object = { from_version: "", to_version: "" };

export const UpgradeK8sSpec = {
  encode(message: UpgradeK8sSpec, writer: Writer = Writer.create()): Writer {
    if (message.from_version !== "") {
      writer.uint32(10).string(message.from_version);
    }
    if (message.to_version !== "") {
      writer.uint32(18).string(message.to_version);
    }
    if (message.context !== undefined) {
      Context.encode(message.context, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UpgradeK8sSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpgradeK8sSpec } as UpgradeK8sSpec;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from_version = reader.string();
          break;
        case 2:
          message.to_version = reader.string();
          break;
        case 3:
          message.context = Context.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpgradeK8sSpec {
    const message = { ...baseUpgradeK8sSpec } as UpgradeK8sSpec;
    if (object.from_version !== undefined && object.from_version !== null) {
      message.from_version = String(object.from_version);
    } else {
      message.from_version = "";
    }
    if (object.to_version !== undefined && object.to_version !== null) {
      message.to_version = String(object.to_version);
    } else {
      message.to_version = "";
    }
    if (object.context !== undefined && object.context !== null) {
      message.context = Context.fromJSON(object.context);
    } else {
      message.context = undefined;
    }
    return message;
  },

  toJSON(message: UpgradeK8sSpec): unknown {
    const obj: any = {};
    message.from_version !== undefined &&
      (obj.from_version = message.from_version);
    message.to_version !== undefined && (obj.to_version = message.to_version);
    message.context !== undefined &&
      (obj.context = message.context
        ? Context.toJSON(message.context)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpgradeK8sSpec>): UpgradeK8sSpec {
    const message = { ...baseUpgradeK8sSpec } as UpgradeK8sSpec;
    if (object.from_version !== undefined && object.from_version !== null) {
      message.from_version = object.from_version;
    } else {
      message.from_version = "";
    }
    if (object.to_version !== undefined && object.to_version !== null) {
      message.to_version = object.to_version;
    } else {
      message.to_version = "";
    }
    if (object.context !== undefined && object.context !== null) {
      message.context = Context.fromPartial(object.context);
    } else {
      message.context = undefined;
    }
    return message;
  },
};

const baseTaskStatusSpec: object = { phase: 0, progress: 0, error: "" };

export const TaskStatusSpec = {
  encode(message: TaskStatusSpec, writer: Writer = Writer.create()): Writer {
    if (message.phase !== 0) {
      writer.uint32(8).int32(message.phase);
    }
    if (message.progress !== 0) {
      writer.uint32(21).float(message.progress);
    }
    if (message.error !== "") {
      writer.uint32(26).string(message.error);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TaskStatusSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTaskStatusSpec } as TaskStatusSpec;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.phase = reader.int32() as any;
          break;
        case 2:
          message.progress = reader.float();
          break;
        case 3:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TaskStatusSpec {
    const message = { ...baseTaskStatusSpec } as TaskStatusSpec;
    if (object.phase !== undefined && object.phase !== null) {
      message.phase = taskStatusSpec_PhaseFromJSON(object.phase);
    } else {
      message.phase = 0;
    }
    if (object.progress !== undefined && object.progress !== null) {
      message.progress = Number(object.progress);
    } else {
      message.progress = 0;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = String(object.error);
    } else {
      message.error = "";
    }
    return message;
  },

  toJSON(message: TaskStatusSpec): unknown {
    const obj: any = {};
    message.phase !== undefined &&
      (obj.phase = taskStatusSpec_PhaseToJSON(message.phase));
    message.progress !== undefined && (obj.progress = message.progress);
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  fromPartial(object: DeepPartial<TaskStatusSpec>): TaskStatusSpec {
    const message = { ...baseTaskStatusSpec } as TaskStatusSpec;
    if (object.phase !== undefined && object.phase !== null) {
      message.phase = object.phase;
    } else {
      message.phase = 0;
    }
    if (object.progress !== undefined && object.progress !== null) {
      message.progress = object.progress;
    } else {
      message.progress = 0;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    } else {
      message.error = "";
    }
    return message;
  },
};

const baseTaskLogSpec: object = { line: "" };

export const TaskLogSpec = {
  encode(message: TaskLogSpec, writer: Writer = Writer.create()): Writer {
    if (message.line !== "") {
      writer.uint32(10).string(message.line);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TaskLogSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTaskLogSpec } as TaskLogSpec;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.line = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TaskLogSpec {
    const message = { ...baseTaskLogSpec } as TaskLogSpec;
    if (object.line !== undefined && object.line !== null) {
      message.line = String(object.line);
    } else {
      message.line = "";
    }
    return message;
  },

  toJSON(message: TaskLogSpec): unknown {
    const obj: any = {};
    message.line !== undefined && (obj.line = message.line);
    return obj;
  },

  fromPartial(object: DeepPartial<TaskLogSpec>): TaskLogSpec {
    const message = { ...baseTaskLogSpec } as TaskLogSpec;
    if (object.line !== undefined && object.line !== null) {
      message.line = object.line;
    } else {
      message.line = "";
    }
    return message;
  },
};

const baseKubernetesVersionSpec: object = { version: "" };

export const KubernetesVersionSpec = {
  encode(
    message: KubernetesVersionSpec,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): KubernetesVersionSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseKubernetesVersionSpec } as KubernetesVersionSpec;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KubernetesVersionSpec {
    const message = { ...baseKubernetesVersionSpec } as KubernetesVersionSpec;
    if (object.version !== undefined && object.version !== null) {
      message.version = String(object.version);
    } else {
      message.version = "";
    }
    return message;
  },

  toJSON(message: KubernetesVersionSpec): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial(
    object: DeepPartial<KubernetesVersionSpec>
  ): KubernetesVersionSpec {
    const message = { ...baseKubernetesVersionSpec } as KubernetesVersionSpec;
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    } else {
      message.version = "";
    }
    return message;
  },
};

export interface ManagementService {
  UpgradeInfo(request: Empty): Promise<UpgradeInfoResponse>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
