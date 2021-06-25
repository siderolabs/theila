/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { Any } from "../google/protobuf/any";
import { Status } from "../google/rpc/status";

export const protobufPackage = "common";

export enum Code {
  FATAL = 0,
  LOCKED = 1,
  UNRECOGNIZED = -1,
}

export function codeFromJSON(object: any): Code {
  switch (object) {
    case 0:
    case "FATAL":
      return Code.FATAL;
    case 1:
    case "LOCKED":
      return Code.LOCKED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Code.UNRECOGNIZED;
  }
}

export function codeToJSON(object: Code): string {
  switch (object) {
    case Code.FATAL:
      return "FATAL";
    case Code.LOCKED:
      return "LOCKED";
    default:
      return "UNKNOWN";
  }
}

export enum ContainerDriver {
  CONTAINERD = 0,
  CRI = 1,
  UNRECOGNIZED = -1,
}

export function containerDriverFromJSON(object: any): ContainerDriver {
  switch (object) {
    case 0:
    case "CONTAINERD":
      return ContainerDriver.CONTAINERD;
    case 1:
    case "CRI":
      return ContainerDriver.CRI;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ContainerDriver.UNRECOGNIZED;
  }
}

export function containerDriverToJSON(object: ContainerDriver): string {
  switch (object) {
    case ContainerDriver.CONTAINERD:
      return "CONTAINERD";
    case ContainerDriver.CRI:
      return "CRI";
    default:
      return "UNKNOWN";
  }
}

export interface Error {
  code: Code;
  message: string;
  details: Any[];
}

/** Common metadata message nested in all reply message types */
export interface Metadata {
  /** hostname of the server response comes from (injected by proxy) */
  hostname: string;
  /**
   * error is set if request failed to the upstream (rest of response is
   * undefined)
   */
  error: string;
  /** error as gRPC Status */
  status: Status | undefined;
}

export interface Data {
  metadata: Metadata | undefined;
  bytes: Uint8Array;
}

export interface DataResponse {
  messages: Data[];
}

export interface Empty {
  metadata: Metadata | undefined;
}

export interface EmptyResponse {
  messages: Empty[];
}

const baseError: object = { code: 0, message: "" };

export const Error = {
  encode(message: Error, writer: Writer = Writer.create()): Writer {
    if (message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    for (const v of message.details) {
      Any.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseError } as Error;
    message.details = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.int32() as any;
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          message.details.push(Any.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Error {
    const message = { ...baseError } as Error;
    message.details = [];
    if (object.code !== undefined && object.code !== null) {
      message.code = codeFromJSON(object.code);
    } else {
      message.code = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    if (object.details !== undefined && object.details !== null) {
      for (const e of object.details) {
        message.details.push(Any.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = codeToJSON(message.code));
    message.message !== undefined && (obj.message = message.message);
    if (message.details) {
      obj.details = message.details.map((e) => (e ? Any.toJSON(e) : undefined));
    } else {
      obj.details = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Error>): Error {
    const message = { ...baseError } as Error;
    message.details = [];
    if (object.code !== undefined && object.code !== null) {
      message.code = object.code;
    } else {
      message.code = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    if (object.details !== undefined && object.details !== null) {
      for (const e of object.details) {
        message.details.push(Any.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMetadata: object = { hostname: "", error: "" };

export const Metadata = {
  encode(message: Metadata, writer: Writer = Writer.create()): Writer {
    if (message.hostname !== "") {
      writer.uint32(10).string(message.hostname);
    }
    if (message.error !== "") {
      writer.uint32(18).string(message.error);
    }
    if (message.status !== undefined) {
      Status.encode(message.status, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMetadata } as Metadata;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostname = reader.string();
          break;
        case 2:
          message.error = reader.string();
          break;
        case 3:
          message.status = Status.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Metadata {
    const message = { ...baseMetadata } as Metadata;
    if (object.hostname !== undefined && object.hostname !== null) {
      message.hostname = String(object.hostname);
    } else {
      message.hostname = "";
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = String(object.error);
    } else {
      message.error = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = Status.fromJSON(object.status);
    } else {
      message.status = undefined;
    }
    return message;
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    message.hostname !== undefined && (obj.hostname = message.hostname);
    message.error !== undefined && (obj.error = message.error);
    message.status !== undefined &&
      (obj.status = message.status ? Status.toJSON(message.status) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Metadata>): Metadata {
    const message = { ...baseMetadata } as Metadata;
    if (object.hostname !== undefined && object.hostname !== null) {
      message.hostname = object.hostname;
    } else {
      message.hostname = "";
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    } else {
      message.error = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = Status.fromPartial(object.status);
    } else {
      message.status = undefined;
    }
    return message;
  },
};

const baseData: object = {};

export const Data = {
  encode(message: Data, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.bytes.length !== 0) {
      writer.uint32(18).bytes(message.bytes);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Data {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseData } as Data;
    message.bytes = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.bytes = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Data {
    const message = { ...baseData } as Data;
    message.bytes = new Uint8Array();
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.bytes !== undefined && object.bytes !== null) {
      message.bytes = bytesFromBase64(object.bytes);
    }
    return message;
  },

  toJSON(message: Data): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.bytes !== undefined &&
      (obj.bytes = base64FromBytes(
        message.bytes !== undefined ? message.bytes : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<Data>): Data {
    const message = { ...baseData } as Data;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.bytes !== undefined && object.bytes !== null) {
      message.bytes = object.bytes;
    } else {
      message.bytes = new Uint8Array();
    }
    return message;
  },
};

const baseDataResponse: object = {};

export const DataResponse = {
  encode(message: DataResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Data.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DataResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDataResponse } as DataResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Data.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataResponse {
    const message = { ...baseDataResponse } as DataResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Data.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: DataResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Data.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<DataResponse>): DataResponse {
    const message = { ...baseDataResponse } as DataResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Data.fromPartial(e));
      }
    }
    return message;
  },
};

const baseEmpty: object = {};

export const Empty = {
  encode(message: Empty, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEmpty } as Empty;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Empty {
    const message = { ...baseEmpty } as Empty;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: Empty): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Empty>): Empty {
    const message = { ...baseEmpty } as Empty;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },
};

const baseEmptyResponse: object = {};

export const EmptyResponse = {
  encode(message: EmptyResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Empty.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EmptyResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEmptyResponse } as EmptyResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Empty.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EmptyResponse {
    const message = { ...baseEmptyResponse } as EmptyResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Empty.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: EmptyResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Empty.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<EmptyResponse>): EmptyResponse {
    const message = { ...baseEmptyResponse } as EmptyResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Empty.fromPartial(e));
      }
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
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
