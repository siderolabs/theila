/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "cluster";

export interface Context {
  /** Name is the name of the Context. */
  name: string;
  /** Cluster is the name of the cluster. */
  cluster: string;
}

export interface ListContextsRequest {}

export interface ListContextsResponse {
  /** Current is the default context. */
  current: string;
  /** Contexts is the list of available local contexts. */
  contexts: Context[];
}

function createBaseContext(): Context {
  return { name: "", cluster: "" };
}

export const Context = {
  encode(message: Context, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.cluster !== "") {
      writer.uint32(18).string(message.cluster);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Context {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContext();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.cluster = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Context {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      cluster: isSet(object.cluster) ? String(object.cluster) : "",
    };
  },

  toJSON(message: Context): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.cluster !== undefined && (obj.cluster = message.cluster);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Context>, I>>(object: I): Context {
    const message = createBaseContext();
    message.name = object.name ?? "";
    message.cluster = object.cluster ?? "";
    return message;
  },
};

function createBaseListContextsRequest(): ListContextsRequest {
  return {};
}

export const ListContextsRequest = {
  encode(_: ListContextsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ListContextsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListContextsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ListContextsRequest {
    return {};
  },

  toJSON(_: ListContextsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListContextsRequest>, I>>(
    _: I
  ): ListContextsRequest {
    const message = createBaseListContextsRequest();
    return message;
  },
};

function createBaseListContextsResponse(): ListContextsResponse {
  return { current: "", contexts: [] };
}

export const ListContextsResponse = {
  encode(
    message: ListContextsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.current !== "") {
      writer.uint32(10).string(message.current);
    }
    for (const v of message.contexts) {
      Context.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ListContextsResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListContextsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.current = reader.string();
          break;
        case 2:
          message.contexts.push(Context.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListContextsResponse {
    return {
      current: isSet(object.current) ? String(object.current) : "",
      contexts: Array.isArray(object?.contexts)
        ? object.contexts.map((e: any) => Context.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListContextsResponse): unknown {
    const obj: any = {};
    message.current !== undefined && (obj.current = message.current);
    if (message.contexts) {
      obj.contexts = message.contexts.map((e) =>
        e ? Context.toJSON(e) : undefined
      );
    } else {
      obj.contexts = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListContextsResponse>, I>>(
    object: I
  ): ListContextsResponse {
    const message = createBaseListContextsResponse();
    message.current = object.current ?? "";
    message.contexts =
      object.contexts?.map((e) => Context.fromPartial(e)) || [];
    return message;
  },
};

/** ContextService implements methods for querying locally discovered cluster information. */
export interface ContextService {
  List(request: ListContextsRequest): Promise<ListContextsResponse>;
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
