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
  /** Spec contains JSON encoded Kubernetes runtime object. */
  spec: string;
}

function createBaseGetResponse(): GetResponse {
  return { body: "" };
}

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
    const message = createBaseGetResponse();
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
    return {
      body: isSet(object.body) ? String(object.body) : "",
    };
  },

  toJSON(message: GetResponse): unknown {
    const obj: any = {};
    message.body !== undefined && (obj.body = message.body);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetResponse>, I>>(
    object: I
  ): GetResponse {
    const message = createBaseGetResponse();
    message.body = object.body ?? "";
    return message;
  },
};

function createBaseListResponse(): ListResponse {
  return { messages: [] };
}

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
    const message = createBaseListResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => String(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<ListResponse>, I>>(
    object: I
  ): ListResponse {
    const message = createBaseListResponse();
    message.messages = object.messages?.map((e) => e) || [];
    return message;
  },
};

function createBaseCreateRequest(): CreateRequest {
  return { resource: undefined };
}

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
    const message = createBaseCreateRequest();
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
    return {
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
    };
  },

  toJSON(message: CreateRequest): unknown {
    const obj: any = {};
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateRequest>, I>>(
    object: I
  ): CreateRequest {
    const message = createBaseCreateRequest();
    message.resource =
      object.resource !== undefined && object.resource !== null
        ? Resource.fromPartial(object.resource)
        : undefined;
    return message;
  },
};

function createBaseCreateResponse(): CreateResponse {
  return {};
}

export const CreateResponse = {
  encode(_: CreateResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateResponse();
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
    return {};
  },

  toJSON(_: CreateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateResponse>, I>>(
    _: I
  ): CreateResponse {
    const message = createBaseCreateResponse();
    return message;
  },
};

function createBaseUpdateRequest(): UpdateRequest {
  return { currentVersion: "", resource: undefined };
}

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
    const message = createBaseUpdateRequest();
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
    return {
      currentVersion: isSet(object.currentVersion)
        ? String(object.currentVersion)
        : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
    };
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

  fromPartial<I extends Exact<DeepPartial<UpdateRequest>, I>>(
    object: I
  ): UpdateRequest {
    const message = createBaseUpdateRequest();
    message.currentVersion = object.currentVersion ?? "";
    message.resource =
      object.resource !== undefined && object.resource !== null
        ? Resource.fromPartial(object.resource)
        : undefined;
    return message;
  },
};

function createBaseUpdateResponse(): UpdateResponse {
  return {};
}

export const UpdateResponse = {
  encode(_: UpdateResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UpdateResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateResponse();
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
    return {};
  },

  toJSON(_: UpdateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateResponse>, I>>(
    _: I
  ): UpdateResponse {
    const message = createBaseUpdateResponse();
    return message;
  },
};

function createBaseDeleteRequest(): DeleteRequest {
  return { namespace: "", type: "", id: "" };
}

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
    const message = createBaseDeleteRequest();
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
    return {
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      type: isSet(object.type) ? String(object.type) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: DeleteRequest): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.type !== undefined && (obj.type = message.type);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteRequest>, I>>(
    object: I
  ): DeleteRequest {
    const message = createBaseDeleteRequest();
    message.namespace = object.namespace ?? "";
    message.type = object.type ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseDeleteResponse(): DeleteResponse {
  return {};
}

export const DeleteResponse = {
  encode(_: DeleteResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteResponse();
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
    return {};
  },

  toJSON(_: DeleteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteResponse>, I>>(
    _: I
  ): DeleteResponse {
    const message = createBaseDeleteResponse();
    return message;
  },
};

function createBaseConfigResponse(): ConfigResponse {
  return { data: "" };
}

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
    const message = createBaseConfigResponse();
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
    return {
      data: isSet(object.data) ? String(object.data) : "",
    };
  },

  toJSON(message: ConfigResponse): unknown {
    const obj: any = {};
    message.data !== undefined && (obj.data = message.data);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConfigResponse>, I>>(
    object: I
  ): ConfigResponse {
    const message = createBaseConfigResponse();
    message.data = object.data ?? "";
    return message;
  },
};

function createBaseKubernetesResourceSpec(): KubernetesResourceSpec {
  return { spec: "" };
}

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
    const message = createBaseKubernetesResourceSpec();
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
    return {
      spec: isSet(object.spec) ? String(object.spec) : "",
    };
  },

  toJSON(message: KubernetesResourceSpec): unknown {
    const obj: any = {};
    message.spec !== undefined && (obj.spec = message.spec);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KubernetesResourceSpec>, I>>(
    object: I
  ): KubernetesResourceSpec {
    const message = createBaseKubernetesResourceSpec();
    message.spec = object.spec ?? "";
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
