/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { GetRequest, ListRequest } from "../talos/resource/resource";
import { Cluster } from "../common/theila";

export const protobufPackage = "resource";

export interface GetFromClusterRequest {
  resource: GetRequest | undefined;
}

export interface GetFromClusterResponse {
  /** Body should contain JSON encoded spec. */
  body: string;
}

export interface ListFromClusterRequest {
  resource: ListRequest | undefined;
  /** Selectors allow filtering list results by labels. */
  selectors: string[];
}

export interface ListFromClusterResponse {
  /** Messages should contain JSON encoded list spec. */
  messages: string[];
}

export interface ConfigResponse {
  /** Data raw config data. */
  data: string;
}

export interface UpgradeK8sSpec {
  /** K8s version to upgrade to. */
  version: string;
  /** The list of nodes to perform upgrade on. */
  nodes: string[];
}

const baseGetFromClusterRequest: object = {};

export const GetFromClusterRequest = {
  encode(
    message: GetFromClusterRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.resource !== undefined) {
      GetRequest.encode(message.resource, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetFromClusterRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetFromClusterRequest } as GetFromClusterRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = GetRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFromClusterRequest {
    const message = { ...baseGetFromClusterRequest } as GetFromClusterRequest;
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = GetRequest.fromJSON(object.resource);
    } else {
      message.resource = undefined;
    }
    return message;
  },

  toJSON(message: GetFromClusterRequest): unknown {
    const obj: any = {};
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? GetRequest.toJSON(message.resource)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetFromClusterRequest>
  ): GetFromClusterRequest {
    const message = { ...baseGetFromClusterRequest } as GetFromClusterRequest;
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = GetRequest.fromPartial(object.resource);
    } else {
      message.resource = undefined;
    }
    return message;
  },
};

const baseGetFromClusterResponse: object = { body: "" };

export const GetFromClusterResponse = {
  encode(
    message: GetFromClusterResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.body !== "") {
      writer.uint32(10).string(message.body);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetFromClusterResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetFromClusterResponse } as GetFromClusterResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.body = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFromClusterResponse {
    const message = { ...baseGetFromClusterResponse } as GetFromClusterResponse;
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body);
    } else {
      message.body = "";
    }
    return message;
  },

  toJSON(message: GetFromClusterResponse): unknown {
    const obj: any = {};
    message.body !== undefined && (obj.body = message.body);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetFromClusterResponse>
  ): GetFromClusterResponse {
    const message = { ...baseGetFromClusterResponse } as GetFromClusterResponse;
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = "";
    }
    return message;
  },
};

const baseListFromClusterRequest: object = { selectors: "" };

export const ListFromClusterRequest = {
  encode(
    message: ListFromClusterRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.resource !== undefined) {
      ListRequest.encode(message.resource, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.selectors) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ListFromClusterRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListFromClusterRequest } as ListFromClusterRequest;
    message.selectors = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = ListRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.selectors.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListFromClusterRequest {
    const message = { ...baseListFromClusterRequest } as ListFromClusterRequest;
    message.selectors = [];
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = ListRequest.fromJSON(object.resource);
    } else {
      message.resource = undefined;
    }
    if (object.selectors !== undefined && object.selectors !== null) {
      for (const e of object.selectors) {
        message.selectors.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: ListFromClusterRequest): unknown {
    const obj: any = {};
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? ListRequest.toJSON(message.resource)
        : undefined);
    if (message.selectors) {
      obj.selectors = message.selectors.map((e) => e);
    } else {
      obj.selectors = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListFromClusterRequest>
  ): ListFromClusterRequest {
    const message = { ...baseListFromClusterRequest } as ListFromClusterRequest;
    message.selectors = [];
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = ListRequest.fromPartial(object.resource);
    } else {
      message.resource = undefined;
    }
    if (object.selectors !== undefined && object.selectors !== null) {
      for (const e of object.selectors) {
        message.selectors.push(e);
      }
    }
    return message;
  },
};

const baseListFromClusterResponse: object = { messages: "" };

export const ListFromClusterResponse = {
  encode(
    message: ListFromClusterResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ListFromClusterResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseListFromClusterResponse,
    } as ListFromClusterResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListFromClusterResponse {
    const message = {
      ...baseListFromClusterResponse,
    } as ListFromClusterResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: ListFromClusterResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) => e);
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListFromClusterResponse>
  ): ListFromClusterResponse {
    const message = {
      ...baseListFromClusterResponse,
    } as ListFromClusterResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(e);
      }
    }
    return message;
  },
};

const baseConfigResponse: object = { data: "" };

export const ConfigResponse = {
  encode(message: ConfigResponse, writer: Writer = Writer.create()): Writer {
    if (message.data !== "") {
      writer.uint32(10).string(message.data);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ConfigResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseConfigResponse } as ConfigResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConfigResponse {
    const message = { ...baseConfigResponse } as ConfigResponse;
    if (object.data !== undefined && object.data !== null) {
      message.data = String(object.data);
    } else {
      message.data = "";
    }
    return message;
  },

  toJSON(message: ConfigResponse): unknown {
    const obj: any = {};
    message.data !== undefined && (obj.data = message.data);
    return obj;
  },

  fromPartial(object: DeepPartial<ConfigResponse>): ConfigResponse {
    const message = { ...baseConfigResponse } as ConfigResponse;
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = "";
    }
    return message;
  },
};

const baseUpgradeK8sSpec: object = { version: "", nodes: "" };

export const UpgradeK8sSpec = {
  encode(message: UpgradeK8sSpec, writer: Writer = Writer.create()): Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    for (const v of message.nodes) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UpgradeK8sSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpgradeK8sSpec } as UpgradeK8sSpec;
    message.nodes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        case 2:
          message.nodes.push(reader.string());
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
    message.nodes = [];
    if (object.version !== undefined && object.version !== null) {
      message.version = String(object.version);
    } else {
      message.version = "";
    }
    if (object.nodes !== undefined && object.nodes !== null) {
      for (const e of object.nodes) {
        message.nodes.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: UpgradeK8sSpec): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    if (message.nodes) {
      obj.nodes = message.nodes.map((e) => e);
    } else {
      obj.nodes = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<UpgradeK8sSpec>): UpgradeK8sSpec {
    const message = { ...baseUpgradeK8sSpec } as UpgradeK8sSpec;
    message.nodes = [];
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    } else {
      message.version = "";
    }
    if (object.nodes !== undefined && object.nodes !== null) {
      for (const e of object.nodes) {
        message.nodes.push(e);
      }
    }
    return message;
  },
};

export interface ClusterResourceService {
  Get(request: GetFromClusterRequest): Promise<GetFromClusterResponse>;
  List(request: ListFromClusterRequest): Promise<ListFromClusterResponse>;
  GetConfig(request: Cluster): Promise<ConfigResponse>;
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
