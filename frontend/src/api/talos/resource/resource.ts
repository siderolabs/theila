/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { Observable } from "rxjs";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Metadata as Metadata1 } from "../../common/common";

export const protobufPackage = "resource";

export enum EventType {
  CREATED = 0,
  UPDATED = 1,
  DESTROYED = 2,
  UNRECOGNIZED = -1,
}

export function eventTypeFromJSON(object: any): EventType {
  switch (object) {
    case 0:
    case "CREATED":
      return EventType.CREATED;
    case 1:
    case "UPDATED":
      return EventType.UPDATED;
    case 2:
    case "DESTROYED":
      return EventType.DESTROYED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EventType.UNRECOGNIZED;
  }
}

export function eventTypeToJSON(object: EventType): string {
  switch (object) {
    case EventType.CREATED:
      return "CREATED";
    case EventType.UPDATED:
      return "UPDATED";
    case EventType.DESTROYED:
      return "DESTROYED";
    default:
      return "UNKNOWN";
  }
}

export interface Resource {
  metadata: Metadata | undefined;
  spec: Spec | undefined;
}

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

export interface Spec {
  yaml: Uint8Array;
}

/** rpc Get */
export interface GetRequest {
  namespace: string;
  type: string;
  id: string;
}

/** The GetResponse message contains the Resource returned. */
export interface Get {
  metadata: Metadata1 | undefined;
  definition: Resource | undefined;
  resource: Resource | undefined;
}

export interface GetResponse {
  messages: Get[];
}

/**
 * rpc List
 * The ListResponse message contains the Resource returned.
 */
export interface ListRequest {
  namespace: string;
  type: string;
}

export interface ListResponse {
  metadata: Metadata1 | undefined;
  definition: Resource | undefined;
  resource: Resource | undefined;
}

/**
 * rpc Watch
 * The WatchResponse message contains the Resource returned.
 */
export interface WatchRequest {
  namespace: string;
  type: string;
  id: string;
  tail_events: number;
}

export interface WatchResponse {
  metadata: Metadata1 | undefined;
  event_type: EventType;
  definition: Resource | undefined;
  resource: Resource | undefined;
}

const baseResource: object = {};

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
    const message = { ...baseResource } as Resource;
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
    const message = { ...baseResource } as Resource;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.spec !== undefined && object.spec !== null) {
      message.spec = Spec.fromJSON(object.spec);
    } else {
      message.spec = undefined;
    }
    return message;
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

  fromPartial(object: DeepPartial<Resource>): Resource {
    const message = { ...baseResource } as Resource;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.spec !== undefined && object.spec !== null) {
      message.spec = Spec.fromPartial(object.spec);
    } else {
      message.spec = undefined;
    }
    return message;
  },
};

const baseMetadata: object = {
  namespace: "",
  type: "",
  id: "",
  version: "",
  owner: "",
  phase: "",
  finalizers: "",
};

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
      writer.uint32(58).string(message.owner);
    }
    if (message.phase !== "") {
      writer.uint32(42).string(message.phase);
    }
    if (message.created !== undefined) {
      Timestamp.encode(
        toTimestamp(message.created),
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.updated !== undefined) {
      Timestamp.encode(
        toTimestamp(message.updated),
        writer.uint32(74).fork()
      ).ldelim();
    }
    for (const v of message.finalizers) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMetadata } as Metadata;
    message.finalizers = [];
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
        case 7:
          message.owner = reader.string();
          break;
        case 5:
          message.phase = reader.string();
          break;
        case 8:
          message.created = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 9:
          message.updated = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
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
    const message = { ...baseMetadata } as Metadata;
    message.finalizers = [];
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
    if (object.version !== undefined && object.version !== null) {
      message.version = String(object.version);
    } else {
      message.version = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.phase !== undefined && object.phase !== null) {
      message.phase = String(object.phase);
    } else {
      message.phase = "";
    }
    if (object.created !== undefined && object.created !== null) {
      message.created = fromJsonTimestamp(object.created);
    } else {
      message.created = undefined;
    }
    if (object.updated !== undefined && object.updated !== null) {
      message.updated = fromJsonTimestamp(object.updated);
    } else {
      message.updated = undefined;
    }
    if (object.finalizers !== undefined && object.finalizers !== null) {
      for (const e of object.finalizers) {
        message.finalizers.push(String(e));
      }
    }
    return message;
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

  fromPartial(object: DeepPartial<Metadata>): Metadata {
    const message = { ...baseMetadata } as Metadata;
    message.finalizers = [];
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
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    } else {
      message.version = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.phase !== undefined && object.phase !== null) {
      message.phase = object.phase;
    } else {
      message.phase = "";
    }
    if (object.created !== undefined && object.created !== null) {
      message.created = object.created;
    } else {
      message.created = undefined;
    }
    if (object.updated !== undefined && object.updated !== null) {
      message.updated = object.updated;
    } else {
      message.updated = undefined;
    }
    if (object.finalizers !== undefined && object.finalizers !== null) {
      for (const e of object.finalizers) {
        message.finalizers.push(e);
      }
    }
    return message;
  },
};

