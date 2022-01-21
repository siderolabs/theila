/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "common";

/** Data source. */
export enum Runtime {
  /** Kubernetes - Kubernetes control plane. */
  Kubernetes = 0,
  /** Talos - Talos apid. */
  Talos = 1,
  /** Theila - Theila internal runtime. */
  Theila = 2,
  UNRECOGNIZED = -1,
}

export function runtimeFromJSON(object: any): Runtime {
  switch (object) {
    case 0:
    case "Kubernetes":
      return Runtime.Kubernetes;
    case 1:
    case "Talos":
      return Runtime.Talos;
    case 2:
    case "Theila":
      return Runtime.Theila;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Runtime.UNRECOGNIZED;
  }
}

export function runtimeToJSON(object: Runtime): string {
  switch (object) {
    case Runtime.Kubernetes:
      return "Kubernetes";
    case Runtime.Talos:
      return "Talos";
    case Runtime.Theila:
      return "Theila";
    default:
      return "UNKNOWN";
  }
}

/** Cluster contains settings for fetching the config from cluster resource in Kubernetes. */
export interface Cluster {
  /** Name of the cluster. */
  name: string;
  /** Namespace of the cluster. */
  namespace: string;
  /** UID of the cluster. */
  uid: string;
}

/** Context represents Kubernetes or Talos config source. */
export interface Context {
  /** Name fetches the config from the top level Kubeconfig or Talosconfig. */
  name: string;
  /** Cluster fetches the context from the cluster resource in Kubernetes. */
  cluster: Cluster | undefined;
  /** Nodes to fetch the data from using Talos client. */
  nodes: string[];
}

function createBaseCluster(): Cluster {
  return { name: "", namespace: "", uid: "" };
}

export const Cluster = {
  encode(message: Cluster, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.namespace !== "") {
      writer.uint32(18).string(message.namespace);
    }
    if (message.uid !== "") {
      writer.uint32(26).string(message.uid);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Cluster {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCluster();
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
          message.uid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Cluster {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      uid: isSet(object.uid) ? String(object.uid) : "",
    };
  },

  toJSON(message: Cluster): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.uid !== undefined && (obj.uid = message.uid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Cluster>, I>>(object: I): Cluster {
    const message = createBaseCluster();
    message.name = object.name ?? "";
    message.namespace = object.namespace ?? "";
    message.uid = object.uid ?? "";
    return message;
  },
};

function createBaseContext(): Context {
  return { name: "", cluster: undefined, nodes: [] };
}

export const Context = {
  encode(message: Context, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.cluster !== undefined) {
      Cluster.encode(message.cluster, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.nodes) {
      writer.uint32(26).string(v!);
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
          message.cluster = Cluster.decode(reader, reader.uint32());
          break;
        case 3:
          message.nodes.push(reader.string());
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
      cluster: isSet(object.cluster)
        ? Cluster.fromJSON(object.cluster)
        : undefined,
      nodes: Array.isArray(object?.nodes)
        ? object.nodes.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: Context): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.cluster !== undefined &&
      (obj.cluster = message.cluster
        ? Cluster.toJSON(message.cluster)
        : undefined);
    if (message.nodes) {
      obj.nodes = message.nodes.map((e) => e);
    } else {
      obj.nodes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Context>, I>>(object: I): Context {
    const message = createBaseContext();
    message.name = object.name ?? "";
    message.cluster =
      object.cluster !== undefined && object.cluster !== null
        ? Cluster.fromPartial(object.cluster)
        : undefined;
    message.nodes = object.nodes?.map((e) => e) || [];
    return message;
  },
};

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
