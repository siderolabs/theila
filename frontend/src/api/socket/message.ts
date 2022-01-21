/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import {
  Runtime,
  Context,
  runtimeFromJSON,
  runtimeToJSON,
} from "../common/theila";
import { WatchRequest } from "../talos/resource/resource";

export const protobufPackage = "socket";

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

export interface WatchSpec {
  /** Resource name to watch. */
  resource: WatchRequest | undefined;
  /** Source to get the watch data from. */
  source: Runtime;
  /** Context settings to fetch the data from. */
  context: Context | undefined;
  /** Selector represents watch label selector. */
  selector: string;
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

function createBaseMetadata(): Metadata {
  return { uid: "" };
}

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
    const message = createBaseMetadata();
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
    return {
      uid: isSet(object.uid) ? String(object.uid) : "",
    };
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    message.uid !== undefined && (obj.uid = message.uid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Metadata>, I>>(object: I): Metadata {
    const message = createBaseMetadata();
    message.uid = object.uid ?? "";
    return message;
  },
};

function createBaseMessage(): Message {
  return { kind: 0, metadata: undefined, spec: "" };
}

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
    const message = createBaseMessage();
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
    return {
      kind: isSet(object.kind) ? kindFromJSON(object.kind) : 0,
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      spec: isSet(object.spec) ? String(object.spec) : "",
    };
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

  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.kind = object.kind ?? 0;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.spec = object.spec ?? "";
    return message;
  },
};

function createBaseWatchSpec(): WatchSpec {
  return { resource: undefined, source: 0, context: undefined, selector: "" };
}

export const WatchSpec = {
  encode(message: WatchSpec, writer: Writer = Writer.create()): Writer {
    if (message.resource !== undefined) {
      WatchRequest.encode(message.resource, writer.uint32(10).fork()).ldelim();
    }
    if (message.source !== 0) {
      writer.uint32(16).int32(message.source);
    }
    if (message.context !== undefined) {
      Context.encode(message.context, writer.uint32(26).fork()).ldelim();
    }
    if (message.selector !== "") {
      writer.uint32(34).string(message.selector);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): WatchSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWatchSpec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = WatchRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.source = reader.int32() as any;
          break;
        case 3:
          message.context = Context.decode(reader, reader.uint32());
          break;
        case 4:
          message.selector = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WatchSpec {
    return {
      resource: isSet(object.resource)
        ? WatchRequest.fromJSON(object.resource)
        : undefined,
      source: isSet(object.source) ? runtimeFromJSON(object.source) : 0,
      context: isSet(object.context)
        ? Context.fromJSON(object.context)
        : undefined,
      selector: isSet(object.selector) ? String(object.selector) : "",
    };
  },

  toJSON(message: WatchSpec): unknown {
    const obj: any = {};
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? WatchRequest.toJSON(message.resource)
        : undefined);
    message.source !== undefined &&
      (obj.source = runtimeToJSON(message.source));
    message.context !== undefined &&
      (obj.context = message.context
        ? Context.toJSON(message.context)
        : undefined);
    message.selector !== undefined && (obj.selector = message.selector);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WatchSpec>, I>>(
    object: I
  ): WatchSpec {
    const message = createBaseWatchSpec();
    message.resource =
      object.resource !== undefined && object.resource !== null
        ? WatchRequest.fromPartial(object.resource)
        : undefined;
    message.source = object.source ?? 0;
    message.context =
      object.context !== undefined && object.context !== null
        ? Context.fromPartial(object.context)
        : undefined;
    message.selector = object.selector ?? "";
    return message;
  },
};

function createBaseSubscribedSpec(): SubscribedSpec {
  return { uid: "" };
}

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
    const message = createBaseSubscribedSpec();
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
    return {
      uid: isSet(object.uid) ? String(object.uid) : "",
    };
  },

  toJSON(message: SubscribedSpec): unknown {
    const obj: any = {};
    message.uid !== undefined && (obj.uid = message.uid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SubscribedSpec>, I>>(
    object: I
  ): SubscribedSpec {
    const message = createBaseSubscribedSpec();
    message.uid = object.uid ?? "";
    return message;
  },
};

function createBaseUnsubscribeSpec(): UnsubscribeSpec {
  return { uid: "" };
}

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
    const message = createBaseUnsubscribeSpec();
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
    return {
      uid: isSet(object.uid) ? String(object.uid) : "",
    };
  },

  toJSON(message: UnsubscribeSpec): unknown {
    const obj: any = {};
    message.uid !== undefined && (obj.uid = message.uid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UnsubscribeSpec>, I>>(
    object: I
  ): UnsubscribeSpec {
    const message = createBaseUnsubscribeSpec();
    message.uid = object.uid ?? "";
    return message;
  },
};

function createBaseErrorSpec(): ErrorSpec {
  return { error: "" };
}

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
    const message = createBaseErrorSpec();
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
    return {
      error: isSet(object.error) ? String(object.error) : "",
    };
  },

  toJSON(message: ErrorSpec): unknown {
    const obj: any = {};
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ErrorSpec>, I>>(
    object: I
  ): ErrorSpec {
    const message = createBaseErrorSpec();
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseItemUpdateSpec(): ItemUpdateSpec {
  return { old: new Uint8Array(), new: new Uint8Array() };
}

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
    const message = createBaseItemUpdateSpec();
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
    return {
      old: isSet(object.old) ? bytesFromBase64(object.old) : new Uint8Array(),
      new: isSet(object.new) ? bytesFromBase64(object.new) : new Uint8Array(),
    };
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

  fromPartial<I extends Exact<DeepPartial<ItemUpdateSpec>, I>>(
    object: I
  ): ItemUpdateSpec {
    const message = createBaseItemUpdateSpec();
    message.old = object.old ?? new Uint8Array();
    message.new = object.new ?? new Uint8Array();
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
