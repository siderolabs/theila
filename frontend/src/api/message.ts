/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "";

/** Message kinds. */
export enum Kind {
  /** Error - A generic error response. */
  Error = 0,
  /** OK - A generic ok response. */
  OK = 1,
  /** Watch - Watch request. */
  Watch = 2,
  /** Unsubscribe - Unsubscribe request. */
  Unsubscribe = 3,
  /** Subscribed - Subscribed response. */
  Subscribed = 4,
  /** EventItemAdd - Watch add item event. */
  EventItemAdd = 5,
  /** EventItemUpdate - Watch update item event. */
  EventItemUpdate = 6,
  /** EventItemDelete - Watch delete item event. */
  EventItemDelete = 7,
  /** EventError - Watch error which means that watch is invalid. */
  EventError = 8,
  UNRECOGNIZED = -1,
}

export function kindFromJSON(object: any): Kind {
  switch (object) {
    case 0:
    case "Error":
      return Kind.Error;
    case 1:
    case "OK":
      return Kind.OK;
    case 2:
    case "Watch":
      return Kind.Watch;
    case 3:
    case "Unsubscribe":
      return Kind.Unsubscribe;
    case 4:
    case "Subscribed":
      return Kind.Subscribed;
    case 5:
    case "EventItemAdd":
      return Kind.EventItemAdd;
    case 6:
    case "EventItemUpdate":
      return Kind.EventItemUpdate;
    case 7:
    case "EventItemDelete":
      return Kind.EventItemDelete;
    case 8:
    case "EventError":
      return Kind.EventError;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Kind.UNRECOGNIZED;
  }
}

export function kindToJSON(object: Kind): string {
  switch (object) {
    case Kind.Error:
      return "Error";
    case Kind.OK:
      return "OK";
    case Kind.Watch:
      return "Watch";
    case Kind.Unsubscribe:
      return "Unsubscribe";
    case Kind.Subscribed:
      return "Subscribed";
    case Kind.EventItemAdd:
      return "EventItemAdd";
    case Kind.EventItemUpdate:
      return "EventItemUpdate";
    case Kind.EventItemDelete:
      return "EventItemDelete";
    case Kind.EventError:
      return "EventError";
    default:
      return "UNKNOWN";
  }
}

/** Watch source. */
export enum Source {
  /** Kubernetes - Get the data from Kubernetes control planes. */
  Kubernetes = 0,
  /** Talos - Get the data from Talos apid. */
  Talos = 1,
  UNRECOGNIZED = -1,
}

export function sourceFromJSON(object: any): Source {
  switch (object) {
    case 0:
    case "Kubernetes":
      return Source.Kubernetes;
    case 1:
    case "Talos":
      return Source.Talos;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Source.UNRECOGNIZED;
  }
}

export function sourceToJSON(object: Source): string {
  switch (object) {
    case Source.Kubernetes:
      return "Kubernetes";
    case Source.Talos:
      return "Talos";
    default:
      return "UNKNOWN";
  }
}

/** Message metadata which helps matching request vs response and routing to any specific subscription. */
export interface Metadata {
  /** Uid match/route identifier. */
  uid: string;
}

/** Web socket message. */
export interface Message {
  kind: Kind;
  metadata: Metadata | undefined;
  /**
   * Spec can vary on the message kind.
   * Can either have some specific data for the kind or be empty.
   */
  spec: string;
}

/** Cluster contains settings for fetching the config from cluster resource in Kubernetes. */
export interface Cluster {
  /** Name of the cluster. */
  name: string;
  /** Namespace of the cluster. */
  namespace: string;
  /** UID of the cluster. */
  UID: string;
}

/** Context represents Kubernetes or Talos config source. */
export interface Context {
  /** Name fetches the config from the top level Kubeconfig or Talosconfig. */
  name: string;
  /** Cluster fetches the context from the cluster resource in Kubernetes. */
  cluster: Cluster | undefined;
}

export interface WatchSpec {
  /** Resource name to watch. */
  resource: string;
  /** Source to get the watch data from. */
  source: Source;
  /** Context settings to fetch the data from. */
  context: Context | undefined;
}

/** Watch response. */
export interface SubscribedSpec {
  /** Subscription uid generated for the subscription. */
  uid: string;
}

/** Unsubscribe request. */
export interface UnsubscribeSpec {
  /** Subscription to destroy. */
  uid: string;
}

export interface ErrorSpec {
  error: string;
}

export interface ItemUpdateSpec {
  old: Uint8Array;
  new: Uint8Array;
}

const baseMetadata: object = { uid: "" };

export const Metadata = {
  encode(message: Metadata, writer: Writer = Writer.create()): Writer {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
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
          message.uid = reader.string();
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
    if (object.uid !== undefined && object.uid !== null) {
      message.uid = String(object.uid);
    } else {
      message.uid = "";
    }
    return message;
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    message.uid !== undefined && (obj.uid = message.uid);
    return obj;
  },

  fromPartial(object: DeepPartial<Metadata>): Metadata {
    const message = { ...baseMetadata } as Metadata;
    if (object.uid !== undefined && object.uid !== null) {
      message.uid = object.uid;
    } else {
      message.uid = "";
    }
    return message;
  },
};

