/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "cosi.resource";

/**
 * Metadata represents resource metadata.
 *
 * (namespace, type, id) is a recource pointer.
 * (version) is a current resource version.
 * (owner) is filled in for controller-managed resources with controller name.
 * (phase) indicates whether resource is going through tear down phase.
 * (finalizers) are attached controllers blocking teardown of the resource.
 */
export interface Metadata {
  namespace: string;
  type: string;
  id: string;
  version: string;
  owner: string;
  phase: string;
  created: Date | undefined;
  updated: Date | undefined;
  finalizers: string[];
}

/** Spec defines content of the resource. */
export interface Spec {
  /** Protobuf-serialized representation of the resource. */
  proto_spec: Uint8Array;
  /** YAML representation of the spec (optional). */
  yaml_spec: string;
}

/** Resource is a combination of metadata and spec. */
export interface Resource {
  metadata: Metadata | undefined;
  spec: Spec | undefined;
}

function createBaseMetadata(): Metadata {
  return {
    namespace: "",
    type: "",
    id: "",
    version: "",
    owner: "",
    phase: "",
    created: undefined,
    updated: undefined,
    finalizers: [],
  };
}

export const Metadata = {
  encode(message: Metadata, writer: Writer = Writer.create()): Writer {
    if (message.namespace !== "") {
      writer.uint32(10).string(message.namespace);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.version !== "") {
      writer.uint32(34).string(message.version);
    }
    if (message.owner !== "") {
      writer.uint32(42).string(message.owner);
    }
    if (message.phase !== "") {
      writer.uint32(50).string(message.phase);
    }
    if (message.created !== undefined) {
      Timestamp.encode(
        toTimestamp(message.created),
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.updated !== undefined) {
      Timestamp.encode(
        toTimestamp(message.updated),
        writer.uint32(66).fork()
      ).ldelim();
    }
    for (const v of message.finalizers) {
      writer.uint32(74).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.namespace = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        case 3:
          message.id = reader.string();
          break;
        case 4:
          message.version = reader.string();
          break;
        case 5:
          message.owner = reader.string();
          break;
        case 6:
          message.phase = reader.string();
          break;
        case 7:
          message.created = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.updated = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 9:
          message.finalizers.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Metadata {
    return {
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      type: isSet(object.type) ? String(object.type) : "",
      id: isSet(object.id) ? String(object.id) : "",
      version: isSet(object.version) ? String(object.version) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      phase: isSet(object.phase) ? String(object.phase) : "",
      created: isSet(object.created)
        ? fromJsonTimestamp(object.created)
        : undefined,
      updated: isSet(object.updated)
        ? fromJsonTimestamp(object.updated)
        : undefined,
      finalizers: Array.isArray(object?.finalizers)
        ? object.finalizers.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.type !== undefined && (obj.type = message.type);
    message.id !== undefined && (obj.id = message.id);
    message.version !== undefined && (obj.version = message.version);
    message.owner !== undefined && (obj.owner = message.owner);
    message.phase !== undefined && (obj.phase = message.phase);
    message.created !== undefined &&
      (obj.created = message.created.toISOString());
    message.updated !== undefined &&
      (obj.updated = message.updated.toISOString());
    if (message.finalizers) {
      obj.finalizers = message.finalizers.map((e) => e);
    } else {
      obj.finalizers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Metadata>, I>>(object: I): Metadata {
    const message = createBaseMetadata();
    message.namespace = object.namespace ?? "";
    message.type = object.type ?? "";
    message.id = object.id ?? "";
    message.version = object.version ?? "";
    message.owner = object.owner ?? "";
    message.phase = object.phase ?? "";
    message.created = object.created ?? undefined;
    message.updated = object.updated ?? undefined;
    message.finalizers = object.finalizers?.map((e) => e) || [];
    return message;
  },
};

function createBaseSpec(): Spec {
  return { proto_spec: new Uint8Array(), yaml_spec: "" };
}

export const Spec = {
  encode(message: Spec, writer: Writer = Writer.create()): Writer {
    if (message.proto_spec.length !== 0) {
      writer.uint32(10).bytes(message.proto_spec);
    }
    if (message.yaml_spec !== "") {
      writer.uint32(18).string(message.yaml_spec);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Spec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proto_spec = reader.bytes();
          break;
        case 2:
          message.yaml_spec = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Spec {
    return {
      proto_spec: isSet(object.proto_spec)
        ? bytesFromBase64(object.proto_spec)
        : new Uint8Array(),
      yaml_spec: isSet(object.yaml_spec) ? String(object.yaml_spec) : "",
    };
  },

  toJSON(message: Spec): unknown {
    const obj: any = {};
    message.proto_spec !== undefined &&
      (obj.proto_spec = base64FromBytes(
        message.proto_spec !== undefined ? message.proto_spec : new Uint8Array()
      ));
    message.yaml_spec !== undefined && (obj.yaml_spec = message.yaml_spec);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Spec>, I>>(object: I): Spec {
    const message = createBaseSpec();
    message.proto_spec = object.proto_spec ?? new Uint8Array();
    message.yaml_spec = object.yaml_spec ?? "";
    return message;
  },
};

function createBaseResource(): Resource {
  return { metadata: undefined, spec: undefined };
}

export const Resource = {
  encode(message: Resource, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.spec !== undefined) {
      Spec.encode(message.spec, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Resource {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.spec = Spec.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Resource {
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      spec: isSet(object.spec) ? Spec.fromJSON(object.spec) : undefined,
    };
  },

  toJSON(message: Resource): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.spec !== undefined &&
      (obj.spec = message.spec ? Spec.toJSON(message.spec) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Resource>, I>>(object: I): Resource {
    const message = createBaseResource();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.spec =
      object.spec !== undefined && object.spec !== null
        ? Spec.fromPartial(object.spec)
        : undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
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
