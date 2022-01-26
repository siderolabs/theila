/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { Timestamp } from "../google/protobuf/timestamp";
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

/** Maps the task spec into task status spec. */
export interface TaskStateSpec {
  /** StatusID keeps the id for the current task status. */
  status_id: string;
}

export interface TaskStatusSpec {
  /** Upgrade task state. */
  phase: TaskStatusSpec_Phase;
  /** Progress represents the task progress [0,1]. */
  progress: number;
  /** Failure reason. */
  error: string;
  /** K8s version to upgrade from. */
  from_version: string;
  /** K8s version to upgrade to. */
  to_version: string;
  /** FinishedAt is when the task either failed or completed. */
  finished_at: Date | undefined;
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

function createBaseUpgradeInfoResponse(): UpgradeInfoResponse {
  return { from_version: "" };
}

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
    const message = createBaseUpgradeInfoResponse();
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
    return {
      from_version: isSet(object.from_version)
        ? String(object.from_version)
        : "",
    };
  },

  toJSON(message: UpgradeInfoResponse): unknown {
    const obj: any = {};
    message.from_version !== undefined &&
      (obj.from_version = message.from_version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpgradeInfoResponse>, I>>(
    object: I
  ): UpgradeInfoResponse {
    const message = createBaseUpgradeInfoResponse();
    message.from_version = object.from_version ?? "";
    return message;
  },
};

function createBaseUpgradeK8sSpec(): UpgradeK8sSpec {
  return { from_version: "", to_version: "", context: undefined };
}

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
    const message = createBaseUpgradeK8sSpec();
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
    return {
      from_version: isSet(object.from_version)
        ? String(object.from_version)
        : "",
      to_version: isSet(object.to_version) ? String(object.to_version) : "",
      context: isSet(object.context)
        ? Context.fromJSON(object.context)
        : undefined,
    };
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

  fromPartial<I extends Exact<DeepPartial<UpgradeK8sSpec>, I>>(
    object: I
  ): UpgradeK8sSpec {
    const message = createBaseUpgradeK8sSpec();
    message.from_version = object.from_version ?? "";
    message.to_version = object.to_version ?? "";
    message.context =
      object.context !== undefined && object.context !== null
        ? Context.fromPartial(object.context)
        : undefined;
    return message;
  },
};

function createBaseTaskStateSpec(): TaskStateSpec {
  return { status_id: "" };
}

export const TaskStateSpec = {
  encode(message: TaskStateSpec, writer: Writer = Writer.create()): Writer {
    if (message.status_id !== "") {
      writer.uint32(34).string(message.status_id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TaskStateSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTaskStateSpec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          message.status_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TaskStateSpec {
    return {
      status_id: isSet(object.status_id) ? String(object.status_id) : "",
    };
  },

  toJSON(message: TaskStateSpec): unknown {
    const obj: any = {};
    message.status_id !== undefined && (obj.status_id = message.status_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TaskStateSpec>, I>>(
    object: I
  ): TaskStateSpec {
    const message = createBaseTaskStateSpec();
    message.status_id = object.status_id ?? "";
    return message;
  },
};

function createBaseTaskStatusSpec(): TaskStatusSpec {
  return {
    phase: 0,
    progress: 0,
    error: "",
    from_version: "",
    to_version: "",
    finished_at: undefined,
  };
}

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
    if (message.from_version !== "") {
      writer.uint32(34).string(message.from_version);
    }
    if (message.to_version !== "") {
      writer.uint32(42).string(message.to_version);
    }
    if (message.finished_at !== undefined) {
      Timestamp.encode(
        toTimestamp(message.finished_at),
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TaskStatusSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTaskStatusSpec();
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
        case 4:
          message.from_version = reader.string();
          break;
        case 5:
          message.to_version = reader.string();
          break;
        case 6:
          message.finished_at = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TaskStatusSpec {
    return {
      phase: isSet(object.phase)
        ? taskStatusSpec_PhaseFromJSON(object.phase)
        : 0,
      progress: isSet(object.progress) ? Number(object.progress) : 0,
      error: isSet(object.error) ? String(object.error) : "",
      from_version: isSet(object.from_version)
        ? String(object.from_version)
        : "",
      to_version: isSet(object.to_version) ? String(object.to_version) : "",
      finished_at: isSet(object.finished_at)
        ? fromJsonTimestamp(object.finished_at)
        : undefined,
    };
  },

  toJSON(message: TaskStatusSpec): unknown {
    const obj: any = {};
    message.phase !== undefined &&
      (obj.phase = taskStatusSpec_PhaseToJSON(message.phase));
    message.progress !== undefined && (obj.progress = message.progress);
    message.error !== undefined && (obj.error = message.error);
    message.from_version !== undefined &&
      (obj.from_version = message.from_version);
    message.to_version !== undefined && (obj.to_version = message.to_version);
    message.finished_at !== undefined &&
      (obj.finished_at = message.finished_at.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TaskStatusSpec>, I>>(
    object: I
  ): TaskStatusSpec {
    const message = createBaseTaskStatusSpec();
    message.phase = object.phase ?? 0;
    message.progress = object.progress ?? 0;
    message.error = object.error ?? "";
    message.from_version = object.from_version ?? "";
    message.to_version = object.to_version ?? "";
    message.finished_at = object.finished_at ?? undefined;
    return message;
  },
};

function createBaseTaskLogSpec(): TaskLogSpec {
  return { line: "" };
}

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
    const message = createBaseTaskLogSpec();
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
    return {
      line: isSet(object.line) ? String(object.line) : "",
    };
  },

  toJSON(message: TaskLogSpec): unknown {
    const obj: any = {};
    message.line !== undefined && (obj.line = message.line);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TaskLogSpec>, I>>(
    object: I
  ): TaskLogSpec {
    const message = createBaseTaskLogSpec();
    message.line = object.line ?? "";
    return message;
  },
};

function createBaseKubernetesVersionSpec(): KubernetesVersionSpec {
  return { version: "" };
}

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
    const message = createBaseKubernetesVersionSpec();
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
    return {
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: KubernetesVersionSpec): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KubernetesVersionSpec>, I>>(
    object: I
  ): KubernetesVersionSpec {
    const message = createBaseKubernetesVersionSpec();
    message.version = object.version ?? "";
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

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
