/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { Resource } from "../v1alpha1/resource";
import { GetRequest, ListRequest } from "../talos/resource/resource";
import { Cluster } from "../common/theila";

export const protobufPackage = "theila.resource";

export interface GetResponse {
  /** Body should contain JSON encoded spec. */
  body: string;
}

export interface ListResponse {
  /** Messages should contain JSON encoded list spec. */
  messages: string[];
}

export interface CreateRequest {
  resource: Resource | undefined;
}

export interface CreateResponse {}

export interface UpdateRequest {
  currentVersion: string;
  resource: Resource | undefined;
}

export interface UpdateResponse {}

export interface DeleteRequest {
  namespace: string;
  type: string;
  id: string;
}

export interface DeleteResponse {}

export interface ConfigResponse {
  /** Data raw config data. */
  data: string;
}

export interface KubernetesResourceSpec {
  spec: string;
}

const baseGetResponse: object = { body: "" };

export const GetResponse = {
  encode(message: GetResponse, writer: Writer = Writer.create()): Writer {
    if (message.body !== "") {
      writer.uint32(10).string(message.body);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetResponse } as GetResponse;
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

  fromJSON(object: any): GetResponse {
    const message = { ...baseGetResponse } as GetResponse;
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body);
    } else {
      message.body = "";
    }
    return message;
  },

  toJSON(message: GetResponse): unknown {
    const obj: any = {};
    message.body !== undefined && (obj.body = message.body);
    return obj;
  },

  fromPartial(object: DeepPartial<GetResponse>): GetResponse {
    const message = { ...baseGetResponse } as GetResponse;
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = "";
    }
    return message;
  },
};

const baseListResponse: object = { messages: "" };

export const ListResponse = {
  encode(message: ListResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ListResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListResponse } as ListResponse;
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

  fromJSON(object: any): ListResponse {
    const message = { ...baseListResponse } as ListResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: ListResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) => e);
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ListResponse>): ListResponse {
    const message = { ...baseListResponse } as ListResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(e);
      }
    }
    return message;
  },
};

const baseCreateRequest: object = {};

export const CreateRequest = {
  encode(message: CreateRequest, writer: Writer = Writer.create()): Writer {
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateRequest } as CreateRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = Resource.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateRequest {
    const message = { ...baseCreateRequest } as CreateRequest;
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = Resource.fromJSON(object.resource);
    } else {
      message.resource = undefined;
    }
    return message;
  },

  toJSON(message: CreateRequest): unknown {
    const obj: any = {};
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateRequest>): CreateRequest {
    const message = { ...baseCreateRequest } as CreateRequest;
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = Resource.fromPartial(object.resource);
    } else {
      message.resource = undefined;
    }
    return message;
  },
};

const baseCreateResponse: object = {};

export const CreateResponse = {
  encode(_: CreateResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateResponse } as CreateResponse;
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

  fromJSON(_: any): CreateResponse {
    const message = { ...baseCreateResponse } as CreateResponse;
    return message;
  },

  toJSON(_: CreateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<CreateResponse>): CreateResponse {
    const message = { ...baseCreateResponse } as CreateResponse;
    return message;
  },
};

const baseUpdateRequest: object = { currentVersion: "" };

export const UpdateRequest = {
  encode(message: UpdateRequest, writer: Writer = Writer.create()): Writer {
    if (message.currentVersion !== "") {
      writer.uint32(10).string(message.currentVersion);
    }
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UpdateRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateRequest } as UpdateRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currentVersion = reader.string();
          break;
        case 2:
          message.resource = Resource.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateRequest {
    const message = { ...baseUpdateRequest } as UpdateRequest;
    if (object.currentVersion !== undefined && object.currentVersion !== null) {
      message.currentVersion = String(object.currentVersion);
    } else {
      message.currentVersion = "";
    }
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = Resource.fromJSON(object.resource);
    } else {
      message.resource = undefined;
    }
    return message;
  },

  toJSON(message: UpdateRequest): unknown {
    const obj: any = {};
    message.currentVersion !== undefined &&
      (obj.currentVersion = message.currentVersion);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateRequest>): UpdateRequest {
    const message = { ...baseUpdateRequest } as UpdateRequest;
    if (object.currentVersion !== undefined && object.currentVersion !== null) {
      message.currentVersion = object.currentVersion;
    } else {
      message.currentVersion = "";
    }
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = Resource.fromPartial(object.resource);
    } else {
      message.resource = undefined;
    }
    return message;
  },
};

const baseUpdateResponse: object = {};

export const UpdateResponse = {
  encode(_: UpdateResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UpdateResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateResponse } as UpdateResponse;
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

  fromJSON(_: any): UpdateResponse {
    const message = { ...baseUpdateResponse } as UpdateResponse;
    return message;
  },

  toJSON(_: UpdateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<UpdateResponse>): UpdateResponse {
    const message = { ...baseUpdateResponse } as UpdateResponse;
    return message;
  },
};

const baseDeleteRequest: object = { namespace: "", type: "", id: "" };

export const DeleteRequest = {
  encode(message: DeleteRequest, writer: Writer = Writer.create()): Writer {
    if (message.namespace !== "") {
      writer.uint32(10).string(message.namespace);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteRequest } as DeleteRequest;
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteRequest {
    const message = { ...baseDeleteRequest } as DeleteRequest;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = String(object.namespace);
    } else {
      message.namespace = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: DeleteRequest): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.type !== undefined && (obj.type = message.type);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteRequest>): DeleteRequest {
    const message = { ...baseDeleteRequest } as DeleteRequest;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = object.namespace;
    } else {
      message.namespace = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseDeleteResponse: object = {};

export const DeleteResponse = {
  encode(_: DeleteResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteResponse } as DeleteResponse;
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

  fromJSON(_: any): DeleteResponse {
    const message = { ...baseDeleteResponse } as DeleteResponse;
    return message;
  },

  toJSON(_: DeleteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<DeleteResponse>): DeleteResponse {
    const message = { ...baseDeleteResponse } as DeleteResponse;
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

const baseKubernetesResourceSpec: object = { spec: "" };

export const KubernetesResourceSpec = {
  encode(
    message: KubernetesResourceSpec,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.spec !== "") {
      writer.uint32(10).string(message.spec);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): KubernetesResourceSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseKubernetesResourceSpec } as KubernetesResourceSpec;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spec = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KubernetesResourceSpec {
    const message = { ...baseKubernetesResourceSpec } as KubernetesResourceSpec;
    if (object.spec !== undefined && object.spec !== null) {
      message.spec = String(object.spec);
    } else {
      message.spec = "";
    }
    return message;
  },

  toJSON(message: KubernetesResourceSpec): unknown {
    const obj: any = {};
    message.spec !== undefined && (obj.spec = message.spec);
    return obj;
  },

  fromPartial(
    object: DeepPartial<KubernetesResourceSpec>
  ): KubernetesResourceSpec {
    const message = { ...baseKubernetesResourceSpec } as KubernetesResourceSpec;
    if (object.spec !== undefined && object.spec !== null) {
      message.spec = object.spec;
    } else {
      message.spec = "";
    }
    return message;
  },
};

export interface ResourceService {
  Get(request: GetRequest): Promise<GetResponse>;
  List(request: ListRequest): Promise<ListResponse>;
  Create(request: CreateRequest): Promise<CreateResponse>;
  Update(request: UpdateRequest): Promise<UpdateResponse>;
  Delete(request: DeleteRequest): Promise<DeleteResponse>;
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