const baseMessage: object = { kind: 0, spec: "" };

export const Message = {
  encode(message: Message, writer: Writer = Writer.create()): Writer {
    if (message.kind !== 0) {
      writer.uint32(8).int32(message.kind);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(18).fork()).ldelim();
    }
    if (message.spec !== "") {
      writer.uint32(26).string(message.spec);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMessage } as Message;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kind = reader.int32() as any;
          break;
        case 2:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 3:
          message.spec = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Message {
    const message = { ...baseMessage } as Message;
    if (object.kind !== undefined && object.kind !== null) {
      message.kind = kindFromJSON(object.kind);
    } else {
      message.kind = 0;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.spec !== undefined && object.spec !== null) {
      message.spec = String(object.spec);
    } else {
      message.spec = "";
    }
    return message;
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    message.kind !== undefined && (obj.kind = kindToJSON(message.kind));
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.spec !== undefined && (obj.spec = message.spec);
    return obj;
  },

  fromPartial(object: DeepPartial<Message>): Message {
    const message = { ...baseMessage } as Message;
    if (object.kind !== undefined && object.kind !== null) {
      message.kind = object.kind;
    } else {
      message.kind = 0;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.spec !== undefined && object.spec !== null) {
      message.spec = object.spec;
    } else {
      message.spec = "";
    }
    return message;
  },
};

const baseCluster: object = { name: "", namespace: "", UID: "" };

export const Cluster = {
  encode(message: Cluster, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.namespace !== "") {
      writer.uint32(18).string(message.namespace);
    }
    if (message.UID !== "") {
      writer.uint32(26).string(message.UID);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Cluster {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCluster } as Cluster;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.namespace = reader.string();
          break;
        case 3:
          message.UID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Cluster {
    const message = { ...baseCluster } as Cluster;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = String(object.namespace);
    } else {
      message.namespace = "";
    }
    if (object.UID !== undefined && object.UID !== null) {
      message.UID = String(object.UID);
    } else {
      message.UID = "";
    }
    return message;
  },

  toJSON(message: Cluster): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.UID !== undefined && (obj.UID = message.UID);
    return obj;
  },

  fromPartial(object: DeepPartial<Cluster>): Cluster {
    const message = { ...baseCluster } as Cluster;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = object.namespace;
    } else {
      message.namespace = "";
    }
    if (object.UID !== undefined && object.UID !== null) {
      message.UID = object.UID;
    } else {
      message.UID = "";
    }
    return message;
  },
};

const baseContext: object = { name: "" };

export const Context = {
  encode(message: Context, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.cluster !== undefined) {
      Cluster.encode(message.cluster, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Context {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContext } as Context;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.cluster = Cluster.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Context {
    const message = { ...baseContext } as Context;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.cluster !== undefined && object.cluster !== null) {
      message.cluster = Cluster.fromJSON(object.cluster);
    } else {
      message.cluster = undefined;
    }
    return message;
  },

  toJSON(message: Context): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.cluster !== undefined &&
      (obj.cluster = message.cluster
        ? Cluster.toJSON(message.cluster)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Context>): Context {
    const message = { ...baseContext } as Context;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.cluster !== undefined && object.cluster !== null) {
      message.cluster = Cluster.fromPartial(object.cluster);
    } else {
      message.cluster = undefined;
    }
    return message;
  },
};

const baseWatchSpec: object = { resource: "", source: 0 };

export const WatchSpec = {
  encode(message: WatchSpec, writer: Writer = Writer.create()): Writer {
    if (message.resource !== "") {
      writer.uint32(10).string(message.resource);
    }
    if (message.source !== 0) {
      writer.uint32(16).int32(message.source);
    }
    if (message.context !== undefined) {
      Context.encode(message.context, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): WatchSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWatchSpec } as WatchSpec;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = reader.string();
          break;
        case 2:
          message.source = reader.int32() as any;
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

  fromJSON(object: any): WatchSpec {
    const message = { ...baseWatchSpec } as WatchSpec;
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = String(object.resource);
    } else {
      message.resource = "";
    }
    if (object.source !== undefined && object.source !== null) {
      message.source = sourceFromJSON(object.source);
    } else {
      message.source = 0;
    }
    if (object.context !== undefined && object.context !== null) {
      message.context = Context.fromJSON(object.context);
    } else {
      message.context = undefined;
    }
    return message;
  },

  toJSON(message: WatchSpec): unknown {
    const obj: any = {};
    message.resource !== undefined && (obj.resource = message.resource);
    message.source !== undefined && (obj.source = sourceToJSON(message.source));
    message.context !== undefined &&
      (obj.context = message.context
        ? Context.toJSON(message.context)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<WatchSpec>): WatchSpec {
    const message = { ...baseWatchSpec } as WatchSpec;
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = object.resource;
    } else {
      message.resource = "";
    }
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    } else {
      message.source = 0;
    }
    if (object.context !== undefined && object.context !== null) {
      message.context = Context.fromPartial(object.context);
    } else {
      message.context = undefined;
    }
    return message;
  },
};