const baseSpec: object = {};

export const Spec = {
  encode(message: Spec, writer: Writer = Writer.create()): Writer {
    if (message.yaml.length !== 0) {
      writer.uint32(10).bytes(message.yaml);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Spec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSpec } as Spec;
    message.yaml = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.yaml = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Spec {
    const message = { ...baseSpec } as Spec;
    message.yaml = new Uint8Array();
    if (object.yaml !== undefined && object.yaml !== null) {
      message.yaml = bytesFromBase64(object.yaml);
    }
    return message;
  },

  toJSON(message: Spec): unknown {
    const obj: any = {};
    message.yaml !== undefined &&
      (obj.yaml = base64FromBytes(
        message.yaml !== undefined ? message.yaml : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<Spec>): Spec {
    const message = { ...baseSpec } as Spec;
    if (object.yaml !== undefined && object.yaml !== null) {
      message.yaml = object.yaml;
    } else {
      message.yaml = new Uint8Array();
    }
    return message;
  },
};

const baseGetRequest: object = { namespace: "", type: "", id: "" };

export const GetRequest = {
  encode(message: GetRequest, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): GetRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetRequest } as GetRequest;
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

  fromJSON(object: any): GetRequest {
    const message = { ...baseGetRequest } as GetRequest;
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

  toJSON(message: GetRequest): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.type !== undefined && (obj.type = message.type);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<GetRequest>): GetRequest {
    const message = { ...baseGetRequest } as GetRequest;
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

const baseGet: object = {};

export const Get = {
  encode(message: Get, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata1.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.definition !== undefined) {
      Resource.encode(message.definition, writer.uint32(18).fork()).ldelim();
    }
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Get {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGet } as Get;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata1.decode(reader, reader.uint32());
          break;
        case 2:
          message.definition = Resource.decode(reader, reader.uint32());
          break;
        case 3:
          message.resource = Resource.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Get {
    const message = { ...baseGet } as Get;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata1.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.definition !== undefined && object.definition !== null) {
      message.definition = Resource.fromJSON(object.definition);
    } else {
      message.definition = undefined;
    }
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = Resource.fromJSON(object.resource);
    } else {
      message.resource = undefined;
    }
    return message;
  },

  toJSON(message: Get): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata1.toJSON(message.metadata)
        : undefined);
    message.definition !== undefined &&
      (obj.definition = message.definition
        ? Resource.toJSON(message.definition)
        : undefined);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Get>): Get {
    const message = { ...baseGet } as Get;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata1.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.definition !== undefined && object.definition !== null) {
      message.definition = Resource.fromPartial(object.definition);
    } else {
      message.definition = undefined;
    }
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = Resource.fromPartial(object.resource);
    } else {
      message.resource = undefined;
    }
    return message;
  },
};

const baseGetResponse: object = {};

export const GetResponse = {
  encode(message: GetResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Get.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetResponse } as GetResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Get.decode(reader, reader.uint32()));
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
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Get.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GetResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Get.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GetResponse>): GetResponse {
    const message = { ...baseGetResponse } as GetResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Get.fromPartial(e));
      }
    }
    return message;
  },
};

const baseListRequest: object = { namespace: "", type: "" };

export const ListRequest = {
  encode(message: ListRequest, writer: Writer = Writer.create()): Writer {
    if (message.namespace !== "") {
      writer.uint32(10).string(message.namespace);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ListRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListRequest } as ListRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.namespace = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListRequest {
    const message = { ...baseListRequest } as ListRequest;
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
    return message;
  },

  toJSON(message: ListRequest): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.type !== undefined && (obj.type = message.type);
    return obj;
  },

  fromPartial(object: DeepPartial<ListRequest>): ListRequest {
    const message = { ...baseListRequest } as ListRequest;
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
    return message;
  },
};

const baseListResponse: object = {};

