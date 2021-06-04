/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "cluster";

export interface Context {
  /** Name is the name of the Context. */
  name: string;
}

export interface ListContextsRequest {}

export interface ListContextsResponse {
  /** Current is the default context. */
  current: string;
  /** Contexts is the list of available local contexts. */
  contexts: Context[];
}

const baseContext: object = { name: "" };

export const Context = {
  encode(message: Context, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
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
    return message;
  },

  toJSON(message: Context): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<Context>): Context {
    const message = { ...baseContext } as Context;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseListContextsRequest: object = {};

export const ListContextsRequest = {
  encode(_: ListContextsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ListContextsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListContextsRequest } as ListContextsRequest;
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
    const message = { ...baseListContextsRequest } as ListContextsRequest;
    return message;
  },

  toJSON(_: ListContextsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<ListContextsRequest>): ListContextsRequest {
    const message = { ...baseListContextsRequest } as ListContextsRequest;
    return message;
  },
};

const baseListContextsResponse: object = { current: "" };

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
    const message = { ...baseListContextsResponse } as ListContextsResponse;
    message.contexts = [];
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
    const message = { ...baseListContextsResponse } as ListContextsResponse;
    message.contexts = [];
    if (object.current !== undefined && object.current !== null) {
      message.current = String(object.current);
    } else {
      message.current = "";
    }
    if (object.contexts !== undefined && object.contexts !== null) {
      for (const e of object.contexts) {
        message.contexts.push(Context.fromJSON(e));
      }
    }
    return message;
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

  fromPartial(object: DeepPartial<ListContextsResponse>): ListContextsResponse {
    const message = { ...baseListContextsResponse } as ListContextsResponse;
    message.contexts = [];
    if (object.current !== undefined && object.current !== null) {
      message.current = object.current;
    } else {
      message.current = "";
    }
    if (object.contexts !== undefined && object.contexts !== null) {
      for (const e of object.contexts) {
        message.contexts.push(Context.fromPartial(e));
      }
    }
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