const baseSubscribedSpec: object = { uid: "" };

export const SubscribedSpec = {
  encode(message: SubscribedSpec, writer: Writer = Writer.create()): Writer {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SubscribedSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSubscribedSpec } as SubscribedSpec;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SubscribedSpec {
    const message = { ...baseSubscribedSpec } as SubscribedSpec;
    if (object.uid !== undefined && object.uid !== null) {
      message.uid = String(object.uid);
    } else {
      message.uid = "";
    }
    return message;
  },

  toJSON(message: SubscribedSpec): unknown {
    const obj: any = {};
    message.uid !== undefined && (obj.uid = message.uid);
    return obj;
  },

  fromPartial(object: DeepPartial<SubscribedSpec>): SubscribedSpec {
    const message = { ...baseSubscribedSpec } as SubscribedSpec;
    if (object.uid !== undefined && object.uid !== null) {
      message.uid = object.uid;
    } else {
      message.uid = "";
    }
    return message;
  },
};

const baseUnsubscribeSpec: object = { uid: "" };

export const UnsubscribeSpec = {
  encode(message: UnsubscribeSpec, writer: Writer = Writer.create()): Writer {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UnsubscribeSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUnsubscribeSpec } as UnsubscribeSpec;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnsubscribeSpec {
    const message = { ...baseUnsubscribeSpec } as UnsubscribeSpec;
    if (object.uid !== undefined && object.uid !== null) {
      message.uid = String(object.uid);
    } else {
      message.uid = "";
    }
    return message;
  },

  toJSON(message: UnsubscribeSpec): unknown {
    const obj: any = {};
    message.uid !== undefined && (obj.uid = message.uid);
    return obj;
  },

  fromPartial(object: DeepPartial<UnsubscribeSpec>): UnsubscribeSpec {
    const message = { ...baseUnsubscribeSpec } as UnsubscribeSpec;
    if (object.uid !== undefined && object.uid !== null) {
      message.uid = object.uid;
    } else {
      message.uid = "";
    }
    return message;
  },
};

const baseErrorSpec: object = { error: "" };

export const ErrorSpec = {
  encode(message: ErrorSpec, writer: Writer = Writer.create()): Writer {
    if (message.error !== "") {
      writer.uint32(10).string(message.error);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ErrorSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseErrorSpec } as ErrorSpec;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ErrorSpec {
    const message = { ...baseErrorSpec } as ErrorSpec;
    if (object.error !== undefined && object.error !== null) {
      message.error = String(object.error);
    } else {
      message.error = "";
    }
    return message;
  },

  toJSON(message: ErrorSpec): unknown {
    const obj: any = {};
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  fromPartial(object: DeepPartial<ErrorSpec>): ErrorSpec {
    const message = { ...baseErrorSpec } as ErrorSpec;
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    } else {
      message.error = "";
    }
    return message;
  },
};

const baseItemUpdateSpec: object = {};

export const ItemUpdateSpec = {
  encode(message: ItemUpdateSpec, writer: Writer = Writer.create()): Writer {
    if (message.old.length !== 0) {
      writer.uint32(10).bytes(message.old);
    }
    if (message.new.length !== 0) {
      writer.uint32(18).bytes(message.new);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ItemUpdateSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseItemUpdateSpec } as ItemUpdateSpec;
    message.old = new Uint8Array();
    message.new = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.old = reader.bytes();
          break;
        case 2:
          message.new = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ItemUpdateSpec {
    const message = { ...baseItemUpdateSpec } as ItemUpdateSpec;
    message.old = new Uint8Array();
    message.new = new Uint8Array();
    if (object.old !== undefined && object.old !== null) {
      message.old = bytesFromBase64(object.old);
    }
    if (object.new !== undefined && object.new !== null) {
      message.new = bytesFromBase64(object.new);
    }
    return message;
  },

  toJSON(message: ItemUpdateSpec): unknown {
    const obj: any = {};
    message.old !== undefined &&
      (obj.old = base64FromBytes(
        message.old !== undefined ? message.old : new Uint8Array()
      ));
    message.new !== undefined &&
      (obj.new = base64FromBytes(
        message.new !== undefined ? message.new : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<ItemUpdateSpec>): ItemUpdateSpec {
    const message = { ...baseItemUpdateSpec } as ItemUpdateSpec;
    if (object.old !== undefined && object.old !== null) {
      message.old = object.old;
    } else {
      message.old = new Uint8Array();
    }
    if (object.new !== undefined && object.new !== null) {
      message.new = object.new;
    } else {
      message.new = new Uint8Array();
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
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
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