export const ListResponse = {
  encode(message: ListResponse, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata1.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.definition !== undefined) {
      Resource.encode(message.definition, writer.uint32(18).fork()).ldelim();
    }
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ListResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListResponse } as ListResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata1.decode(reader, reader.uint32());
          break;
        case 2:
          message.definition = Resource.decode(reader, reader.uint32());
          break;
        case 3:
          message.resource = Resource.decode(reader, reader.uint32());
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
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata1.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.definition !== undefined && object.definition !== null) {
      message.definition = Resource.fromJSON(object.definition);
    } else {
      message.definition = undefined;
    }
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = Resource.fromJSON(object.resource);
    } else {
      message.resource = undefined;
    }
    return message;
  },

  toJSON(message: ListResponse): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata1.toJSON(message.metadata)
        : undefined);
    message.definition !== undefined &&
      (obj.definition = message.definition
        ? Resource.toJSON(message.definition)
        : undefined);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ListResponse>): ListResponse {
    const message = { ...baseListResponse } as ListResponse;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata1.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.definition !== undefined && object.definition !== null) {
      message.definition = Resource.fromPartial(object.definition);
    } else {
      message.definition = undefined;
    }
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = Resource.fromPartial(object.resource);
    } else {
      message.resource = undefined;
    }
    return message;
  },
};

const baseWatchRequest: object = {
  namespace: "",
  type: "",
  id: "",
  tail_events: 0,
};

export const WatchRequest = {
  encode(message: WatchRequest, writer: Writer = Writer.create()): Writer {
    if (message.namespace !== "") {
      writer.uint32(10).string(message.namespace);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.tail_events !== 0) {
      writer.uint32(32).uint32(message.tail_events);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): WatchRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWatchRequest } as WatchRequest;
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
          message.tail_events = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WatchRequest {
    const message = { ...baseWatchRequest } as WatchRequest;
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
    if (object.tail_events !== undefined && object.tail_events !== null) {
      message.tail_events = Number(object.tail_events);
    } else {
      message.tail_events = 0;
    }
    return message;
  },

  toJSON(message: WatchRequest): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.type !== undefined && (obj.type = message.type);
    message.id !== undefined && (obj.id = message.id);
    message.tail_events !== undefined &&
      (obj.tail_events = message.tail_events);
    return obj;
  },

  fromPartial(object: DeepPartial<WatchRequest>): WatchRequest {
    const message = { ...baseWatchRequest } as WatchRequest;
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
    if (object.tail_events !== undefined && object.tail_events !== null) {
      message.tail_events = object.tail_events;
    } else {
      message.tail_events = 0;
    }
    return message;
  },
};

const baseWatchResponse: object = { event_type: 0 };

export const WatchResponse = {
  encode(message: WatchResponse, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata1.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.event_type !== 0) {
      writer.uint32(16).int32(message.event_type);
    }
    if (message.definition !== undefined) {
      Resource.encode(message.definition, writer.uint32(26).fork()).ldelim();
    }
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): WatchResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWatchResponse } as WatchResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata1.decode(reader, reader.uint32());
          break;
        case 2:
          message.event_type = reader.int32() as any;
          break;
        case 3:
          message.definition = Resource.decode(reader, reader.uint32());
          break;
        case 4:
          message.resource = Resource.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WatchResponse {
    const message = { ...baseWatchResponse } as WatchResponse;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata1.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.event_type !== undefined && object.event_type !== null) {
      message.event_type = eventTypeFromJSON(object.event_type);
    } else {
      message.event_type = 0;
    }
    if (object.definition !== undefined && object.definition !== null) {
      message.definition = Resource.fromJSON(object.definition);
    } else {
      message.definition = undefined;
    }
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = Resource.fromJSON(object.resource);
    } else {
      message.resource = undefined;
    }
    return message;
  },

  toJSON(message: WatchResponse): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata1.toJSON(message.metadata)
        : undefined);
    message.event_type !== undefined &&
      (obj.event_type = eventTypeToJSON(message.event_type));
    message.definition !== undefined &&
      (obj.definition = message.definition
        ? Resource.toJSON(message.definition)
        : undefined);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<WatchResponse>): WatchResponse {
    const message = { ...baseWatchResponse } as WatchResponse;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata1.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.event_type !== undefined && object.event_type !== null) {
      message.event_type = object.event_type;
    } else {
      message.event_type = 0;
    }
    if (object.definition !== undefined && object.definition !== null) {
      message.definition = Resource.fromPartial(object.definition);
    } else {
      message.definition = undefined;
    }
    if (object.resource !== undefined && object.resource !== null) {
      message.resource = Resource.fromPartial(object.resource);
    } else {
      message.resource = undefined;
    }
    return message;
  },
};

/**
 * The resource service definition.
 *
 * ResourceService provides user-facing API for the Talos resources.
 */
export interface ResourceService {
  Get(request: GetRequest): Promise<GetResponse>;
  List(request: ListRequest): Observable<ListResponse>;
  Watch(request: WatchRequest): Observable<WatchResponse>;
}

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
