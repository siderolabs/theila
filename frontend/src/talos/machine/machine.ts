/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import {
  ContainerDriver,
  Metadata,
  Error,
  Data,
  containerDriverFromJSON,
  containerDriverToJSON,
} from "../../common/common";
import { Observable } from "rxjs";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Any } from "../../google/protobuf/any";
import { Duration } from "../../google/protobuf/duration";
import { Empty } from "../../google/protobuf/empty";

export const protobufPackage = "machine";

/**
 * rpc applyConfiguration
 * ApplyConfiguration describes a request to assert a new configuration upon a
 * node.
 */
export interface ApplyConfigurationRequest {
  data: Uint8Array;
  on_reboot: boolean;
  immediate: boolean;
}

/** ApplyConfigurationResponse describes the response to a configuration request. */
export interface ApplyConfiguration {
  metadata: Metadata | undefined;
  /** Configuration validation warnings. */
  warnings: string[];
}

export interface ApplyConfigurationResponse {
  messages: ApplyConfiguration[];
}

/**
 * rpc reboot
 * The reboot message containing the reboot status.
 */
export interface Reboot {
  metadata: Metadata | undefined;
}

export interface RebootResponse {
  messages: Reboot[];
}

/** rpc Bootstrap */
export interface BootstrapRequest {
  /**
   * Enable etcd recovery from the snapshot.
   *
   * Snapshot should be uploaded before this call via EtcdRecover RPC.
   */
  recover_etcd: boolean;
  /**
   * Skip hash check on the snapshot (etcd).
   *
   * Enable this when recovering from data directory copy to skip integrity check.
   */
  recover_skip_hash_check: boolean;
}

/** The bootstrap message containing the bootstrap status. */
export interface Bootstrap {
  metadata: Metadata | undefined;
}

export interface BootstrapResponse {
  messages: Bootstrap[];
}

/** rpc events */
export interface SequenceEvent {
  sequence: string;
  action: SequenceEvent_Action;
  error: Error | undefined;
}

export enum SequenceEvent_Action {
  NOOP = 0,
  START = 1,
  STOP = 2,
  UNRECOGNIZED = -1,
}

export function sequenceEvent_ActionFromJSON(
  object: any
): SequenceEvent_Action {
  switch (object) {
    case 0:
    case "NOOP":
      return SequenceEvent_Action.NOOP;
    case 1:
    case "START":
      return SequenceEvent_Action.START;
    case 2:
    case "STOP":
      return SequenceEvent_Action.STOP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SequenceEvent_Action.UNRECOGNIZED;
  }
}

export function sequenceEvent_ActionToJSON(
  object: SequenceEvent_Action
): string {
  switch (object) {
    case SequenceEvent_Action.NOOP:
      return "NOOP";
    case SequenceEvent_Action.START:
      return "START";
    case SequenceEvent_Action.STOP:
      return "STOP";
    default:
      return "UNKNOWN";
  }
}

export interface PhaseEvent {
  phase: string;
  action: PhaseEvent_Action;
}

export enum PhaseEvent_Action {
  START = 0,
  STOP = 1,
  UNRECOGNIZED = -1,
}

export function phaseEvent_ActionFromJSON(object: any): PhaseEvent_Action {
  switch (object) {
    case 0:
    case "START":
      return PhaseEvent_Action.START;
    case 1:
    case "STOP":
      return PhaseEvent_Action.STOP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PhaseEvent_Action.UNRECOGNIZED;
  }
}

export function phaseEvent_ActionToJSON(object: PhaseEvent_Action): string {
  switch (object) {
    case PhaseEvent_Action.START:
      return "START";
    case PhaseEvent_Action.STOP:
      return "STOP";
    default:
      return "UNKNOWN";
  }
}

export interface TaskEvent {
  task: string;
  action: TaskEvent_Action;
}

export enum TaskEvent_Action {
  START = 0,
  STOP = 1,
  UNRECOGNIZED = -1,
}

export function taskEvent_ActionFromJSON(object: any): TaskEvent_Action {
  switch (object) {
    case 0:
    case "START":
      return TaskEvent_Action.START;
    case 1:
    case "STOP":
      return TaskEvent_Action.STOP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TaskEvent_Action.UNRECOGNIZED;
  }
}

export function taskEvent_ActionToJSON(object: TaskEvent_Action): string {
  switch (object) {
    case TaskEvent_Action.START:
      return "START";
    case TaskEvent_Action.STOP:
      return "STOP";
    default:
      return "UNKNOWN";
  }
}

export interface ServiceStateEvent {
  service: string;
  action: ServiceStateEvent_Action;
  message: string;
  health: ServiceHealth | undefined;
}

export enum ServiceStateEvent_Action {
  INITIALIZED = 0,
  PREPARING = 1,
  WAITING = 2,
  RUNNING = 3,
  STOPPING = 4,
  FINISHED = 5,
  FAILED = 6,
  SKIPPED = 7,
  UNRECOGNIZED = -1,
}

export function serviceStateEvent_ActionFromJSON(
  object: any
): ServiceStateEvent_Action {
  switch (object) {
    case 0:
    case "INITIALIZED":
      return ServiceStateEvent_Action.INITIALIZED;
    case 1:
    case "PREPARING":
      return ServiceStateEvent_Action.PREPARING;
    case 2:
    case "WAITING":
      return ServiceStateEvent_Action.WAITING;
    case 3:
    case "RUNNING":
      return ServiceStateEvent_Action.RUNNING;
    case 4:
    case "STOPPING":
      return ServiceStateEvent_Action.STOPPING;
    case 5:
    case "FINISHED":
      return ServiceStateEvent_Action.FINISHED;
    case 6:
    case "FAILED":
      return ServiceStateEvent_Action.FAILED;
    case 7:
    case "SKIPPED":
      return ServiceStateEvent_Action.SKIPPED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ServiceStateEvent_Action.UNRECOGNIZED;
  }
}

export function serviceStateEvent_ActionToJSON(
  object: ServiceStateEvent_Action
): string {
  switch (object) {
    case ServiceStateEvent_Action.INITIALIZED:
      return "INITIALIZED";
    case ServiceStateEvent_Action.PREPARING:
      return "PREPARING";
    case ServiceStateEvent_Action.WAITING:
      return "WAITING";
    case ServiceStateEvent_Action.RUNNING:
      return "RUNNING";
    case ServiceStateEvent_Action.STOPPING:
      return "STOPPING";
    case ServiceStateEvent_Action.FINISHED:
      return "FINISHED";
    case ServiceStateEvent_Action.FAILED:
      return "FAILED";
    case ServiceStateEvent_Action.SKIPPED:
      return "SKIPPED";
    default:
      return "UNKNOWN";
  }
}

export interface RestartEvent {
  cmd: number;
}

export interface EventsRequest {
  tail_events: number;
  tail_id: string;
  tail_seconds: number;
}

export interface Event {
  metadata: Metadata | undefined;
  data: Any | undefined;
  id: string;
}

/** rpc reset */
export interface ResetPartitionSpec {
  label: string;
  wipe: boolean;
}

export interface ResetRequest {
  /**
   * Graceful indicates whether node should leave etcd before the upgrade, it also
   * enforces etcd checks before leaving.
   */
  graceful: boolean;
  /** Reboot indicates whether node should reboot or halt after resetting. */
  reboot: boolean;
  /**
   * System_partitions_to_wipe lists specific system disk partitions to be reset (wiped).
   * If system_partitions_to_wipe is empty, all the partitions are erased.
   */
  system_partitions_to_wipe: ResetPartitionSpec[];
}

/** The reset message containing the restart status. */
export interface Reset {
  metadata: Metadata | undefined;
}

export interface ResetResponse {
  messages: Reset[];
}

/**
 * rpc shutdown
 * The messages message containing the shutdown status.
 */
export interface Shutdown {
  metadata: Metadata | undefined;
}

export interface ShutdownResponse {
  messages: Shutdown[];
}

/** rpc upgrade */
export interface UpgradeRequest {
  image: string;
  preserve: boolean;
  stage: boolean;
  force: boolean;
}

export interface Upgrade {
  metadata: Metadata | undefined;
  ack: string;
}

export interface UpgradeResponse {
  messages: Upgrade[];
}

/** rpc servicelist */
export interface ServiceList {
  metadata: Metadata | undefined;
  services: ServiceInfo[];
}

export interface ServiceListResponse {
  messages: ServiceList[];
}

export interface ServiceInfo {
  id: string;
  state: string;
  events: ServiceEvents | undefined;
  health: ServiceHealth | undefined;
}

export interface ServiceEvents {
  events: ServiceEvent[];
}

export interface ServiceEvent {
  msg: string;
  state: string;
  ts: Date | undefined;
}

export interface ServiceHealth {
  unknown: boolean;
  healthy: boolean;
  last_message: string;
  last_change: Date | undefined;
}

/** rpc servicestart */
export interface ServiceStartRequest {
  id: string;
}

export interface ServiceStart {
  metadata: Metadata | undefined;
  resp: string;
}

export interface ServiceStartResponse {
  messages: ServiceStart[];
}

export interface ServiceStopRequest {
  id: string;
}

export interface ServiceStop {
  metadata: Metadata | undefined;
  resp: string;
}

export interface ServiceStopResponse {
  messages: ServiceStop[];
}

export interface ServiceRestartRequest {
  id: string;
}

export interface ServiceRestart {
  metadata: Metadata | undefined;
  resp: string;
}

export interface ServiceRestartResponse {
  messages: ServiceRestart[];
}

/** @deprecated */
export interface StartRequest {
  id: string;
}

/** @deprecated */
export interface StartResponse {
  resp: string;
}

/** @deprecated */
export interface StopRequest {
  id: string;
}

/** @deprecated */
export interface StopResponse {
  resp: string;
}

/**
 * CopyRequest describes a request to copy data out of Talos node
 *
 * Copy produces .tar.gz archive which is streamed back to the caller
 */
export interface CopyRequest {
  /** Root path to start copying data out, it might be either a file or directory */
  root_path: string;
}

/** ListRequest describes a request to list the contents of a directory. */
export interface ListRequest {
  /**
   * Root indicates the root directory for the list. If not indicated, '/' is
   * presumed.
   */
  root: string;
  /** Recurse indicates that subdirectories should be recursed. */
  recurse: boolean;
  /**
   * RecursionDepth indicates how many levels of subdirectories should be
   * recursed. The default (0) indicates that no limit should be enforced.
   */
  recursion_depth: number;
  /**
   * Types indicates what file type should be returned. If not indicated,
   * all files will be returned.
   */
  types: ListRequest_Type[];
}

/** File type. */
export enum ListRequest_Type {
  /** REGULAR - Regular file (not directory, symlink, etc). */
  REGULAR = 0,
  /** DIRECTORY - Directory. */
  DIRECTORY = 1,
  /** SYMLINK - Symbolic link. */
  SYMLINK = 2,
  UNRECOGNIZED = -1,
}

export function listRequest_TypeFromJSON(object: any): ListRequest_Type {
  switch (object) {
    case 0:
    case "REGULAR":
      return ListRequest_Type.REGULAR;
    case 1:
    case "DIRECTORY":
      return ListRequest_Type.DIRECTORY;
    case 2:
    case "SYMLINK":
      return ListRequest_Type.SYMLINK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ListRequest_Type.UNRECOGNIZED;
  }
}

export function listRequest_TypeToJSON(object: ListRequest_Type): string {
  switch (object) {
    case ListRequest_Type.REGULAR:
      return "REGULAR";
    case ListRequest_Type.DIRECTORY:
      return "DIRECTORY";
    case ListRequest_Type.SYMLINK:
      return "SYMLINK";
    default:
      return "UNKNOWN";
  }
}

/** DiskUsageRequest describes a request to list disk usage of directories and regular files */
export interface DiskUsageRequest {
  /**
   * RecursionDepth indicates how many levels of subdirectories should be
   * recursed. The default (0) indicates that no limit should be enforced.
   */
  recursion_depth: number;
  /** All write sizes for all files, not just directories. */
  all: boolean;
  /**
   * Threshold exclude entries smaller than SIZE if positive,
   * or entries greater than SIZE if negative.
   */
  threshold: number;
  /** DiskUsagePaths is the list of directories to calculate disk usage for. */
  paths: string[];
}

/** FileInfo describes a file or directory's information */
export interface FileInfo {
  metadata: Metadata | undefined;
  /** Name is the name (including prefixed path) of the file or directory */
  name: string;
  /** Size indicates the number of bytes contained within the file */
  size: number;
  /** Mode is the bitmap of UNIX mode/permission flags of the file */
  mode: number;
  /** Modified indicates the UNIX timestamp at which the file was last modified */
  modified: number;
  /** IsDir indicates that the file is a directory */
  is_dir: boolean;
  /**
   * Error describes any error encountered while trying to read the file
   * information.
   */
  error: string;
  /** Link is filled with symlink target */
  link: string;
  /** RelativeName is the name of the file or directory relative to the RootPath */
  relative_name: string;
}

/** DiskUsageInfo describes a file or directory's information for du command */
export interface DiskUsageInfo {
  metadata: Metadata | undefined;
  /** Name is the name (including prefixed path) of the file or directory */
  name: string;
  /** Size indicates the number of bytes contained within the file */
  size: number;
  /**
   * Error describes any error encountered while trying to read the file
   * information.
   */
  error: string;
  /** RelativeName is the name of the file or directory relative to the RootPath */
  relative_name: string;
}

/** The messages message containing the requested df stats. */
export interface Mounts {
  metadata: Metadata | undefined;
  stats: MountStat[];
}

export interface MountsResponse {
  messages: Mounts[];
}

/** The messages message containing the requested processes. */
export interface MountStat {
  filesystem: string;
  size: number;
  available: number;
  mounted_on: string;
}

export interface Version {
  metadata: Metadata | undefined;
  version: VersionInfo | undefined;
  platform: PlatformInfo | undefined;
}

export interface VersionResponse {
  messages: Version[];
}

export interface VersionInfo {
  tag: string;
  sha: string;
  built: string;
  go_version: string;
  os: string;
  arch: string;
}

export interface PlatformInfo {
  name: string;
  mode: string;
}

/**
 * rpc logs
 * The request message containing the process name.
 */
export interface LogsRequest {
  namespace: string;
  id: string;
  /** driver might be default "containerd" or "cri" */
  driver: ContainerDriver;
  follow: boolean;
  tail_lines: number;
}

export interface ReadRequest {
  path: string;
}

/** rpc rollback */
export interface RollbackRequest {}

export interface Rollback {
  metadata: Metadata | undefined;
}

export interface RollbackResponse {
  messages: Rollback[];
}

export interface ContainersRequest {
  namespace: string;
  /** driver might be default "containerd" or "cri" */
  driver: ContainerDriver;
}

/** The messages message containing the requested containers. */
export interface ContainerInfo {
  namespace: string;
  id: string;
  image: string;
  pid: number;
  status: string;
  pod_id: string;
  name: string;
}

/** The messages message containing the requested containers. */
export interface Container {
  metadata: Metadata | undefined;
  containers: ContainerInfo[];
}

export interface ContainersResponse {
  messages: Container[];
}

/** dmesg */
export interface DmesgRequest {
  follow: boolean;
  tail: boolean;
}

/** rpc processes */
export interface ProcessesResponse {
  messages: Process[];
}

export interface Process {
  metadata: Metadata | undefined;
  processes: ProcessInfo[];
}

export interface ProcessInfo {
  pid: number;
  ppid: number;
  state: string;
  threads: number;
  cpu_time: number;
  virtual_memory: number;
  resident_memory: number;
  command: string;
  executable: string;
  args: string;
}

/**
 * rpc restart
 * The request message containing the process to restart.
 */
export interface RestartRequest {
  namespace: string;
  id: string;
  /** driver might be default "containerd" or "cri" */
  driver: ContainerDriver;
}

export interface Restart {
  metadata: Metadata | undefined;
}

/** The messages message containing the restart status. */
export interface RestartResponse {
  messages: Restart[];
}

/** The request message containing the containerd namespace. */
export interface StatsRequest {
  namespace: string;
  /** driver might be default "containerd" or "cri" */
  driver: ContainerDriver;
}

/** The messages message containing the requested stats. */
export interface Stats {
  metadata: Metadata | undefined;
  stats: Stat[];
}

export interface StatsResponse {
  messages: Stats[];
}

/** The messages message containing the requested stat. */
export interface Stat {
  namespace: string;
  id: string;
  memory_usage: number;
  cpu_usage: number;
  pod_id: string;
  name: string;
}

export interface Memory {
  metadata: Metadata | undefined;
  meminfo: MemInfo | undefined;
}

export interface MemoryResponse {
  messages: Memory[];
}

export interface MemInfo {
  memtotal: number;
  memfree: number;
  memavailable: number;
  buffers: number;
  cached: number;
  swapcached: number;
  active: number;
  inactive: number;
  activeanon: number;
  inactiveanon: number;
  activefile: number;
  inactivefile: number;
  unevictable: number;
  mlocked: number;
  swaptotal: number;
  swapfree: number;
  dirty: number;
  writeback: number;
  anonpages: number;
  mapped: number;
  shmem: number;
  slab: number;
  sreclaimable: number;
  sunreclaim: number;
  kernelstack: number;
  pagetables: number;
  nfsunstable: number;
  bounce: number;
  writebacktmp: number;
  commitlimit: number;
  committedas: number;
  vmalloctotal: number;
  vmallocused: number;
  vmallocchunk: number;
  hardwarecorrupted: number;
  anonhugepages: number;
  shmemhugepages: number;
  shmempmdmapped: number;
  cmatotal: number;
  cmafree: number;
  hugepagestotal: number;
  hugepagesfree: number;
  hugepagesrsvd: number;
  hugepagessurp: number;
  hugepagesize: number;
  directmap4k: number;
  directmap2m: number;
  directmap1g: number;
}

export interface HostnameResponse {
  messages: Hostname[];
}

export interface Hostname {
  metadata: Metadata | undefined;
  hostname: string;
}

export interface LoadAvgResponse {
  messages: LoadAvg[];
}

export interface LoadAvg {
  metadata: Metadata | undefined;
  load1: number;
  load5: number;
  load15: number;
}

export interface SystemStatResponse {
  messages: SystemStat[];
}

export interface SystemStat {
  metadata: Metadata | undefined;
  boot_time: number;
  cpu_total: CPUStat | undefined;
  cpu: CPUStat[];
  irq_total: number;
  irq: number[];
  context_switches: number;
  process_created: number;
  process_running: number;
  process_blocked: number;
  soft_irq_total: number;
  soft_irq: SoftIRQStat | undefined;
}

export interface CPUStat {
  user: number;
  nice: number;
  system: number;
  idle: number;
  iowait: number;
  irq: number;
  soft_irq: number;
  steal: number;
  guest: number;
  guest_nice: number;
}

export interface SoftIRQStat {
  hi: number;
  timer: number;
  net_tx: number;
  net_rx: number;
  block: number;
  block_io_poll: number;
  tasklet: number;
  sched: number;
  hrtimer: number;
  rcu: number;
}

export interface CPUInfoResponse {
  messages: CPUsInfo[];
}

export interface CPUsInfo {
  metadata: Metadata | undefined;
  cpu_info: CPUInfo[];
}

export interface CPUInfo {
  processor: number;
  vendor_id: string;
  cpu_family: string;
  model: string;
  model_name: string;
  stepping: string;
  microcode: string;
  cpu_mhz: number;
  cache_size: string;
  physical_id: string;
  siblings: number;
  core_id: string;
  cpu_cores: number;
  apic_id: string;
  initial_apic_id: string;
  fpu: string;
  fpu_exception: string;
  cpu_id_level: number;
  wp: string;
  flags: string[];
  bugs: string[];
  bogo_mips: number;
  cl_flush_size: number;
  cache_alignment: number;
  address_sizes: string;
  power_management: string;
}

export interface NetworkDeviceStatsResponse {
  messages: NetworkDeviceStats[];
}

export interface NetworkDeviceStats {
  metadata: Metadata | undefined;
  total: NetDev | undefined;
  devices: NetDev[];
}

export interface NetDev {
  name: string;
  rx_bytes: number;
  rx_packets: number;
  rx_errors: number;
  rx_dropped: number;
  rx_fifo: number;
  rx_frame: number;
  rx_compressed: number;
  rx_multicast: number;
  tx_bytes: number;
  tx_packets: number;
  tx_errors: number;
  tx_dropped: number;
  tx_fifo: number;
  tx_collisions: number;
  tx_carrier: number;
  tx_compressed: number;
}

export interface DiskStatsResponse {
  messages: DiskStats[];
}

export interface DiskStats {
  metadata: Metadata | undefined;
  total: DiskStat | undefined;
  devices: DiskStat[];
}

export interface DiskStat {
  name: string;
  read_completed: number;
  read_merged: number;
  read_sectors: number;
  read_time_ms: number;
  write_completed: number;
  write_merged: number;
  write_sectors: number;
  write_time_ms: number;
  io_in_progress: number;
  io_time_ms: number;
  io_time_weighted_ms: number;
  discard_completed: number;
  discard_merged: number;
  discard_sectors: number;
  discard_time_ms: number;
}

export interface EtcdLeaveClusterRequest {}

export interface EtcdLeaveCluster {
  metadata: Metadata | undefined;
}

export interface EtcdLeaveClusterResponse {
  messages: EtcdLeaveCluster[];
}

export interface EtcdRemoveMemberRequest {
  member: string;
}

export interface EtcdRemoveMember {
  metadata: Metadata | undefined;
}

export interface EtcdRemoveMemberResponse {
  messages: EtcdRemoveMember[];
}

export interface EtcdForfeitLeadershipRequest {}

export interface EtcdForfeitLeadership {
  metadata: Metadata | undefined;
  member: string;
}

export interface EtcdForfeitLeadershipResponse {
  messages: EtcdForfeitLeadership[];
}

export interface EtcdMemberListRequest {
  query_local: boolean;
}

/** EtcdMember describes a single etcd member. */
export interface EtcdMember {
  /** member ID. */
  id: number;
  /** human-readable name of the member. */
  hostname: string;
  /** the list of URLs the member exposes to clients for communication. */
  peer_urls: string[];
  /** the list of URLs the member exposes to the cluster for communication. */
  client_urls: string[];
}

/** EtcdMembers contains the list of members registered on the host. */
export interface EtcdMembers {
  metadata: Metadata | undefined;
  /** list of member hostnames. */
  legacy_members: string[];
  /** the list of etcd members registered on the node. */
  members: EtcdMember[];
}

export interface EtcdMemberListResponse {
  messages: EtcdMembers[];
}

export interface EtcdSnapshotRequest {}

export interface EtcdRecover {
  metadata: Metadata | undefined;
}

export interface EtcdRecoverResponse {
  messages: EtcdRecover[];
}

export interface RouteConfig {
  network: string;
  gateway: string;
  metric: number;
}

export interface DHCPOptionsConfig {
  route_metric: number;
}

export interface NetworkDeviceConfig {
  interface: string;
  cidr: string;
  mtu: number;
  dhcp: boolean;
  ignore: boolean;
  dhcp_options: DHCPOptionsConfig | undefined;
  routes: RouteConfig[];
}

export interface NetworkConfig {
  hostname: string;
  interfaces: NetworkDeviceConfig[];
}

export interface InstallConfig {
  install_disk: string;
  install_image: string;
}

export interface MachineConfig {
  type: MachineConfig_MachineType;
  install_config: InstallConfig | undefined;
  network_config: NetworkConfig | undefined;
  kubernetes_version: string;
}

export enum MachineConfig_MachineType {
  TYPE_UNKNOWN = 0,
  TYPE_INIT = 1,
  TYPE_CONTROL_PLANE = 2,
  TYPE_JOIN = 3,
  UNRECOGNIZED = -1,
}

export function machineConfig_MachineTypeFromJSON(
  object: any
): MachineConfig_MachineType {
  switch (object) {
    case 0:
    case "TYPE_UNKNOWN":
      return MachineConfig_MachineType.TYPE_UNKNOWN;
    case 1:
    case "TYPE_INIT":
      return MachineConfig_MachineType.TYPE_INIT;
    case 2:
    case "TYPE_CONTROL_PLANE":
      return MachineConfig_MachineType.TYPE_CONTROL_PLANE;
    case 3:
    case "TYPE_JOIN":
      return MachineConfig_MachineType.TYPE_JOIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MachineConfig_MachineType.UNRECOGNIZED;
  }
}

export function machineConfig_MachineTypeToJSON(
  object: MachineConfig_MachineType
): string {
  switch (object) {
    case MachineConfig_MachineType.TYPE_UNKNOWN:
      return "TYPE_UNKNOWN";
    case MachineConfig_MachineType.TYPE_INIT:
      return "TYPE_INIT";
    case MachineConfig_MachineType.TYPE_CONTROL_PLANE:
      return "TYPE_CONTROL_PLANE";
    case MachineConfig_MachineType.TYPE_JOIN:
      return "TYPE_JOIN";
    default:
      return "UNKNOWN";
  }
}

export interface ControlPlaneConfig {
  endpoint: string;
}

export interface CNIConfig {
  name: string;
  urls: string[];
}

export interface ClusterNetworkConfig {
  dns_domain: string;
  cni_config: CNIConfig | undefined;
}

export interface ClusterConfig {
  name: string;
  control_plane: ControlPlaneConfig | undefined;
  cluster_network: ClusterNetworkConfig | undefined;
  allow_scheduling_on_masters: boolean;
}

/**
 * GenerateConfigurationRequest describes a request to generate a new configuration
 * on a node.
 */
export interface GenerateConfigurationRequest {
  config_version: string;
  cluster_config: ClusterConfig | undefined;
  machine_config: MachineConfig | undefined;
  override_time: Date | undefined;
}

/** GenerateConfiguration describes the response to a generate configuration request. */
export interface GenerateConfiguration {
  metadata: Metadata | undefined;
  data: Uint8Array[];
  talosconfig: Uint8Array;
}

export interface GenerateConfigurationResponse {
  messages: GenerateConfiguration[];
}

/** RemoveBootkubeInitializedKeyResponse describes the response to a RemoveBootkubeInitializedKey request. */
export interface RemoveBootkubeInitializedKey {
  metadata: Metadata | undefined;
}

export interface RemoveBootkubeInitializedKeyResponse {
  messages: RemoveBootkubeInitializedKey[];
}

export interface GenerateClientConfigurationRequest {
  /** Roles in the generated client certificate. */
  roles: string[];
  /** Client certificate TTL. */
  crt_ttl: Duration | undefined;
}

export interface GenerateClientConfiguration {
  metadata: Metadata | undefined;
  /** PEM-encoded CA certificate. */
  ca: Uint8Array;
  /** PEM-encoded generated client certificate. */
  crt: Uint8Array;
  /** PEM-encoded generated client key. */
  key: Uint8Array;
  /** Client configuration (talosconfig) file content. */
  talosconfig: Uint8Array;
}

export interface GenerateClientConfigurationResponse {
  messages: GenerateClientConfiguration[];
}

const baseApplyConfigurationRequest: object = {
  on_reboot: false,
  immediate: false,
};

export const ApplyConfigurationRequest = {
  encode(
    message: ApplyConfigurationRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.on_reboot === true) {
      writer.uint32(16).bool(message.on_reboot);
    }
    if (message.immediate === true) {
      writer.uint32(24).bool(message.immediate);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): ApplyConfigurationRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseApplyConfigurationRequest,
    } as ApplyConfigurationRequest;
    message.data = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        case 2:
          message.on_reboot = reader.bool();
          break;
        case 3:
          message.immediate = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApplyConfigurationRequest {
    const message = {
      ...baseApplyConfigurationRequest,
    } as ApplyConfigurationRequest;
    message.data = new Uint8Array();
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.on_reboot !== undefined && object.on_reboot !== null) {
      message.on_reboot = Boolean(object.on_reboot);
    } else {
      message.on_reboot = false;
    }
    if (object.immediate !== undefined && object.immediate !== null) {
      message.immediate = Boolean(object.immediate);
    } else {
      message.immediate = false;
    }
    return message;
  },

  toJSON(message: ApplyConfigurationRequest): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.on_reboot !== undefined && (obj.on_reboot = message.on_reboot);
    message.immediate !== undefined && (obj.immediate = message.immediate);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ApplyConfigurationRequest>
  ): ApplyConfigurationRequest {
    const message = {
      ...baseApplyConfigurationRequest,
    } as ApplyConfigurationRequest;
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    if (object.on_reboot !== undefined && object.on_reboot !== null) {
      message.on_reboot = object.on_reboot;
    } else {
      message.on_reboot = false;
    }
    if (object.immediate !== undefined && object.immediate !== null) {
      message.immediate = object.immediate;
    } else {
      message.immediate = false;
    }
    return message;
  },
};

const baseApplyConfiguration: object = { warnings: "" };

export const ApplyConfiguration = {
  encode(
    message: ApplyConfiguration,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.warnings) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ApplyConfiguration {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseApplyConfiguration } as ApplyConfiguration;
    message.warnings = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.warnings.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApplyConfiguration {
    const message = { ...baseApplyConfiguration } as ApplyConfiguration;
    message.warnings = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.warnings !== undefined && object.warnings !== null) {
      for (const e of object.warnings) {
        message.warnings.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: ApplyConfiguration): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    if (message.warnings) {
      obj.warnings = message.warnings.map((e) => e);
    } else {
      obj.warnings = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ApplyConfiguration>): ApplyConfiguration {
    const message = { ...baseApplyConfiguration } as ApplyConfiguration;
    message.warnings = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.warnings !== undefined && object.warnings !== null) {
      for (const e of object.warnings) {
        message.warnings.push(e);
      }
    }
    return message;
  },
};

const baseApplyConfigurationResponse: object = {};

export const ApplyConfigurationResponse = {
  encode(
    message: ApplyConfigurationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      ApplyConfiguration.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): ApplyConfigurationResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseApplyConfigurationResponse,
    } as ApplyConfigurationResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(
            ApplyConfiguration.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApplyConfigurationResponse {
    const message = {
      ...baseApplyConfigurationResponse,
    } as ApplyConfigurationResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(ApplyConfiguration.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ApplyConfigurationResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? ApplyConfiguration.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<ApplyConfigurationResponse>
  ): ApplyConfigurationResponse {
    const message = {
      ...baseApplyConfigurationResponse,
    } as ApplyConfigurationResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(ApplyConfiguration.fromPartial(e));
      }
    }
    return message;
  },
};

const baseReboot: object = {};

export const Reboot = {
  encode(message: Reboot, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Reboot {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReboot } as Reboot;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Reboot {
    const message = { ...baseReboot } as Reboot;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: Reboot): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Reboot>): Reboot {
    const message = { ...baseReboot } as Reboot;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },
};

const baseRebootResponse: object = {};

export const RebootResponse = {
  encode(message: RebootResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Reboot.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RebootResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRebootResponse } as RebootResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Reboot.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RebootResponse {
    const message = { ...baseRebootResponse } as RebootResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Reboot.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: RebootResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Reboot.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<RebootResponse>): RebootResponse {
    const message = { ...baseRebootResponse } as RebootResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Reboot.fromPartial(e));
      }
    }
    return message;
  },
};

const baseBootstrapRequest: object = {
  recover_etcd: false,
  recover_skip_hash_check: false,
};

export const BootstrapRequest = {
  encode(message: BootstrapRequest, writer: Writer = Writer.create()): Writer {
    if (message.recover_etcd === true) {
      writer.uint32(8).bool(message.recover_etcd);
    }
    if (message.recover_skip_hash_check === true) {
      writer.uint32(16).bool(message.recover_skip_hash_check);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BootstrapRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBootstrapRequest } as BootstrapRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recover_etcd = reader.bool();
          break;
        case 2:
          message.recover_skip_hash_check = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BootstrapRequest {
    const message = { ...baseBootstrapRequest } as BootstrapRequest;
    if (object.recover_etcd !== undefined && object.recover_etcd !== null) {
      message.recover_etcd = Boolean(object.recover_etcd);
    } else {
      message.recover_etcd = false;
    }
    if (
      object.recover_skip_hash_check !== undefined &&
      object.recover_skip_hash_check !== null
    ) {
      message.recover_skip_hash_check = Boolean(object.recover_skip_hash_check);
    } else {
      message.recover_skip_hash_check = false;
    }
    return message;
  },

  toJSON(message: BootstrapRequest): unknown {
    const obj: any = {};
    message.recover_etcd !== undefined &&
      (obj.recover_etcd = message.recover_etcd);
    message.recover_skip_hash_check !== undefined &&
      (obj.recover_skip_hash_check = message.recover_skip_hash_check);
    return obj;
  },

  fromPartial(object: DeepPartial<BootstrapRequest>): BootstrapRequest {
    const message = { ...baseBootstrapRequest } as BootstrapRequest;
    if (object.recover_etcd !== undefined && object.recover_etcd !== null) {
      message.recover_etcd = object.recover_etcd;
    } else {
      message.recover_etcd = false;
    }
    if (
      object.recover_skip_hash_check !== undefined &&
      object.recover_skip_hash_check !== null
    ) {
      message.recover_skip_hash_check = object.recover_skip_hash_check;
    } else {
      message.recover_skip_hash_check = false;
    }
    return message;
  },
};

const baseBootstrap: object = {};

export const Bootstrap = {
  encode(message: Bootstrap, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Bootstrap {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBootstrap } as Bootstrap;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Bootstrap {
    const message = { ...baseBootstrap } as Bootstrap;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: Bootstrap): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Bootstrap>): Bootstrap {
    const message = { ...baseBootstrap } as Bootstrap;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },
};

const baseBootstrapResponse: object = {};

export const BootstrapResponse = {
  encode(message: BootstrapResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Bootstrap.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BootstrapResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBootstrapResponse } as BootstrapResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Bootstrap.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BootstrapResponse {
    const message = { ...baseBootstrapResponse } as BootstrapResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Bootstrap.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: BootstrapResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Bootstrap.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<BootstrapResponse>): BootstrapResponse {
    const message = { ...baseBootstrapResponse } as BootstrapResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Bootstrap.fromPartial(e));
      }
    }
    return message;
  },
};

const baseSequenceEvent: object = { sequence: "", action: 0 };

export const SequenceEvent = {
  encode(message: SequenceEvent, writer: Writer = Writer.create()): Writer {
    if (message.sequence !== "") {
      writer.uint32(10).string(message.sequence);
    }
    if (message.action !== 0) {
      writer.uint32(16).int32(message.action);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SequenceEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSequenceEvent } as SequenceEvent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sequence = reader.string();
          break;
        case 2:
          message.action = reader.int32() as any;
          break;
        case 3:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SequenceEvent {
    const message = { ...baseSequenceEvent } as SequenceEvent;
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = String(object.sequence);
    } else {
      message.sequence = "";
    }
    if (object.action !== undefined && object.action !== null) {
      message.action = sequenceEvent_ActionFromJSON(object.action);
    } else {
      message.action = 0;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = Error.fromJSON(object.error);
    } else {
      message.error = undefined;
    }
    return message;
  },

  toJSON(message: SequenceEvent): unknown {
    const obj: any = {};
    message.sequence !== undefined && (obj.sequence = message.sequence);
    message.action !== undefined &&
      (obj.action = sequenceEvent_ActionToJSON(message.action));
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<SequenceEvent>): SequenceEvent {
    const message = { ...baseSequenceEvent } as SequenceEvent;
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = object.sequence;
    } else {
      message.sequence = "";
    }
    if (object.action !== undefined && object.action !== null) {
      message.action = object.action;
    } else {
      message.action = 0;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = Error.fromPartial(object.error);
    } else {
      message.error = undefined;
    }
    return message;
  },
};

const basePhaseEvent: object = { phase: "", action: 0 };

export const PhaseEvent = {
  encode(message: PhaseEvent, writer: Writer = Writer.create()): Writer {
    if (message.phase !== "") {
      writer.uint32(10).string(message.phase);
    }
    if (message.action !== 0) {
      writer.uint32(16).int32(message.action);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PhaseEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePhaseEvent } as PhaseEvent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.phase = reader.string();
          break;
        case 2:
          message.action = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PhaseEvent {
    const message = { ...basePhaseEvent } as PhaseEvent;
    if (object.phase !== undefined && object.phase !== null) {
      message.phase = String(object.phase);
    } else {
      message.phase = "";
    }
    if (object.action !== undefined && object.action !== null) {
      message.action = phaseEvent_ActionFromJSON(object.action);
    } else {
      message.action = 0;
    }
    return message;
  },

  toJSON(message: PhaseEvent): unknown {
    const obj: any = {};
    message.phase !== undefined && (obj.phase = message.phase);
    message.action !== undefined &&
      (obj.action = phaseEvent_ActionToJSON(message.action));
    return obj;
  },

  fromPartial(object: DeepPartial<PhaseEvent>): PhaseEvent {
    const message = { ...basePhaseEvent } as PhaseEvent;
    if (object.phase !== undefined && object.phase !== null) {
      message.phase = object.phase;
    } else {
      message.phase = "";
    }
    if (object.action !== undefined && object.action !== null) {
      message.action = object.action;
    } else {
      message.action = 0;
    }
    return message;
  },
};

const baseTaskEvent: object = { task: "", action: 0 };

export const TaskEvent = {
  encode(message: TaskEvent, writer: Writer = Writer.create()): Writer {
    if (message.task !== "") {
      writer.uint32(10).string(message.task);
    }
    if (message.action !== 0) {
      writer.uint32(16).int32(message.action);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TaskEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTaskEvent } as TaskEvent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.task = reader.string();
          break;
        case 2:
          message.action = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TaskEvent {
    const message = { ...baseTaskEvent } as TaskEvent;
    if (object.task !== undefined && object.task !== null) {
      message.task = String(object.task);
    } else {
      message.task = "";
    }
    if (object.action !== undefined && object.action !== null) {
      message.action = taskEvent_ActionFromJSON(object.action);
    } else {
      message.action = 0;
    }
    return message;
  },

  toJSON(message: TaskEvent): unknown {
    const obj: any = {};
    message.task !== undefined && (obj.task = message.task);
    message.action !== undefined &&
      (obj.action = taskEvent_ActionToJSON(message.action));
    return obj;
  },

  fromPartial(object: DeepPartial<TaskEvent>): TaskEvent {
    const message = { ...baseTaskEvent } as TaskEvent;
    if (object.task !== undefined && object.task !== null) {
      message.task = object.task;
    } else {
      message.task = "";
    }
    if (object.action !== undefined && object.action !== null) {
      message.action = object.action;
    } else {
      message.action = 0;
    }
    return message;
  },
};

const baseServiceStateEvent: object = { service: "", action: 0, message: "" };

export const ServiceStateEvent = {
  encode(message: ServiceStateEvent, writer: Writer = Writer.create()): Writer {
    if (message.service !== "") {
      writer.uint32(10).string(message.service);
    }
    if (message.action !== 0) {
      writer.uint32(16).int32(message.action);
    }
    if (message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    if (message.health !== undefined) {
      ServiceHealth.encode(message.health, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceStateEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceStateEvent } as ServiceStateEvent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.service = reader.string();
          break;
        case 2:
          message.action = reader.int32() as any;
          break;
        case 3:
          message.message = reader.string();
          break;
        case 4:
          message.health = ServiceHealth.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceStateEvent {
    const message = { ...baseServiceStateEvent } as ServiceStateEvent;
    if (object.service !== undefined && object.service !== null) {
      message.service = String(object.service);
    } else {
      message.service = "";
    }
    if (object.action !== undefined && object.action !== null) {
      message.action = serviceStateEvent_ActionFromJSON(object.action);
    } else {
      message.action = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    if (object.health !== undefined && object.health !== null) {
      message.health = ServiceHealth.fromJSON(object.health);
    } else {
      message.health = undefined;
    }
    return message;
  },

  toJSON(message: ServiceStateEvent): unknown {
    const obj: any = {};
    message.service !== undefined && (obj.service = message.service);
    message.action !== undefined &&
      (obj.action = serviceStateEvent_ActionToJSON(message.action));
    message.message !== undefined && (obj.message = message.message);
    message.health !== undefined &&
      (obj.health = message.health
        ? ServiceHealth.toJSON(message.health)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceStateEvent>): ServiceStateEvent {
    const message = { ...baseServiceStateEvent } as ServiceStateEvent;
    if (object.service !== undefined && object.service !== null) {
      message.service = object.service;
    } else {
      message.service = "";
    }
    if (object.action !== undefined && object.action !== null) {
      message.action = object.action;
    } else {
      message.action = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    if (object.health !== undefined && object.health !== null) {
      message.health = ServiceHealth.fromPartial(object.health);
    } else {
      message.health = undefined;
    }
    return message;
  },
};

const baseRestartEvent: object = { cmd: 0 };

export const RestartEvent = {
  encode(message: RestartEvent, writer: Writer = Writer.create()): Writer {
    if (message.cmd !== 0) {
      writer.uint32(8).int64(message.cmd);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RestartEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRestartEvent } as RestartEvent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cmd = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RestartEvent {
    const message = { ...baseRestartEvent } as RestartEvent;
    if (object.cmd !== undefined && object.cmd !== null) {
      message.cmd = Number(object.cmd);
    } else {
      message.cmd = 0;
    }
    return message;
  },

  toJSON(message: RestartEvent): unknown {
    const obj: any = {};
    message.cmd !== undefined && (obj.cmd = message.cmd);
    return obj;
  },

  fromPartial(object: DeepPartial<RestartEvent>): RestartEvent {
    const message = { ...baseRestartEvent } as RestartEvent;
    if (object.cmd !== undefined && object.cmd !== null) {
      message.cmd = object.cmd;
    } else {
      message.cmd = 0;
    }
    return message;
  },
};

const baseEventsRequest: object = {
  tail_events: 0,
  tail_id: "",
  tail_seconds: 0,
};

export const EventsRequest = {
  encode(message: EventsRequest, writer: Writer = Writer.create()): Writer {
    if (message.tail_events !== 0) {
      writer.uint32(8).int32(message.tail_events);
    }
    if (message.tail_id !== "") {
      writer.uint32(18).string(message.tail_id);
    }
    if (message.tail_seconds !== 0) {
      writer.uint32(24).int32(message.tail_seconds);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EventsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventsRequest } as EventsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tail_events = reader.int32();
          break;
        case 2:
          message.tail_id = reader.string();
          break;
        case 3:
          message.tail_seconds = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventsRequest {
    const message = { ...baseEventsRequest } as EventsRequest;
    if (object.tail_events !== undefined && object.tail_events !== null) {
      message.tail_events = Number(object.tail_events);
    } else {
      message.tail_events = 0;
    }
    if (object.tail_id !== undefined && object.tail_id !== null) {
      message.tail_id = String(object.tail_id);
    } else {
      message.tail_id = "";
    }
    if (object.tail_seconds !== undefined && object.tail_seconds !== null) {
      message.tail_seconds = Number(object.tail_seconds);
    } else {
      message.tail_seconds = 0;
    }
    return message;
  },

  toJSON(message: EventsRequest): unknown {
    const obj: any = {};
    message.tail_events !== undefined &&
      (obj.tail_events = message.tail_events);
    message.tail_id !== undefined && (obj.tail_id = message.tail_id);
    message.tail_seconds !== undefined &&
      (obj.tail_seconds = message.tail_seconds);
    return obj;
  },

  fromPartial(object: DeepPartial<EventsRequest>): EventsRequest {
    const message = { ...baseEventsRequest } as EventsRequest;
    if (object.tail_events !== undefined && object.tail_events !== null) {
      message.tail_events = object.tail_events;
    } else {
      message.tail_events = 0;
    }
    if (object.tail_id !== undefined && object.tail_id !== null) {
      message.tail_id = object.tail_id;
    } else {
      message.tail_id = "";
    }
    if (object.tail_seconds !== undefined && object.tail_seconds !== null) {
      message.tail_seconds = object.tail_seconds;
    } else {
      message.tail_seconds = 0;
    }
    return message;
  },
};

const baseEvent: object = { id: "" };

export const Event = {
  encode(message: Event, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.data !== undefined) {
      Any.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEvent } as Event;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.data = Any.decode(reader, reader.uint32());
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

  fromJSON(object: any): Event {
    const message = { ...baseEvent } as Event;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = Any.fromJSON(object.data);
    } else {
      message.data = undefined;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.data !== undefined &&
      (obj.data = message.data ? Any.toJSON(message.data) : undefined);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<Event>): Event {
    const message = { ...baseEvent } as Event;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = Any.fromPartial(object.data);
    } else {
      message.data = undefined;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseResetPartitionSpec: object = { label: "", wipe: false };

export const ResetPartitionSpec = {
  encode(
    message: ResetPartitionSpec,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    if (message.wipe === true) {
      writer.uint32(16).bool(message.wipe);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ResetPartitionSpec {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResetPartitionSpec } as ResetPartitionSpec;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.label = reader.string();
          break;
        case 2:
          message.wipe = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResetPartitionSpec {
    const message = { ...baseResetPartitionSpec } as ResetPartitionSpec;
    if (object.label !== undefined && object.label !== null) {
      message.label = String(object.label);
    } else {
      message.label = "";
    }
    if (object.wipe !== undefined && object.wipe !== null) {
      message.wipe = Boolean(object.wipe);
    } else {
      message.wipe = false;
    }
    return message;
  },

  toJSON(message: ResetPartitionSpec): unknown {
    const obj: any = {};
    message.label !== undefined && (obj.label = message.label);
    message.wipe !== undefined && (obj.wipe = message.wipe);
    return obj;
  },

  fromPartial(object: DeepPartial<ResetPartitionSpec>): ResetPartitionSpec {
    const message = { ...baseResetPartitionSpec } as ResetPartitionSpec;
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    } else {
      message.label = "";
    }
    if (object.wipe !== undefined && object.wipe !== null) {
      message.wipe = object.wipe;
    } else {
      message.wipe = false;
    }
    return message;
  },
};

const baseResetRequest: object = { graceful: false, reboot: false };

export const ResetRequest = {
  encode(message: ResetRequest, writer: Writer = Writer.create()): Writer {
    if (message.graceful === true) {
      writer.uint32(8).bool(message.graceful);
    }
    if (message.reboot === true) {
      writer.uint32(16).bool(message.reboot);
    }
    for (const v of message.system_partitions_to_wipe) {
      ResetPartitionSpec.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ResetRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResetRequest } as ResetRequest;
    message.system_partitions_to_wipe = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.graceful = reader.bool();
          break;
        case 2:
          message.reboot = reader.bool();
          break;
        case 3:
          message.system_partitions_to_wipe.push(
            ResetPartitionSpec.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResetRequest {
    const message = { ...baseResetRequest } as ResetRequest;
    message.system_partitions_to_wipe = [];
    if (object.graceful !== undefined && object.graceful !== null) {
      message.graceful = Boolean(object.graceful);
    } else {
      message.graceful = false;
    }
    if (object.reboot !== undefined && object.reboot !== null) {
      message.reboot = Boolean(object.reboot);
    } else {
      message.reboot = false;
    }
    if (
      object.system_partitions_to_wipe !== undefined &&
      object.system_partitions_to_wipe !== null
    ) {
      for (const e of object.system_partitions_to_wipe) {
        message.system_partitions_to_wipe.push(ResetPartitionSpec.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ResetRequest): unknown {
    const obj: any = {};
    message.graceful !== undefined && (obj.graceful = message.graceful);
    message.reboot !== undefined && (obj.reboot = message.reboot);
    if (message.system_partitions_to_wipe) {
      obj.system_partitions_to_wipe = message.system_partitions_to_wipe.map(
        (e) => (e ? ResetPartitionSpec.toJSON(e) : undefined)
      );
    } else {
      obj.system_partitions_to_wipe = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ResetRequest>): ResetRequest {
    const message = { ...baseResetRequest } as ResetRequest;
    message.system_partitions_to_wipe = [];
    if (object.graceful !== undefined && object.graceful !== null) {
      message.graceful = object.graceful;
    } else {
      message.graceful = false;
    }
    if (object.reboot !== undefined && object.reboot !== null) {
      message.reboot = object.reboot;
    } else {
      message.reboot = false;
    }
    if (
      object.system_partitions_to_wipe !== undefined &&
      object.system_partitions_to_wipe !== null
    ) {
      for (const e of object.system_partitions_to_wipe) {
        message.system_partitions_to_wipe.push(
          ResetPartitionSpec.fromPartial(e)
        );
      }
    }
    return message;
  },
};

const baseReset: object = {};

export const Reset = {
  encode(message: Reset, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Reset {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReset } as Reset;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Reset {
    const message = { ...baseReset } as Reset;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: Reset): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Reset>): Reset {
    const message = { ...baseReset } as Reset;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },
};

const baseResetResponse: object = {};

export const ResetResponse = {
  encode(message: ResetResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Reset.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ResetResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResetResponse } as ResetResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Reset.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResetResponse {
    const message = { ...baseResetResponse } as ResetResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Reset.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ResetResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Reset.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ResetResponse>): ResetResponse {
    const message = { ...baseResetResponse } as ResetResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Reset.fromPartial(e));
      }
    }
    return message;
  },
};

const baseShutdown: object = {};

export const Shutdown = {
  encode(message: Shutdown, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Shutdown {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseShutdown } as Shutdown;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Shutdown {
    const message = { ...baseShutdown } as Shutdown;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: Shutdown): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Shutdown>): Shutdown {
    const message = { ...baseShutdown } as Shutdown;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },
};

const baseShutdownResponse: object = {};

export const ShutdownResponse = {
  encode(message: ShutdownResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Shutdown.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ShutdownResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseShutdownResponse } as ShutdownResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Shutdown.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ShutdownResponse {
    const message = { ...baseShutdownResponse } as ShutdownResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Shutdown.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ShutdownResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Shutdown.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ShutdownResponse>): ShutdownResponse {
    const message = { ...baseShutdownResponse } as ShutdownResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Shutdown.fromPartial(e));
      }
    }
    return message;
  },
};

const baseUpgradeRequest: object = {
  image: "",
  preserve: false,
  stage: false,
  force: false,
};

export const UpgradeRequest = {
  encode(message: UpgradeRequest, writer: Writer = Writer.create()): Writer {
    if (message.image !== "") {
      writer.uint32(10).string(message.image);
    }
    if (message.preserve === true) {
      writer.uint32(16).bool(message.preserve);
    }
    if (message.stage === true) {
      writer.uint32(24).bool(message.stage);
    }
    if (message.force === true) {
      writer.uint32(32).bool(message.force);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UpgradeRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpgradeRequest } as UpgradeRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.image = reader.string();
          break;
        case 2:
          message.preserve = reader.bool();
          break;
        case 3:
          message.stage = reader.bool();
          break;
        case 4:
          message.force = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpgradeRequest {
    const message = { ...baseUpgradeRequest } as UpgradeRequest;
    if (object.image !== undefined && object.image !== null) {
      message.image = String(object.image);
    } else {
      message.image = "";
    }
    if (object.preserve !== undefined && object.preserve !== null) {
      message.preserve = Boolean(object.preserve);
    } else {
      message.preserve = false;
    }
    if (object.stage !== undefined && object.stage !== null) {
      message.stage = Boolean(object.stage);
    } else {
      message.stage = false;
    }
    if (object.force !== undefined && object.force !== null) {
      message.force = Boolean(object.force);
    } else {
      message.force = false;
    }
    return message;
  },

  toJSON(message: UpgradeRequest): unknown {
    const obj: any = {};
    message.image !== undefined && (obj.image = message.image);
    message.preserve !== undefined && (obj.preserve = message.preserve);
    message.stage !== undefined && (obj.stage = message.stage);
    message.force !== undefined && (obj.force = message.force);
    return obj;
  },

  fromPartial(object: DeepPartial<UpgradeRequest>): UpgradeRequest {
    const message = { ...baseUpgradeRequest } as UpgradeRequest;
    if (object.image !== undefined && object.image !== null) {
      message.image = object.image;
    } else {
      message.image = "";
    }
    if (object.preserve !== undefined && object.preserve !== null) {
      message.preserve = object.preserve;
    } else {
      message.preserve = false;
    }
    if (object.stage !== undefined && object.stage !== null) {
      message.stage = object.stage;
    } else {
      message.stage = false;
    }
    if (object.force !== undefined && object.force !== null) {
      message.force = object.force;
    } else {
      message.force = false;
    }
    return message;
  },
};

const baseUpgrade: object = { ack: "" };

export const Upgrade = {
  encode(message: Upgrade, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.ack !== "") {
      writer.uint32(18).string(message.ack);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Upgrade {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpgrade } as Upgrade;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.ack = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Upgrade {
    const message = { ...baseUpgrade } as Upgrade;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.ack !== undefined && object.ack !== null) {
      message.ack = String(object.ack);
    } else {
      message.ack = "";
    }
    return message;
  },

  toJSON(message: Upgrade): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.ack !== undefined && (obj.ack = message.ack);
    return obj;
  },

  fromPartial(object: DeepPartial<Upgrade>): Upgrade {
    const message = { ...baseUpgrade } as Upgrade;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.ack !== undefined && object.ack !== null) {
      message.ack = object.ack;
    } else {
      message.ack = "";
    }
    return message;
  },
};

const baseUpgradeResponse: object = {};

export const UpgradeResponse = {
  encode(message: UpgradeResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Upgrade.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UpgradeResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpgradeResponse } as UpgradeResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Upgrade.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpgradeResponse {
    const message = { ...baseUpgradeResponse } as UpgradeResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Upgrade.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: UpgradeResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Upgrade.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<UpgradeResponse>): UpgradeResponse {
    const message = { ...baseUpgradeResponse } as UpgradeResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Upgrade.fromPartial(e));
      }
    }
    return message;
  },
};

const baseServiceList: object = {};

export const ServiceList = {
  encode(message: ServiceList, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.services) {
      ServiceInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceList {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceList } as ServiceList;
    message.services = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.services.push(ServiceInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceList {
    const message = { ...baseServiceList } as ServiceList;
    message.services = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.services !== undefined && object.services !== null) {
      for (const e of object.services) {
        message.services.push(ServiceInfo.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ServiceList): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    if (message.services) {
      obj.services = message.services.map((e) =>
        e ? ServiceInfo.toJSON(e) : undefined
      );
    } else {
      obj.services = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceList>): ServiceList {
    const message = { ...baseServiceList } as ServiceList;
    message.services = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.services !== undefined && object.services !== null) {
      for (const e of object.services) {
        message.services.push(ServiceInfo.fromPartial(e));
      }
    }
    return message;
  },
};

const baseServiceListResponse: object = {};

export const ServiceListResponse = {
  encode(
    message: ServiceListResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      ServiceList.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceListResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceListResponse } as ServiceListResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(ServiceList.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceListResponse {
    const message = { ...baseServiceListResponse } as ServiceListResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(ServiceList.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ServiceListResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? ServiceList.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceListResponse>): ServiceListResponse {
    const message = { ...baseServiceListResponse } as ServiceListResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(ServiceList.fromPartial(e));
      }
    }
    return message;
  },
};

const baseServiceInfo: object = { id: "", state: "" };

export const ServiceInfo = {
  encode(message: ServiceInfo, writer: Writer = Writer.create()): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.state !== "") {
      writer.uint32(18).string(message.state);
    }
    if (message.events !== undefined) {
      ServiceEvents.encode(message.events, writer.uint32(26).fork()).ldelim();
    }
    if (message.health !== undefined) {
      ServiceHealth.encode(message.health, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceInfo } as ServiceInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.state = reader.string();
          break;
        case 3:
          message.events = ServiceEvents.decode(reader, reader.uint32());
          break;
        case 4:
          message.health = ServiceHealth.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceInfo {
    const message = { ...baseServiceInfo } as ServiceInfo;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = String(object.state);
    } else {
      message.state = "";
    }
    if (object.events !== undefined && object.events !== null) {
      message.events = ServiceEvents.fromJSON(object.events);
    } else {
      message.events = undefined;
    }
    if (object.health !== undefined && object.health !== null) {
      message.health = ServiceHealth.fromJSON(object.health);
    } else {
      message.health = undefined;
    }
    return message;
  },

  toJSON(message: ServiceInfo): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.state !== undefined && (obj.state = message.state);
    message.events !== undefined &&
      (obj.events = message.events
        ? ServiceEvents.toJSON(message.events)
        : undefined);
    message.health !== undefined &&
      (obj.health = message.health
        ? ServiceHealth.toJSON(message.health)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceInfo>): ServiceInfo {
    const message = { ...baseServiceInfo } as ServiceInfo;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = "";
    }
    if (object.events !== undefined && object.events !== null) {
      message.events = ServiceEvents.fromPartial(object.events);
    } else {
      message.events = undefined;
    }
    if (object.health !== undefined && object.health !== null) {
      message.health = ServiceHealth.fromPartial(object.health);
    } else {
      message.health = undefined;
    }
    return message;
  },
};

const baseServiceEvents: object = {};

export const ServiceEvents = {
  encode(message: ServiceEvents, writer: Writer = Writer.create()): Writer {
    for (const v of message.events) {
      ServiceEvent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceEvents {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceEvents } as ServiceEvents;
    message.events = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.events.push(ServiceEvent.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceEvents {
    const message = { ...baseServiceEvents } as ServiceEvents;
    message.events = [];
    if (object.events !== undefined && object.events !== null) {
      for (const e of object.events) {
        message.events.push(ServiceEvent.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ServiceEvents): unknown {
    const obj: any = {};
    if (message.events) {
      obj.events = message.events.map((e) =>
        e ? ServiceEvent.toJSON(e) : undefined
      );
    } else {
      obj.events = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceEvents>): ServiceEvents {
    const message = { ...baseServiceEvents } as ServiceEvents;
    message.events = [];
    if (object.events !== undefined && object.events !== null) {
      for (const e of object.events) {
        message.events.push(ServiceEvent.fromPartial(e));
      }
    }
    return message;
  },
};

const baseServiceEvent: object = { msg: "", state: "" };

export const ServiceEvent = {
  encode(message: ServiceEvent, writer: Writer = Writer.create()): Writer {
    if (message.msg !== "") {
      writer.uint32(10).string(message.msg);
    }
    if (message.state !== "") {
      writer.uint32(18).string(message.state);
    }
    if (message.ts !== undefined) {
      Timestamp.encode(
        toTimestamp(message.ts),
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceEvent } as ServiceEvent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msg = reader.string();
          break;
        case 2:
          message.state = reader.string();
          break;
        case 3:
          message.ts = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceEvent {
    const message = { ...baseServiceEvent } as ServiceEvent;
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = String(object.msg);
    } else {
      message.msg = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = String(object.state);
    } else {
      message.state = "";
    }
    if (object.ts !== undefined && object.ts !== null) {
      message.ts = fromJsonTimestamp(object.ts);
    } else {
      message.ts = undefined;
    }
    return message;
  },

  toJSON(message: ServiceEvent): unknown {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg);
    message.state !== undefined && (obj.state = message.state);
    message.ts !== undefined && (obj.ts = message.ts.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceEvent>): ServiceEvent {
    const message = { ...baseServiceEvent } as ServiceEvent;
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = object.msg;
    } else {
      message.msg = "";
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = "";
    }
    if (object.ts !== undefined && object.ts !== null) {
      message.ts = object.ts;
    } else {
      message.ts = undefined;
    }
    return message;
  },
};

const baseServiceHealth: object = {
  unknown: false,
  healthy: false,
  last_message: "",
};

export const ServiceHealth = {
  encode(message: ServiceHealth, writer: Writer = Writer.create()): Writer {
    if (message.unknown === true) {
      writer.uint32(8).bool(message.unknown);
    }
    if (message.healthy === true) {
      writer.uint32(16).bool(message.healthy);
    }
    if (message.last_message !== "") {
      writer.uint32(26).string(message.last_message);
    }
    if (message.last_change !== undefined) {
      Timestamp.encode(
        toTimestamp(message.last_change),
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceHealth {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceHealth } as ServiceHealth;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unknown = reader.bool();
          break;
        case 2:
          message.healthy = reader.bool();
          break;
        case 3:
          message.last_message = reader.string();
          break;
        case 4:
          message.last_change = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceHealth {
    const message = { ...baseServiceHealth } as ServiceHealth;
    if (object.unknown !== undefined && object.unknown !== null) {
      message.unknown = Boolean(object.unknown);
    } else {
      message.unknown = false;
    }
    if (object.healthy !== undefined && object.healthy !== null) {
      message.healthy = Boolean(object.healthy);
    } else {
      message.healthy = false;
    }
    if (object.last_message !== undefined && object.last_message !== null) {
      message.last_message = String(object.last_message);
    } else {
      message.last_message = "";
    }
    if (object.last_change !== undefined && object.last_change !== null) {
      message.last_change = fromJsonTimestamp(object.last_change);
    } else {
      message.last_change = undefined;
    }
    return message;
  },

  toJSON(message: ServiceHealth): unknown {
    const obj: any = {};
    message.unknown !== undefined && (obj.unknown = message.unknown);
    message.healthy !== undefined && (obj.healthy = message.healthy);
    message.last_message !== undefined &&
      (obj.last_message = message.last_message);
    message.last_change !== undefined &&
      (obj.last_change = message.last_change.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceHealth>): ServiceHealth {
    const message = { ...baseServiceHealth } as ServiceHealth;
    if (object.unknown !== undefined && object.unknown !== null) {
      message.unknown = object.unknown;
    } else {
      message.unknown = false;
    }
    if (object.healthy !== undefined && object.healthy !== null) {
      message.healthy = object.healthy;
    } else {
      message.healthy = false;
    }
    if (object.last_message !== undefined && object.last_message !== null) {
      message.last_message = object.last_message;
    } else {
      message.last_message = "";
    }
    if (object.last_change !== undefined && object.last_change !== null) {
      message.last_change = object.last_change;
    } else {
      message.last_change = undefined;
    }
    return message;
  },
};

const baseServiceStartRequest: object = { id: "" };

export const ServiceStartRequest = {
  encode(
    message: ServiceStartRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceStartRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceStartRequest } as ServiceStartRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceStartRequest {
    const message = { ...baseServiceStartRequest } as ServiceStartRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: ServiceStartRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceStartRequest>): ServiceStartRequest {
    const message = { ...baseServiceStartRequest } as ServiceStartRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseServiceStart: object = { resp: "" };

export const ServiceStart = {
  encode(message: ServiceStart, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.resp !== "") {
      writer.uint32(18).string(message.resp);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceStart {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceStart } as ServiceStart;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.resp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceStart {
    const message = { ...baseServiceStart } as ServiceStart;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.resp !== undefined && object.resp !== null) {
      message.resp = String(object.resp);
    } else {
      message.resp = "";
    }
    return message;
  },

  toJSON(message: ServiceStart): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.resp !== undefined && (obj.resp = message.resp);
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceStart>): ServiceStart {
    const message = { ...baseServiceStart } as ServiceStart;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.resp !== undefined && object.resp !== null) {
      message.resp = object.resp;
    } else {
      message.resp = "";
    }
    return message;
  },
};

const baseServiceStartResponse: object = {};

export const ServiceStartResponse = {
  encode(
    message: ServiceStartResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      ServiceStart.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceStartResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceStartResponse } as ServiceStartResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(ServiceStart.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceStartResponse {
    const message = { ...baseServiceStartResponse } as ServiceStartResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(ServiceStart.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ServiceStartResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? ServiceStart.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceStartResponse>): ServiceStartResponse {
    const message = { ...baseServiceStartResponse } as ServiceStartResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(ServiceStart.fromPartial(e));
      }
    }
    return message;
  },
};

const baseServiceStopRequest: object = { id: "" };

export const ServiceStopRequest = {
  encode(
    message: ServiceStopRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceStopRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceStopRequest } as ServiceStopRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceStopRequest {
    const message = { ...baseServiceStopRequest } as ServiceStopRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: ServiceStopRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceStopRequest>): ServiceStopRequest {
    const message = { ...baseServiceStopRequest } as ServiceStopRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseServiceStop: object = { resp: "" };

export const ServiceStop = {
  encode(message: ServiceStop, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.resp !== "") {
      writer.uint32(18).string(message.resp);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceStop {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceStop } as ServiceStop;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.resp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceStop {
    const message = { ...baseServiceStop } as ServiceStop;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.resp !== undefined && object.resp !== null) {
      message.resp = String(object.resp);
    } else {
      message.resp = "";
    }
    return message;
  },

  toJSON(message: ServiceStop): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.resp !== undefined && (obj.resp = message.resp);
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceStop>): ServiceStop {
    const message = { ...baseServiceStop } as ServiceStop;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.resp !== undefined && object.resp !== null) {
      message.resp = object.resp;
    } else {
      message.resp = "";
    }
    return message;
  },
};

const baseServiceStopResponse: object = {};

export const ServiceStopResponse = {
  encode(
    message: ServiceStopResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      ServiceStop.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceStopResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceStopResponse } as ServiceStopResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(ServiceStop.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceStopResponse {
    const message = { ...baseServiceStopResponse } as ServiceStopResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(ServiceStop.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ServiceStopResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? ServiceStop.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceStopResponse>): ServiceStopResponse {
    const message = { ...baseServiceStopResponse } as ServiceStopResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(ServiceStop.fromPartial(e));
      }
    }
    return message;
  },
};

const baseServiceRestartRequest: object = { id: "" };

export const ServiceRestartRequest = {
  encode(
    message: ServiceRestartRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceRestartRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceRestartRequest } as ServiceRestartRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceRestartRequest {
    const message = { ...baseServiceRestartRequest } as ServiceRestartRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: ServiceRestartRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ServiceRestartRequest>
  ): ServiceRestartRequest {
    const message = { ...baseServiceRestartRequest } as ServiceRestartRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseServiceRestart: object = { resp: "" };

export const ServiceRestart = {
  encode(message: ServiceRestart, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.resp !== "") {
      writer.uint32(18).string(message.resp);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceRestart {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceRestart } as ServiceRestart;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.resp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceRestart {
    const message = { ...baseServiceRestart } as ServiceRestart;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.resp !== undefined && object.resp !== null) {
      message.resp = String(object.resp);
    } else {
      message.resp = "";
    }
    return message;
  },

  toJSON(message: ServiceRestart): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.resp !== undefined && (obj.resp = message.resp);
    return obj;
  },

  fromPartial(object: DeepPartial<ServiceRestart>): ServiceRestart {
    const message = { ...baseServiceRestart } as ServiceRestart;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.resp !== undefined && object.resp !== null) {
      message.resp = object.resp;
    } else {
      message.resp = "";
    }
    return message;
  },
};

const baseServiceRestartResponse: object = {};

export const ServiceRestartResponse = {
  encode(
    message: ServiceRestartResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      ServiceRestart.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceRestartResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceRestartResponse } as ServiceRestartResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(ServiceRestart.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServiceRestartResponse {
    const message = { ...baseServiceRestartResponse } as ServiceRestartResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(ServiceRestart.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ServiceRestartResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? ServiceRestart.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<ServiceRestartResponse>
  ): ServiceRestartResponse {
    const message = { ...baseServiceRestartResponse } as ServiceRestartResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(ServiceRestart.fromPartial(e));
      }
    }
    return message;
  },
};

const baseStartRequest: object = { id: "" };

export const StartRequest = {
  encode(message: StartRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StartRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStartRequest } as StartRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StartRequest {
    const message = { ...baseStartRequest } as StartRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: StartRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<StartRequest>): StartRequest {
    const message = { ...baseStartRequest } as StartRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseStartResponse: object = { resp: "" };

export const StartResponse = {
  encode(message: StartResponse, writer: Writer = Writer.create()): Writer {
    if (message.resp !== "") {
      writer.uint32(10).string(message.resp);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StartResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStartResponse } as StartResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StartResponse {
    const message = { ...baseStartResponse } as StartResponse;
    if (object.resp !== undefined && object.resp !== null) {
      message.resp = String(object.resp);
    } else {
      message.resp = "";
    }
    return message;
  },

  toJSON(message: StartResponse): unknown {
    const obj: any = {};
    message.resp !== undefined && (obj.resp = message.resp);
    return obj;
  },

  fromPartial(object: DeepPartial<StartResponse>): StartResponse {
    const message = { ...baseStartResponse } as StartResponse;
    if (object.resp !== undefined && object.resp !== null) {
      message.resp = object.resp;
    } else {
      message.resp = "";
    }
    return message;
  },
};

const baseStopRequest: object = { id: "" };

export const StopRequest = {
  encode(message: StopRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StopRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStopRequest } as StopRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StopRequest {
    const message = { ...baseStopRequest } as StopRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },

  toJSON(message: StopRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<StopRequest>): StopRequest {
    const message = { ...baseStopRequest } as StopRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
};

const baseStopResponse: object = { resp: "" };

export const StopResponse = {
  encode(message: StopResponse, writer: Writer = Writer.create()): Writer {
    if (message.resp !== "") {
      writer.uint32(10).string(message.resp);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StopResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStopResponse } as StopResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StopResponse {
    const message = { ...baseStopResponse } as StopResponse;
    if (object.resp !== undefined && object.resp !== null) {
      message.resp = String(object.resp);
    } else {
      message.resp = "";
    }
    return message;
  },

  toJSON(message: StopResponse): unknown {
    const obj: any = {};
    message.resp !== undefined && (obj.resp = message.resp);
    return obj;
  },

  fromPartial(object: DeepPartial<StopResponse>): StopResponse {
    const message = { ...baseStopResponse } as StopResponse;
    if (object.resp !== undefined && object.resp !== null) {
      message.resp = object.resp;
    } else {
      message.resp = "";
    }
    return message;
  },
};

const baseCopyRequest: object = { root_path: "" };

export const CopyRequest = {
  encode(message: CopyRequest, writer: Writer = Writer.create()): Writer {
    if (message.root_path !== "") {
      writer.uint32(10).string(message.root_path);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CopyRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCopyRequest } as CopyRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.root_path = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CopyRequest {
    const message = { ...baseCopyRequest } as CopyRequest;
    if (object.root_path !== undefined && object.root_path !== null) {
      message.root_path = String(object.root_path);
    } else {
      message.root_path = "";
    }
    return message;
  },

  toJSON(message: CopyRequest): unknown {
    const obj: any = {};
    message.root_path !== undefined && (obj.root_path = message.root_path);
    return obj;
  },

  fromPartial(object: DeepPartial<CopyRequest>): CopyRequest {
    const message = { ...baseCopyRequest } as CopyRequest;
    if (object.root_path !== undefined && object.root_path !== null) {
      message.root_path = object.root_path;
    } else {
      message.root_path = "";
    }
    return message;
  },
};

const baseListRequest: object = {
  root: "",
  recurse: false,
  recursion_depth: 0,
  types: 0,
};

export const ListRequest = {
  encode(message: ListRequest, writer: Writer = Writer.create()): Writer {
    if (message.root !== "") {
      writer.uint32(10).string(message.root);
    }
    if (message.recurse === true) {
      writer.uint32(16).bool(message.recurse);
    }
    if (message.recursion_depth !== 0) {
      writer.uint32(24).int32(message.recursion_depth);
    }
    writer.uint32(34).fork();
    for (const v of message.types) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ListRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListRequest } as ListRequest;
    message.types = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.root = reader.string();
          break;
        case 2:
          message.recurse = reader.bool();
          break;
        case 3:
          message.recursion_depth = reader.int32();
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.types.push(reader.int32() as any);
            }
          } else {
            message.types.push(reader.int32() as any);
          }
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
    message.types = [];
    if (object.root !== undefined && object.root !== null) {
      message.root = String(object.root);
    } else {
      message.root = "";
    }
    if (object.recurse !== undefined && object.recurse !== null) {
      message.recurse = Boolean(object.recurse);
    } else {
      message.recurse = false;
    }
    if (
      object.recursion_depth !== undefined &&
      object.recursion_depth !== null
    ) {
      message.recursion_depth = Number(object.recursion_depth);
    } else {
      message.recursion_depth = 0;
    }
    if (object.types !== undefined && object.types !== null) {
      for (const e of object.types) {
        message.types.push(listRequest_TypeFromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ListRequest): unknown {
    const obj: any = {};
    message.root !== undefined && (obj.root = message.root);
    message.recurse !== undefined && (obj.recurse = message.recurse);
    message.recursion_depth !== undefined &&
      (obj.recursion_depth = message.recursion_depth);
    if (message.types) {
      obj.types = message.types.map((e) => listRequest_TypeToJSON(e));
    } else {
      obj.types = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ListRequest>): ListRequest {
    const message = { ...baseListRequest } as ListRequest;
    message.types = [];
    if (object.root !== undefined && object.root !== null) {
      message.root = object.root;
    } else {
      message.root = "";
    }
    if (object.recurse !== undefined && object.recurse !== null) {
      message.recurse = object.recurse;
    } else {
      message.recurse = false;
    }
    if (
      object.recursion_depth !== undefined &&
      object.recursion_depth !== null
    ) {
      message.recursion_depth = object.recursion_depth;
    } else {
      message.recursion_depth = 0;
    }
    if (object.types !== undefined && object.types !== null) {
      for (const e of object.types) {
        message.types.push(e);
      }
    }
    return message;
  },
};

const baseDiskUsageRequest: object = {
  recursion_depth: 0,
  all: false,
  threshold: 0,
  paths: "",
};

export const DiskUsageRequest = {
  encode(message: DiskUsageRequest, writer: Writer = Writer.create()): Writer {
    if (message.recursion_depth !== 0) {
      writer.uint32(8).int32(message.recursion_depth);
    }
    if (message.all === true) {
      writer.uint32(16).bool(message.all);
    }
    if (message.threshold !== 0) {
      writer.uint32(24).int64(message.threshold);
    }
    for (const v of message.paths) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DiskUsageRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDiskUsageRequest } as DiskUsageRequest;
    message.paths = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recursion_depth = reader.int32();
          break;
        case 2:
          message.all = reader.bool();
          break;
        case 3:
          message.threshold = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.paths.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DiskUsageRequest {
    const message = { ...baseDiskUsageRequest } as DiskUsageRequest;
    message.paths = [];
    if (
      object.recursion_depth !== undefined &&
      object.recursion_depth !== null
    ) {
      message.recursion_depth = Number(object.recursion_depth);
    } else {
      message.recursion_depth = 0;
    }
    if (object.all !== undefined && object.all !== null) {
      message.all = Boolean(object.all);
    } else {
      message.all = false;
    }
    if (object.threshold !== undefined && object.threshold !== null) {
      message.threshold = Number(object.threshold);
    } else {
      message.threshold = 0;
    }
    if (object.paths !== undefined && object.paths !== null) {
      for (const e of object.paths) {
        message.paths.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: DiskUsageRequest): unknown {
    const obj: any = {};
    message.recursion_depth !== undefined &&
      (obj.recursion_depth = message.recursion_depth);
    message.all !== undefined && (obj.all = message.all);
    message.threshold !== undefined && (obj.threshold = message.threshold);
    if (message.paths) {
      obj.paths = message.paths.map((e) => e);
    } else {
      obj.paths = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<DiskUsageRequest>): DiskUsageRequest {
    const message = { ...baseDiskUsageRequest } as DiskUsageRequest;
    message.paths = [];
    if (
      object.recursion_depth !== undefined &&
      object.recursion_depth !== null
    ) {
      message.recursion_depth = object.recursion_depth;
    } else {
      message.recursion_depth = 0;
    }
    if (object.all !== undefined && object.all !== null) {
      message.all = object.all;
    } else {
      message.all = false;
    }
    if (object.threshold !== undefined && object.threshold !== null) {
      message.threshold = object.threshold;
    } else {
      message.threshold = 0;
    }
    if (object.paths !== undefined && object.paths !== null) {
      for (const e of object.paths) {
        message.paths.push(e);
      }
    }
    return message;
  },
};

const baseFileInfo: object = {
  name: "",
  size: 0,
  mode: 0,
  modified: 0,
  is_dir: false,
  error: "",
  link: "",
  relative_name: "",
};

export const FileInfo = {
  encode(message: FileInfo, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.size !== 0) {
      writer.uint32(24).int64(message.size);
    }
    if (message.mode !== 0) {
      writer.uint32(32).uint32(message.mode);
    }
    if (message.modified !== 0) {
      writer.uint32(40).int64(message.modified);
    }
    if (message.is_dir === true) {
      writer.uint32(48).bool(message.is_dir);
    }
    if (message.error !== "") {
      writer.uint32(58).string(message.error);
    }
    if (message.link !== "") {
      writer.uint32(66).string(message.link);
    }
    if (message.relative_name !== "") {
      writer.uint32(74).string(message.relative_name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FileInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFileInfo } as FileInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.size = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.mode = reader.uint32();
          break;
        case 5:
          message.modified = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.is_dir = reader.bool();
          break;
        case 7:
          message.error = reader.string();
          break;
        case 8:
          message.link = reader.string();
          break;
        case 9:
          message.relative_name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FileInfo {
    const message = { ...baseFileInfo } as FileInfo;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = Number(object.size);
    } else {
      message.size = 0;
    }
    if (object.mode !== undefined && object.mode !== null) {
      message.mode = Number(object.mode);
    } else {
      message.mode = 0;
    }
    if (object.modified !== undefined && object.modified !== null) {
      message.modified = Number(object.modified);
    } else {
      message.modified = 0;
    }
    if (object.is_dir !== undefined && object.is_dir !== null) {
      message.is_dir = Boolean(object.is_dir);
    } else {
      message.is_dir = false;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = String(object.error);
    } else {
      message.error = "";
    }
    if (object.link !== undefined && object.link !== null) {
      message.link = String(object.link);
    } else {
      message.link = "";
    }
    if (object.relative_name !== undefined && object.relative_name !== null) {
      message.relative_name = String(object.relative_name);
    } else {
      message.relative_name = "";
    }
    return message;
  },

  toJSON(message: FileInfo): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.size !== undefined && (obj.size = message.size);
    message.mode !== undefined && (obj.mode = message.mode);
    message.modified !== undefined && (obj.modified = message.modified);
    message.is_dir !== undefined && (obj.is_dir = message.is_dir);
    message.error !== undefined && (obj.error = message.error);
    message.link !== undefined && (obj.link = message.link);
    message.relative_name !== undefined &&
      (obj.relative_name = message.relative_name);
    return obj;
  },

  fromPartial(object: DeepPartial<FileInfo>): FileInfo {
    const message = { ...baseFileInfo } as FileInfo;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = object.size;
    } else {
      message.size = 0;
    }
    if (object.mode !== undefined && object.mode !== null) {
      message.mode = object.mode;
    } else {
      message.mode = 0;
    }
    if (object.modified !== undefined && object.modified !== null) {
      message.modified = object.modified;
    } else {
      message.modified = 0;
    }
    if (object.is_dir !== undefined && object.is_dir !== null) {
      message.is_dir = object.is_dir;
    } else {
      message.is_dir = false;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    } else {
      message.error = "";
    }
    if (object.link !== undefined && object.link !== null) {
      message.link = object.link;
    } else {
      message.link = "";
    }
    if (object.relative_name !== undefined && object.relative_name !== null) {
      message.relative_name = object.relative_name;
    } else {
      message.relative_name = "";
    }
    return message;
  },
};

const baseDiskUsageInfo: object = {
  name: "",
  size: 0,
  error: "",
  relative_name: "",
};

export const DiskUsageInfo = {
  encode(message: DiskUsageInfo, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.size !== 0) {
      writer.uint32(24).int64(message.size);
    }
    if (message.error !== "") {
      writer.uint32(34).string(message.error);
    }
    if (message.relative_name !== "") {
      writer.uint32(42).string(message.relative_name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DiskUsageInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDiskUsageInfo } as DiskUsageInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.size = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.error = reader.string();
          break;
        case 5:
          message.relative_name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DiskUsageInfo {
    const message = { ...baseDiskUsageInfo } as DiskUsageInfo;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = Number(object.size);
    } else {
      message.size = 0;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = String(object.error);
    } else {
      message.error = "";
    }
    if (object.relative_name !== undefined && object.relative_name !== null) {
      message.relative_name = String(object.relative_name);
    } else {
      message.relative_name = "";
    }
    return message;
  },

  toJSON(message: DiskUsageInfo): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.size !== undefined && (obj.size = message.size);
    message.error !== undefined && (obj.error = message.error);
    message.relative_name !== undefined &&
      (obj.relative_name = message.relative_name);
    return obj;
  },

  fromPartial(object: DeepPartial<DiskUsageInfo>): DiskUsageInfo {
    const message = { ...baseDiskUsageInfo } as DiskUsageInfo;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = object.size;
    } else {
      message.size = 0;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    } else {
      message.error = "";
    }
    if (object.relative_name !== undefined && object.relative_name !== null) {
      message.relative_name = object.relative_name;
    } else {
      message.relative_name = "";
    }
    return message;
  },
};

const baseMounts: object = {};

export const Mounts = {
  encode(message: Mounts, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.stats) {
      MountStat.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Mounts {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMounts } as Mounts;
    message.stats = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.stats.push(MountStat.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Mounts {
    const message = { ...baseMounts } as Mounts;
    message.stats = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.stats !== undefined && object.stats !== null) {
      for (const e of object.stats) {
        message.stats.push(MountStat.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Mounts): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    if (message.stats) {
      obj.stats = message.stats.map((e) =>
        e ? MountStat.toJSON(e) : undefined
      );
    } else {
      obj.stats = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Mounts>): Mounts {
    const message = { ...baseMounts } as Mounts;
    message.stats = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.stats !== undefined && object.stats !== null) {
      for (const e of object.stats) {
        message.stats.push(MountStat.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMountsResponse: object = {};

export const MountsResponse = {
  encode(message: MountsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Mounts.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MountsResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMountsResponse } as MountsResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Mounts.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MountsResponse {
    const message = { ...baseMountsResponse } as MountsResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Mounts.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MountsResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Mounts.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MountsResponse>): MountsResponse {
    const message = { ...baseMountsResponse } as MountsResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Mounts.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMountStat: object = {
  filesystem: "",
  size: 0,
  available: 0,
  mounted_on: "",
};

export const MountStat = {
  encode(message: MountStat, writer: Writer = Writer.create()): Writer {
    if (message.filesystem !== "") {
      writer.uint32(10).string(message.filesystem);
    }
    if (message.size !== 0) {
      writer.uint32(16).uint64(message.size);
    }
    if (message.available !== 0) {
      writer.uint32(24).uint64(message.available);
    }
    if (message.mounted_on !== "") {
      writer.uint32(34).string(message.mounted_on);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MountStat {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMountStat } as MountStat;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filesystem = reader.string();
          break;
        case 2:
          message.size = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.available = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.mounted_on = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MountStat {
    const message = { ...baseMountStat } as MountStat;
    if (object.filesystem !== undefined && object.filesystem !== null) {
      message.filesystem = String(object.filesystem);
    } else {
      message.filesystem = "";
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = Number(object.size);
    } else {
      message.size = 0;
    }
    if (object.available !== undefined && object.available !== null) {
      message.available = Number(object.available);
    } else {
      message.available = 0;
    }
    if (object.mounted_on !== undefined && object.mounted_on !== null) {
      message.mounted_on = String(object.mounted_on);
    } else {
      message.mounted_on = "";
    }
    return message;
  },

  toJSON(message: MountStat): unknown {
    const obj: any = {};
    message.filesystem !== undefined && (obj.filesystem = message.filesystem);
    message.size !== undefined && (obj.size = message.size);
    message.available !== undefined && (obj.available = message.available);
    message.mounted_on !== undefined && (obj.mounted_on = message.mounted_on);
    return obj;
  },

  fromPartial(object: DeepPartial<MountStat>): MountStat {
    const message = { ...baseMountStat } as MountStat;
    if (object.filesystem !== undefined && object.filesystem !== null) {
      message.filesystem = object.filesystem;
    } else {
      message.filesystem = "";
    }
    if (object.size !== undefined && object.size !== null) {
      message.size = object.size;
    } else {
      message.size = 0;
    }
    if (object.available !== undefined && object.available !== null) {
      message.available = object.available;
    } else {
      message.available = 0;
    }
    if (object.mounted_on !== undefined && object.mounted_on !== null) {
      message.mounted_on = object.mounted_on;
    } else {
      message.mounted_on = "";
    }
    return message;
  },
};

const baseVersion: object = {};

export const Version = {
  encode(message: Version, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.version !== undefined) {
      VersionInfo.encode(message.version, writer.uint32(18).fork()).ldelim();
    }
    if (message.platform !== undefined) {
      PlatformInfo.encode(message.platform, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Version {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVersion } as Version;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.version = VersionInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.platform = PlatformInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Version {
    const message = { ...baseVersion } as Version;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = VersionInfo.fromJSON(object.version);
    } else {
      message.version = undefined;
    }
    if (object.platform !== undefined && object.platform !== null) {
      message.platform = PlatformInfo.fromJSON(object.platform);
    } else {
      message.platform = undefined;
    }
    return message;
  },

  toJSON(message: Version): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.version !== undefined &&
      (obj.version = message.version
        ? VersionInfo.toJSON(message.version)
        : undefined);
    message.platform !== undefined &&
      (obj.platform = message.platform
        ? PlatformInfo.toJSON(message.platform)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Version>): Version {
    const message = { ...baseVersion } as Version;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = VersionInfo.fromPartial(object.version);
    } else {
      message.version = undefined;
    }
    if (object.platform !== undefined && object.platform !== null) {
      message.platform = PlatformInfo.fromPartial(object.platform);
    } else {
      message.platform = undefined;
    }
    return message;
  },
};

const baseVersionResponse: object = {};

export const VersionResponse = {
  encode(message: VersionResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Version.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): VersionResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVersionResponse } as VersionResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Version.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VersionResponse {
    const message = { ...baseVersionResponse } as VersionResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Version.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: VersionResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Version.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<VersionResponse>): VersionResponse {
    const message = { ...baseVersionResponse } as VersionResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Version.fromPartial(e));
      }
    }
    return message;
  },
};

const baseVersionInfo: object = {
  tag: "",
  sha: "",
  built: "",
  go_version: "",
  os: "",
  arch: "",
};

export const VersionInfo = {
  encode(message: VersionInfo, writer: Writer = Writer.create()): Writer {
    if (message.tag !== "") {
      writer.uint32(10).string(message.tag);
    }
    if (message.sha !== "") {
      writer.uint32(18).string(message.sha);
    }
    if (message.built !== "") {
      writer.uint32(26).string(message.built);
    }
    if (message.go_version !== "") {
      writer.uint32(34).string(message.go_version);
    }
    if (message.os !== "") {
      writer.uint32(42).string(message.os);
    }
    if (message.arch !== "") {
      writer.uint32(50).string(message.arch);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): VersionInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVersionInfo } as VersionInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tag = reader.string();
          break;
        case 2:
          message.sha = reader.string();
          break;
        case 3:
          message.built = reader.string();
          break;
        case 4:
          message.go_version = reader.string();
          break;
        case 5:
          message.os = reader.string();
          break;
        case 6:
          message.arch = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VersionInfo {
    const message = { ...baseVersionInfo } as VersionInfo;
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = String(object.tag);
    } else {
      message.tag = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = String(object.sha);
    } else {
      message.sha = "";
    }
    if (object.built !== undefined && object.built !== null) {
      message.built = String(object.built);
    } else {
      message.built = "";
    }
    if (object.go_version !== undefined && object.go_version !== null) {
      message.go_version = String(object.go_version);
    } else {
      message.go_version = "";
    }
    if (object.os !== undefined && object.os !== null) {
      message.os = String(object.os);
    } else {
      message.os = "";
    }
    if (object.arch !== undefined && object.arch !== null) {
      message.arch = String(object.arch);
    } else {
      message.arch = "";
    }
    return message;
  },

  toJSON(message: VersionInfo): unknown {
    const obj: any = {};
    message.tag !== undefined && (obj.tag = message.tag);
    message.sha !== undefined && (obj.sha = message.sha);
    message.built !== undefined && (obj.built = message.built);
    message.go_version !== undefined && (obj.go_version = message.go_version);
    message.os !== undefined && (obj.os = message.os);
    message.arch !== undefined && (obj.arch = message.arch);
    return obj;
  },

  fromPartial(object: DeepPartial<VersionInfo>): VersionInfo {
    const message = { ...baseVersionInfo } as VersionInfo;
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = object.tag;
    } else {
      message.tag = "";
    }
    if (object.sha !== undefined && object.sha !== null) {
      message.sha = object.sha;
    } else {
      message.sha = "";
    }
    if (object.built !== undefined && object.built !== null) {
      message.built = object.built;
    } else {
      message.built = "";
    }
    if (object.go_version !== undefined && object.go_version !== null) {
      message.go_version = object.go_version;
    } else {
      message.go_version = "";
    }
    if (object.os !== undefined && object.os !== null) {
      message.os = object.os;
    } else {
      message.os = "";
    }
    if (object.arch !== undefined && object.arch !== null) {
      message.arch = object.arch;
    } else {
      message.arch = "";
    }
    return message;
  },
};

const basePlatformInfo: object = { name: "", mode: "" };

export const PlatformInfo = {
  encode(message: PlatformInfo, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.mode !== "") {
      writer.uint32(18).string(message.mode);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PlatformInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePlatformInfo } as PlatformInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.mode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PlatformInfo {
    const message = { ...basePlatformInfo } as PlatformInfo;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.mode !== undefined && object.mode !== null) {
      message.mode = String(object.mode);
    } else {
      message.mode = "";
    }
    return message;
  },

  toJSON(message: PlatformInfo): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.mode !== undefined && (obj.mode = message.mode);
    return obj;
  },

  fromPartial(object: DeepPartial<PlatformInfo>): PlatformInfo {
    const message = { ...basePlatformInfo } as PlatformInfo;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.mode !== undefined && object.mode !== null) {
      message.mode = object.mode;
    } else {
      message.mode = "";
    }
    return message;
  },
};

const baseLogsRequest: object = {
  namespace: "",
  id: "",
  driver: 0,
  follow: false,
  tail_lines: 0,
};

export const LogsRequest = {
  encode(message: LogsRequest, writer: Writer = Writer.create()): Writer {
    if (message.namespace !== "") {
      writer.uint32(10).string(message.namespace);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.driver !== 0) {
      writer.uint32(24).int32(message.driver);
    }
    if (message.follow === true) {
      writer.uint32(32).bool(message.follow);
    }
    if (message.tail_lines !== 0) {
      writer.uint32(40).int32(message.tail_lines);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): LogsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLogsRequest } as LogsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.namespace = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.driver = reader.int32() as any;
          break;
        case 4:
          message.follow = reader.bool();
          break;
        case 5:
          message.tail_lines = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LogsRequest {
    const message = { ...baseLogsRequest } as LogsRequest;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = String(object.namespace);
    } else {
      message.namespace = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.driver !== undefined && object.driver !== null) {
      message.driver = containerDriverFromJSON(object.driver);
    } else {
      message.driver = 0;
    }
    if (object.follow !== undefined && object.follow !== null) {
      message.follow = Boolean(object.follow);
    } else {
      message.follow = false;
    }
    if (object.tail_lines !== undefined && object.tail_lines !== null) {
      message.tail_lines = Number(object.tail_lines);
    } else {
      message.tail_lines = 0;
    }
    return message;
  },

  toJSON(message: LogsRequest): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.id !== undefined && (obj.id = message.id);
    message.driver !== undefined &&
      (obj.driver = containerDriverToJSON(message.driver));
    message.follow !== undefined && (obj.follow = message.follow);
    message.tail_lines !== undefined && (obj.tail_lines = message.tail_lines);
    return obj;
  },

  fromPartial(object: DeepPartial<LogsRequest>): LogsRequest {
    const message = { ...baseLogsRequest } as LogsRequest;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = object.namespace;
    } else {
      message.namespace = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.driver !== undefined && object.driver !== null) {
      message.driver = object.driver;
    } else {
      message.driver = 0;
    }
    if (object.follow !== undefined && object.follow !== null) {
      message.follow = object.follow;
    } else {
      message.follow = false;
    }
    if (object.tail_lines !== undefined && object.tail_lines !== null) {
      message.tail_lines = object.tail_lines;
    } else {
      message.tail_lines = 0;
    }
    return message;
  },
};

const baseReadRequest: object = { path: "" };

export const ReadRequest = {
  encode(message: ReadRequest, writer: Writer = Writer.create()): Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ReadRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReadRequest } as ReadRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.path = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ReadRequest {
    const message = { ...baseReadRequest } as ReadRequest;
    if (object.path !== undefined && object.path !== null) {
      message.path = String(object.path);
    } else {
      message.path = "";
    }
    return message;
  },

  toJSON(message: ReadRequest): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    return obj;
  },

  fromPartial(object: DeepPartial<ReadRequest>): ReadRequest {
    const message = { ...baseReadRequest } as ReadRequest;
    if (object.path !== undefined && object.path !== null) {
      message.path = object.path;
    } else {
      message.path = "";
    }
    return message;
  },
};

const baseRollbackRequest: object = {};

export const RollbackRequest = {
  encode(_: RollbackRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RollbackRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRollbackRequest } as RollbackRequest;
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

  fromJSON(_: any): RollbackRequest {
    const message = { ...baseRollbackRequest } as RollbackRequest;
    return message;
  },

  toJSON(_: RollbackRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<RollbackRequest>): RollbackRequest {
    const message = { ...baseRollbackRequest } as RollbackRequest;
    return message;
  },
};

const baseRollback: object = {};

export const Rollback = {
  encode(message: Rollback, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Rollback {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRollback } as Rollback;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Rollback {
    const message = { ...baseRollback } as Rollback;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: Rollback): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Rollback>): Rollback {
    const message = { ...baseRollback } as Rollback;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },
};

const baseRollbackResponse: object = {};

export const RollbackResponse = {
  encode(message: RollbackResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Rollback.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RollbackResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRollbackResponse } as RollbackResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Rollback.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RollbackResponse {
    const message = { ...baseRollbackResponse } as RollbackResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Rollback.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: RollbackResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Rollback.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<RollbackResponse>): RollbackResponse {
    const message = { ...baseRollbackResponse } as RollbackResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Rollback.fromPartial(e));
      }
    }
    return message;
  },
};

const baseContainersRequest: object = { namespace: "", driver: 0 };

export const ContainersRequest = {
  encode(message: ContainersRequest, writer: Writer = Writer.create()): Writer {
    if (message.namespace !== "") {
      writer.uint32(10).string(message.namespace);
    }
    if (message.driver !== 0) {
      writer.uint32(16).int32(message.driver);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ContainersRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContainersRequest } as ContainersRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.namespace = reader.string();
          break;
        case 2:
          message.driver = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContainersRequest {
    const message = { ...baseContainersRequest } as ContainersRequest;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = String(object.namespace);
    } else {
      message.namespace = "";
    }
    if (object.driver !== undefined && object.driver !== null) {
      message.driver = containerDriverFromJSON(object.driver);
    } else {
      message.driver = 0;
    }
    return message;
  },

  toJSON(message: ContainersRequest): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.driver !== undefined &&
      (obj.driver = containerDriverToJSON(message.driver));
    return obj;
  },

  fromPartial(object: DeepPartial<ContainersRequest>): ContainersRequest {
    const message = { ...baseContainersRequest } as ContainersRequest;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = object.namespace;
    } else {
      message.namespace = "";
    }
    if (object.driver !== undefined && object.driver !== null) {
      message.driver = object.driver;
    } else {
      message.driver = 0;
    }
    return message;
  },
};

const baseContainerInfo: object = {
  namespace: "",
  id: "",
  image: "",
  pid: 0,
  status: "",
  pod_id: "",
  name: "",
};

export const ContainerInfo = {
  encode(message: ContainerInfo, writer: Writer = Writer.create()): Writer {
    if (message.namespace !== "") {
      writer.uint32(10).string(message.namespace);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.image !== "") {
      writer.uint32(26).string(message.image);
    }
    if (message.pid !== 0) {
      writer.uint32(32).uint32(message.pid);
    }
    if (message.status !== "") {
      writer.uint32(42).string(message.status);
    }
    if (message.pod_id !== "") {
      writer.uint32(50).string(message.pod_id);
    }
    if (message.name !== "") {
      writer.uint32(58).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ContainerInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContainerInfo } as ContainerInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.namespace = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.image = reader.string();
          break;
        case 4:
          message.pid = reader.uint32();
          break;
        case 5:
          message.status = reader.string();
          break;
        case 6:
          message.pod_id = reader.string();
          break;
        case 7:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContainerInfo {
    const message = { ...baseContainerInfo } as ContainerInfo;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = String(object.namespace);
    } else {
      message.namespace = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.image !== undefined && object.image !== null) {
      message.image = String(object.image);
    } else {
      message.image = "";
    }
    if (object.pid !== undefined && object.pid !== null) {
      message.pid = Number(object.pid);
    } else {
      message.pid = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = String(object.status);
    } else {
      message.status = "";
    }
    if (object.pod_id !== undefined && object.pod_id !== null) {
      message.pod_id = String(object.pod_id);
    } else {
      message.pod_id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: ContainerInfo): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.id !== undefined && (obj.id = message.id);
    message.image !== undefined && (obj.image = message.image);
    message.pid !== undefined && (obj.pid = message.pid);
    message.status !== undefined && (obj.status = message.status);
    message.pod_id !== undefined && (obj.pod_id = message.pod_id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<ContainerInfo>): ContainerInfo {
    const message = { ...baseContainerInfo } as ContainerInfo;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = object.namespace;
    } else {
      message.namespace = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.image !== undefined && object.image !== null) {
      message.image = object.image;
    } else {
      message.image = "";
    }
    if (object.pid !== undefined && object.pid !== null) {
      message.pid = object.pid;
    } else {
      message.pid = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = "";
    }
    if (object.pod_id !== undefined && object.pod_id !== null) {
      message.pod_id = object.pod_id;
    } else {
      message.pod_id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseContainer: object = {};

export const Container = {
  encode(message: Container, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.containers) {
      ContainerInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Container {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContainer } as Container;
    message.containers = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.containers.push(
            ContainerInfo.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Container {
    const message = { ...baseContainer } as Container;
    message.containers = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.containers !== undefined && object.containers !== null) {
      for (const e of object.containers) {
        message.containers.push(ContainerInfo.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Container): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    if (message.containers) {
      obj.containers = message.containers.map((e) =>
        e ? ContainerInfo.toJSON(e) : undefined
      );
    } else {
      obj.containers = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Container>): Container {
    const message = { ...baseContainer } as Container;
    message.containers = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.containers !== undefined && object.containers !== null) {
      for (const e of object.containers) {
        message.containers.push(ContainerInfo.fromPartial(e));
      }
    }
    return message;
  },
};

const baseContainersResponse: object = {};

export const ContainersResponse = {
  encode(
    message: ContainersResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      Container.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ContainersResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContainersResponse } as ContainersResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Container.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContainersResponse {
    const message = { ...baseContainersResponse } as ContainersResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Container.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ContainersResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Container.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ContainersResponse>): ContainersResponse {
    const message = { ...baseContainersResponse } as ContainersResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Container.fromPartial(e));
      }
    }
    return message;
  },
};

const baseDmesgRequest: object = { follow: false, tail: false };

export const DmesgRequest = {
  encode(message: DmesgRequest, writer: Writer = Writer.create()): Writer {
    if (message.follow === true) {
      writer.uint32(8).bool(message.follow);
    }
    if (message.tail === true) {
      writer.uint32(16).bool(message.tail);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DmesgRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDmesgRequest } as DmesgRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.follow = reader.bool();
          break;
        case 2:
          message.tail = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DmesgRequest {
    const message = { ...baseDmesgRequest } as DmesgRequest;
    if (object.follow !== undefined && object.follow !== null) {
      message.follow = Boolean(object.follow);
    } else {
      message.follow = false;
    }
    if (object.tail !== undefined && object.tail !== null) {
      message.tail = Boolean(object.tail);
    } else {
      message.tail = false;
    }
    return message;
  },

  toJSON(message: DmesgRequest): unknown {
    const obj: any = {};
    message.follow !== undefined && (obj.follow = message.follow);
    message.tail !== undefined && (obj.tail = message.tail);
    return obj;
  },

  fromPartial(object: DeepPartial<DmesgRequest>): DmesgRequest {
    const message = { ...baseDmesgRequest } as DmesgRequest;
    if (object.follow !== undefined && object.follow !== null) {
      message.follow = object.follow;
    } else {
      message.follow = false;
    }
    if (object.tail !== undefined && object.tail !== null) {
      message.tail = object.tail;
    } else {
      message.tail = false;
    }
    return message;
  },
};

const baseProcessesResponse: object = {};

export const ProcessesResponse = {
  encode(message: ProcessesResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Process.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ProcessesResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProcessesResponse } as ProcessesResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Process.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessesResponse {
    const message = { ...baseProcessesResponse } as ProcessesResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Process.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ProcessesResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Process.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ProcessesResponse>): ProcessesResponse {
    const message = { ...baseProcessesResponse } as ProcessesResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Process.fromPartial(e));
      }
    }
    return message;
  },
};

const baseProcess: object = {};

export const Process = {
  encode(message: Process, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.processes) {
      ProcessInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Process {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProcess } as Process;
    message.processes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.processes.push(ProcessInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Process {
    const message = { ...baseProcess } as Process;
    message.processes = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.processes !== undefined && object.processes !== null) {
      for (const e of object.processes) {
        message.processes.push(ProcessInfo.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Process): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    if (message.processes) {
      obj.processes = message.processes.map((e) =>
        e ? ProcessInfo.toJSON(e) : undefined
      );
    } else {
      obj.processes = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Process>): Process {
    const message = { ...baseProcess } as Process;
    message.processes = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.processes !== undefined && object.processes !== null) {
      for (const e of object.processes) {
        message.processes.push(ProcessInfo.fromPartial(e));
      }
    }
    return message;
  },
};

const baseProcessInfo: object = {
  pid: 0,
  ppid: 0,
  state: "",
  threads: 0,
  cpu_time: 0,
  virtual_memory: 0,
  resident_memory: 0,
  command: "",
  executable: "",
  args: "",
};

export const ProcessInfo = {
  encode(message: ProcessInfo, writer: Writer = Writer.create()): Writer {
    if (message.pid !== 0) {
      writer.uint32(8).int32(message.pid);
    }
    if (message.ppid !== 0) {
      writer.uint32(16).int32(message.ppid);
    }
    if (message.state !== "") {
      writer.uint32(26).string(message.state);
    }
    if (message.threads !== 0) {
      writer.uint32(32).int32(message.threads);
    }
    if (message.cpu_time !== 0) {
      writer.uint32(41).double(message.cpu_time);
    }
    if (message.virtual_memory !== 0) {
      writer.uint32(48).uint64(message.virtual_memory);
    }
    if (message.resident_memory !== 0) {
      writer.uint32(56).uint64(message.resident_memory);
    }
    if (message.command !== "") {
      writer.uint32(66).string(message.command);
    }
    if (message.executable !== "") {
      writer.uint32(74).string(message.executable);
    }
    if (message.args !== "") {
      writer.uint32(82).string(message.args);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ProcessInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProcessInfo } as ProcessInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pid = reader.int32();
          break;
        case 2:
          message.ppid = reader.int32();
          break;
        case 3:
          message.state = reader.string();
          break;
        case 4:
          message.threads = reader.int32();
          break;
        case 5:
          message.cpu_time = reader.double();
          break;
        case 6:
          message.virtual_memory = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.resident_memory = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.command = reader.string();
          break;
        case 9:
          message.executable = reader.string();
          break;
        case 10:
          message.args = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProcessInfo {
    const message = { ...baseProcessInfo } as ProcessInfo;
    if (object.pid !== undefined && object.pid !== null) {
      message.pid = Number(object.pid);
    } else {
      message.pid = 0;
    }
    if (object.ppid !== undefined && object.ppid !== null) {
      message.ppid = Number(object.ppid);
    } else {
      message.ppid = 0;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = String(object.state);
    } else {
      message.state = "";
    }
    if (object.threads !== undefined && object.threads !== null) {
      message.threads = Number(object.threads);
    } else {
      message.threads = 0;
    }
    if (object.cpu_time !== undefined && object.cpu_time !== null) {
      message.cpu_time = Number(object.cpu_time);
    } else {
      message.cpu_time = 0;
    }
    if (object.virtual_memory !== undefined && object.virtual_memory !== null) {
      message.virtual_memory = Number(object.virtual_memory);
    } else {
      message.virtual_memory = 0;
    }
    if (
      object.resident_memory !== undefined &&
      object.resident_memory !== null
    ) {
      message.resident_memory = Number(object.resident_memory);
    } else {
      message.resident_memory = 0;
    }
    if (object.command !== undefined && object.command !== null) {
      message.command = String(object.command);
    } else {
      message.command = "";
    }
    if (object.executable !== undefined && object.executable !== null) {
      message.executable = String(object.executable);
    } else {
      message.executable = "";
    }
    if (object.args !== undefined && object.args !== null) {
      message.args = String(object.args);
    } else {
      message.args = "";
    }
    return message;
  },

  toJSON(message: ProcessInfo): unknown {
    const obj: any = {};
    message.pid !== undefined && (obj.pid = message.pid);
    message.ppid !== undefined && (obj.ppid = message.ppid);
    message.state !== undefined && (obj.state = message.state);
    message.threads !== undefined && (obj.threads = message.threads);
    message.cpu_time !== undefined && (obj.cpu_time = message.cpu_time);
    message.virtual_memory !== undefined &&
      (obj.virtual_memory = message.virtual_memory);
    message.resident_memory !== undefined &&
      (obj.resident_memory = message.resident_memory);
    message.command !== undefined && (obj.command = message.command);
    message.executable !== undefined && (obj.executable = message.executable);
    message.args !== undefined && (obj.args = message.args);
    return obj;
  },

  fromPartial(object: DeepPartial<ProcessInfo>): ProcessInfo {
    const message = { ...baseProcessInfo } as ProcessInfo;
    if (object.pid !== undefined && object.pid !== null) {
      message.pid = object.pid;
    } else {
      message.pid = 0;
    }
    if (object.ppid !== undefined && object.ppid !== null) {
      message.ppid = object.ppid;
    } else {
      message.ppid = 0;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = "";
    }
    if (object.threads !== undefined && object.threads !== null) {
      message.threads = object.threads;
    } else {
      message.threads = 0;
    }
    if (object.cpu_time !== undefined && object.cpu_time !== null) {
      message.cpu_time = object.cpu_time;
    } else {
      message.cpu_time = 0;
    }
    if (object.virtual_memory !== undefined && object.virtual_memory !== null) {
      message.virtual_memory = object.virtual_memory;
    } else {
      message.virtual_memory = 0;
    }
    if (
      object.resident_memory !== undefined &&
      object.resident_memory !== null
    ) {
      message.resident_memory = object.resident_memory;
    } else {
      message.resident_memory = 0;
    }
    if (object.command !== undefined && object.command !== null) {
      message.command = object.command;
    } else {
      message.command = "";
    }
    if (object.executable !== undefined && object.executable !== null) {
      message.executable = object.executable;
    } else {
      message.executable = "";
    }
    if (object.args !== undefined && object.args !== null) {
      message.args = object.args;
    } else {
      message.args = "";
    }
    return message;
  },
};

const baseRestartRequest: object = { namespace: "", id: "", driver: 0 };

export const RestartRequest = {
  encode(message: RestartRequest, writer: Writer = Writer.create()): Writer {
    if (message.namespace !== "") {
      writer.uint32(10).string(message.namespace);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.driver !== 0) {
      writer.uint32(24).int32(message.driver);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RestartRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRestartRequest } as RestartRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.namespace = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.driver = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RestartRequest {
    const message = { ...baseRestartRequest } as RestartRequest;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = String(object.namespace);
    } else {
      message.namespace = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.driver !== undefined && object.driver !== null) {
      message.driver = containerDriverFromJSON(object.driver);
    } else {
      message.driver = 0;
    }
    return message;
  },

  toJSON(message: RestartRequest): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.id !== undefined && (obj.id = message.id);
    message.driver !== undefined &&
      (obj.driver = containerDriverToJSON(message.driver));
    return obj;
  },

  fromPartial(object: DeepPartial<RestartRequest>): RestartRequest {
    const message = { ...baseRestartRequest } as RestartRequest;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = object.namespace;
    } else {
      message.namespace = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.driver !== undefined && object.driver !== null) {
      message.driver = object.driver;
    } else {
      message.driver = 0;
    }
    return message;
  },
};

const baseRestart: object = {};

export const Restart = {
  encode(message: Restart, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Restart {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRestart } as Restart;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Restart {
    const message = { ...baseRestart } as Restart;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: Restart): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Restart>): Restart {
    const message = { ...baseRestart } as Restart;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },
};

const baseRestartResponse: object = {};

export const RestartResponse = {
  encode(message: RestartResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Restart.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RestartResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRestartResponse } as RestartResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Restart.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RestartResponse {
    const message = { ...baseRestartResponse } as RestartResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Restart.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: RestartResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Restart.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<RestartResponse>): RestartResponse {
    const message = { ...baseRestartResponse } as RestartResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Restart.fromPartial(e));
      }
    }
    return message;
  },
};

const baseStatsRequest: object = { namespace: "", driver: 0 };

export const StatsRequest = {
  encode(message: StatsRequest, writer: Writer = Writer.create()): Writer {
    if (message.namespace !== "") {
      writer.uint32(10).string(message.namespace);
    }
    if (message.driver !== 0) {
      writer.uint32(16).int32(message.driver);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StatsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStatsRequest } as StatsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.namespace = reader.string();
          break;
        case 2:
          message.driver = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatsRequest {
    const message = { ...baseStatsRequest } as StatsRequest;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = String(object.namespace);
    } else {
      message.namespace = "";
    }
    if (object.driver !== undefined && object.driver !== null) {
      message.driver = containerDriverFromJSON(object.driver);
    } else {
      message.driver = 0;
    }
    return message;
  },

  toJSON(message: StatsRequest): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.driver !== undefined &&
      (obj.driver = containerDriverToJSON(message.driver));
    return obj;
  },

  fromPartial(object: DeepPartial<StatsRequest>): StatsRequest {
    const message = { ...baseStatsRequest } as StatsRequest;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = object.namespace;
    } else {
      message.namespace = "";
    }
    if (object.driver !== undefined && object.driver !== null) {
      message.driver = object.driver;
    } else {
      message.driver = 0;
    }
    return message;
  },
};

const baseStats: object = {};

export const Stats = {
  encode(message: Stats, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.stats) {
      Stat.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Stats {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStats } as Stats;
    message.stats = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.stats.push(Stat.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Stats {
    const message = { ...baseStats } as Stats;
    message.stats = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.stats !== undefined && object.stats !== null) {
      for (const e of object.stats) {
        message.stats.push(Stat.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Stats): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    if (message.stats) {
      obj.stats = message.stats.map((e) => (e ? Stat.toJSON(e) : undefined));
    } else {
      obj.stats = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Stats>): Stats {
    const message = { ...baseStats } as Stats;
    message.stats = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.stats !== undefined && object.stats !== null) {
      for (const e of object.stats) {
        message.stats.push(Stat.fromPartial(e));
      }
    }
    return message;
  },
};

const baseStatsResponse: object = {};

export const StatsResponse = {
  encode(message: StatsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Stats.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StatsResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStatsResponse } as StatsResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Stats.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatsResponse {
    const message = { ...baseStatsResponse } as StatsResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Stats.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: StatsResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Stats.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<StatsResponse>): StatsResponse {
    const message = { ...baseStatsResponse } as StatsResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Stats.fromPartial(e));
      }
    }
    return message;
  },
};

const baseStat: object = {
  namespace: "",
  id: "",
  memory_usage: 0,
  cpu_usage: 0,
  pod_id: "",
  name: "",
};

export const Stat = {
  encode(message: Stat, writer: Writer = Writer.create()): Writer {
    if (message.namespace !== "") {
      writer.uint32(10).string(message.namespace);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.memory_usage !== 0) {
      writer.uint32(32).uint64(message.memory_usage);
    }
    if (message.cpu_usage !== 0) {
      writer.uint32(40).uint64(message.cpu_usage);
    }
    if (message.pod_id !== "") {
      writer.uint32(50).string(message.pod_id);
    }
    if (message.name !== "") {
      writer.uint32(58).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Stat {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStat } as Stat;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.namespace = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 4:
          message.memory_usage = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.cpu_usage = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.pod_id = reader.string();
          break;
        case 7:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Stat {
    const message = { ...baseStat } as Stat;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = String(object.namespace);
    } else {
      message.namespace = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.memory_usage !== undefined && object.memory_usage !== null) {
      message.memory_usage = Number(object.memory_usage);
    } else {
      message.memory_usage = 0;
    }
    if (object.cpu_usage !== undefined && object.cpu_usage !== null) {
      message.cpu_usage = Number(object.cpu_usage);
    } else {
      message.cpu_usage = 0;
    }
    if (object.pod_id !== undefined && object.pod_id !== null) {
      message.pod_id = String(object.pod_id);
    } else {
      message.pod_id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: Stat): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.id !== undefined && (obj.id = message.id);
    message.memory_usage !== undefined &&
      (obj.memory_usage = message.memory_usage);
    message.cpu_usage !== undefined && (obj.cpu_usage = message.cpu_usage);
    message.pod_id !== undefined && (obj.pod_id = message.pod_id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<Stat>): Stat {
    const message = { ...baseStat } as Stat;
    if (object.namespace !== undefined && object.namespace !== null) {
      message.namespace = object.namespace;
    } else {
      message.namespace = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.memory_usage !== undefined && object.memory_usage !== null) {
      message.memory_usage = object.memory_usage;
    } else {
      message.memory_usage = 0;
    }
    if (object.cpu_usage !== undefined && object.cpu_usage !== null) {
      message.cpu_usage = object.cpu_usage;
    } else {
      message.cpu_usage = 0;
    }
    if (object.pod_id !== undefined && object.pod_id !== null) {
      message.pod_id = object.pod_id;
    } else {
      message.pod_id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMemory: object = {};

export const Memory = {
  encode(message: Memory, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.meminfo !== undefined) {
      MemInfo.encode(message.meminfo, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Memory {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMemory } as Memory;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.meminfo = MemInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Memory {
    const message = { ...baseMemory } as Memory;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.meminfo !== undefined && object.meminfo !== null) {
      message.meminfo = MemInfo.fromJSON(object.meminfo);
    } else {
      message.meminfo = undefined;
    }
    return message;
  },

  toJSON(message: Memory): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.meminfo !== undefined &&
      (obj.meminfo = message.meminfo
        ? MemInfo.toJSON(message.meminfo)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Memory>): Memory {
    const message = { ...baseMemory } as Memory;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.meminfo !== undefined && object.meminfo !== null) {
      message.meminfo = MemInfo.fromPartial(object.meminfo);
    } else {
      message.meminfo = undefined;
    }
    return message;
  },
};

const baseMemoryResponse: object = {};

export const MemoryResponse = {
  encode(message: MemoryResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Memory.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MemoryResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMemoryResponse } as MemoryResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Memory.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MemoryResponse {
    const message = { ...baseMemoryResponse } as MemoryResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Memory.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MemoryResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Memory.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MemoryResponse>): MemoryResponse {
    const message = { ...baseMemoryResponse } as MemoryResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Memory.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMemInfo: object = {
  memtotal: 0,
  memfree: 0,
  memavailable: 0,
  buffers: 0,
  cached: 0,
  swapcached: 0,
  active: 0,
  inactive: 0,
  activeanon: 0,
  inactiveanon: 0,
  activefile: 0,
  inactivefile: 0,
  unevictable: 0,
  mlocked: 0,
  swaptotal: 0,
  swapfree: 0,
  dirty: 0,
  writeback: 0,
  anonpages: 0,
  mapped: 0,
  shmem: 0,
  slab: 0,
  sreclaimable: 0,
  sunreclaim: 0,
  kernelstack: 0,
  pagetables: 0,
  nfsunstable: 0,
  bounce: 0,
  writebacktmp: 0,
  commitlimit: 0,
  committedas: 0,
  vmalloctotal: 0,
  vmallocused: 0,
  vmallocchunk: 0,
  hardwarecorrupted: 0,
  anonhugepages: 0,
  shmemhugepages: 0,
  shmempmdmapped: 0,
  cmatotal: 0,
  cmafree: 0,
  hugepagestotal: 0,
  hugepagesfree: 0,
  hugepagesrsvd: 0,
  hugepagessurp: 0,
  hugepagesize: 0,
  directmap4k: 0,
  directmap2m: 0,
  directmap1g: 0,
};

export const MemInfo = {
  encode(message: MemInfo, writer: Writer = Writer.create()): Writer {
    if (message.memtotal !== 0) {
      writer.uint32(8).uint64(message.memtotal);
    }
    if (message.memfree !== 0) {
      writer.uint32(16).uint64(message.memfree);
    }
    if (message.memavailable !== 0) {
      writer.uint32(24).uint64(message.memavailable);
    }
    if (message.buffers !== 0) {
      writer.uint32(32).uint64(message.buffers);
    }
    if (message.cached !== 0) {
      writer.uint32(40).uint64(message.cached);
    }
    if (message.swapcached !== 0) {
      writer.uint32(48).uint64(message.swapcached);
    }
    if (message.active !== 0) {
      writer.uint32(56).uint64(message.active);
    }
    if (message.inactive !== 0) {
      writer.uint32(64).uint64(message.inactive);
    }
    if (message.activeanon !== 0) {
      writer.uint32(72).uint64(message.activeanon);
    }
    if (message.inactiveanon !== 0) {
      writer.uint32(80).uint64(message.inactiveanon);
    }
    if (message.activefile !== 0) {
      writer.uint32(88).uint64(message.activefile);
    }
    if (message.inactivefile !== 0) {
      writer.uint32(96).uint64(message.inactivefile);
    }
    if (message.unevictable !== 0) {
      writer.uint32(104).uint64(message.unevictable);
    }
    if (message.mlocked !== 0) {
      writer.uint32(112).uint64(message.mlocked);
    }
    if (message.swaptotal !== 0) {
      writer.uint32(120).uint64(message.swaptotal);
    }
    if (message.swapfree !== 0) {
      writer.uint32(128).uint64(message.swapfree);
    }
    if (message.dirty !== 0) {
      writer.uint32(136).uint64(message.dirty);
    }
    if (message.writeback !== 0) {
      writer.uint32(144).uint64(message.writeback);
    }
    if (message.anonpages !== 0) {
      writer.uint32(152).uint64(message.anonpages);
    }
    if (message.mapped !== 0) {
      writer.uint32(160).uint64(message.mapped);
    }
    if (message.shmem !== 0) {
      writer.uint32(168).uint64(message.shmem);
    }
    if (message.slab !== 0) {
      writer.uint32(176).uint64(message.slab);
    }
    if (message.sreclaimable !== 0) {
      writer.uint32(184).uint64(message.sreclaimable);
    }
    if (message.sunreclaim !== 0) {
      writer.uint32(192).uint64(message.sunreclaim);
    }
    if (message.kernelstack !== 0) {
      writer.uint32(200).uint64(message.kernelstack);
    }
    if (message.pagetables !== 0) {
      writer.uint32(208).uint64(message.pagetables);
    }
    if (message.nfsunstable !== 0) {
      writer.uint32(216).uint64(message.nfsunstable);
    }
    if (message.bounce !== 0) {
      writer.uint32(224).uint64(message.bounce);
    }
    if (message.writebacktmp !== 0) {
      writer.uint32(232).uint64(message.writebacktmp);
    }
    if (message.commitlimit !== 0) {
      writer.uint32(240).uint64(message.commitlimit);
    }
    if (message.committedas !== 0) {
      writer.uint32(248).uint64(message.committedas);
    }
    if (message.vmalloctotal !== 0) {
      writer.uint32(256).uint64(message.vmalloctotal);
    }
    if (message.vmallocused !== 0) {
      writer.uint32(264).uint64(message.vmallocused);
    }
    if (message.vmallocchunk !== 0) {
      writer.uint32(272).uint64(message.vmallocchunk);
    }
    if (message.hardwarecorrupted !== 0) {
      writer.uint32(280).uint64(message.hardwarecorrupted);
    }
    if (message.anonhugepages !== 0) {
      writer.uint32(288).uint64(message.anonhugepages);
    }
    if (message.shmemhugepages !== 0) {
      writer.uint32(296).uint64(message.shmemhugepages);
    }
    if (message.shmempmdmapped !== 0) {
      writer.uint32(304).uint64(message.shmempmdmapped);
    }
    if (message.cmatotal !== 0) {
      writer.uint32(312).uint64(message.cmatotal);
    }
    if (message.cmafree !== 0) {
      writer.uint32(320).uint64(message.cmafree);
    }
    if (message.hugepagestotal !== 0) {
      writer.uint32(328).uint64(message.hugepagestotal);
    }
    if (message.hugepagesfree !== 0) {
      writer.uint32(336).uint64(message.hugepagesfree);
    }
    if (message.hugepagesrsvd !== 0) {
      writer.uint32(344).uint64(message.hugepagesrsvd);
    }
    if (message.hugepagessurp !== 0) {
      writer.uint32(352).uint64(message.hugepagessurp);
    }
    if (message.hugepagesize !== 0) {
      writer.uint32(360).uint64(message.hugepagesize);
    }
    if (message.directmap4k !== 0) {
      writer.uint32(368).uint64(message.directmap4k);
    }
    if (message.directmap2m !== 0) {
      writer.uint32(376).uint64(message.directmap2m);
    }
    if (message.directmap1g !== 0) {
      writer.uint32(384).uint64(message.directmap1g);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MemInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMemInfo } as MemInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.memtotal = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.memfree = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.memavailable = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.buffers = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.cached = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.swapcached = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.active = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.inactive = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.activeanon = longToNumber(reader.uint64() as Long);
          break;
        case 10:
          message.inactiveanon = longToNumber(reader.uint64() as Long);
          break;
        case 11:
          message.activefile = longToNumber(reader.uint64() as Long);
          break;
        case 12:
          message.inactivefile = longToNumber(reader.uint64() as Long);
          break;
        case 13:
          message.unevictable = longToNumber(reader.uint64() as Long);
          break;
        case 14:
          message.mlocked = longToNumber(reader.uint64() as Long);
          break;
        case 15:
          message.swaptotal = longToNumber(reader.uint64() as Long);
          break;
        case 16:
          message.swapfree = longToNumber(reader.uint64() as Long);
          break;
        case 17:
          message.dirty = longToNumber(reader.uint64() as Long);
          break;
        case 18:
          message.writeback = longToNumber(reader.uint64() as Long);
          break;
        case 19:
          message.anonpages = longToNumber(reader.uint64() as Long);
          break;
        case 20:
          message.mapped = longToNumber(reader.uint64() as Long);
          break;
        case 21:
          message.shmem = longToNumber(reader.uint64() as Long);
          break;
        case 22:
          message.slab = longToNumber(reader.uint64() as Long);
          break;
        case 23:
          message.sreclaimable = longToNumber(reader.uint64() as Long);
          break;
        case 24:
          message.sunreclaim = longToNumber(reader.uint64() as Long);
          break;
        case 25:
          message.kernelstack = longToNumber(reader.uint64() as Long);
          break;
        case 26:
          message.pagetables = longToNumber(reader.uint64() as Long);
          break;
        case 27:
          message.nfsunstable = longToNumber(reader.uint64() as Long);
          break;
        case 28:
          message.bounce = longToNumber(reader.uint64() as Long);
          break;
        case 29:
          message.writebacktmp = longToNumber(reader.uint64() as Long);
          break;
        case 30:
          message.commitlimit = longToNumber(reader.uint64() as Long);
          break;
        case 31:
          message.committedas = longToNumber(reader.uint64() as Long);
          break;
        case 32:
          message.vmalloctotal = longToNumber(reader.uint64() as Long);
          break;
        case 33:
          message.vmallocused = longToNumber(reader.uint64() as Long);
          break;
        case 34:
          message.vmallocchunk = longToNumber(reader.uint64() as Long);
          break;
        case 35:
          message.hardwarecorrupted = longToNumber(reader.uint64() as Long);
          break;
        case 36:
          message.anonhugepages = longToNumber(reader.uint64() as Long);
          break;
        case 37:
          message.shmemhugepages = longToNumber(reader.uint64() as Long);
          break;
        case 38:
          message.shmempmdmapped = longToNumber(reader.uint64() as Long);
          break;
        case 39:
          message.cmatotal = longToNumber(reader.uint64() as Long);
          break;
        case 40:
          message.cmafree = longToNumber(reader.uint64() as Long);
          break;
        case 41:
          message.hugepagestotal = longToNumber(reader.uint64() as Long);
          break;
        case 42:
          message.hugepagesfree = longToNumber(reader.uint64() as Long);
          break;
        case 43:
          message.hugepagesrsvd = longToNumber(reader.uint64() as Long);
          break;
        case 44:
          message.hugepagessurp = longToNumber(reader.uint64() as Long);
          break;
        case 45:
          message.hugepagesize = longToNumber(reader.uint64() as Long);
          break;
        case 46:
          message.directmap4k = longToNumber(reader.uint64() as Long);
          break;
        case 47:
          message.directmap2m = longToNumber(reader.uint64() as Long);
          break;
        case 48:
          message.directmap1g = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MemInfo {
    const message = { ...baseMemInfo } as MemInfo;
    if (object.memtotal !== undefined && object.memtotal !== null) {
      message.memtotal = Number(object.memtotal);
    } else {
      message.memtotal = 0;
    }
    if (object.memfree !== undefined && object.memfree !== null) {
      message.memfree = Number(object.memfree);
    } else {
      message.memfree = 0;
    }
    if (object.memavailable !== undefined && object.memavailable !== null) {
      message.memavailable = Number(object.memavailable);
    } else {
      message.memavailable = 0;
    }
    if (object.buffers !== undefined && object.buffers !== null) {
      message.buffers = Number(object.buffers);
    } else {
      message.buffers = 0;
    }
    if (object.cached !== undefined && object.cached !== null) {
      message.cached = Number(object.cached);
    } else {
      message.cached = 0;
    }
    if (object.swapcached !== undefined && object.swapcached !== null) {
      message.swapcached = Number(object.swapcached);
    } else {
      message.swapcached = 0;
    }
    if (object.active !== undefined && object.active !== null) {
      message.active = Number(object.active);
    } else {
      message.active = 0;
    }
    if (object.inactive !== undefined && object.inactive !== null) {
      message.inactive = Number(object.inactive);
    } else {
      message.inactive = 0;
    }
    if (object.activeanon !== undefined && object.activeanon !== null) {
      message.activeanon = Number(object.activeanon);
    } else {
      message.activeanon = 0;
    }
    if (object.inactiveanon !== undefined && object.inactiveanon !== null) {
      message.inactiveanon = Number(object.inactiveanon);
    } else {
      message.inactiveanon = 0;
    }
    if (object.activefile !== undefined && object.activefile !== null) {
      message.activefile = Number(object.activefile);
    } else {
      message.activefile = 0;
    }
    if (object.inactivefile !== undefined && object.inactivefile !== null) {
      message.inactivefile = Number(object.inactivefile);
    } else {
      message.inactivefile = 0;
    }
    if (object.unevictable !== undefined && object.unevictable !== null) {
      message.unevictable = Number(object.unevictable);
    } else {
      message.unevictable = 0;
    }
    if (object.mlocked !== undefined && object.mlocked !== null) {
      message.mlocked = Number(object.mlocked);
    } else {
      message.mlocked = 0;
    }
    if (object.swaptotal !== undefined && object.swaptotal !== null) {
      message.swaptotal = Number(object.swaptotal);
    } else {
      message.swaptotal = 0;
    }
    if (object.swapfree !== undefined && object.swapfree !== null) {
      message.swapfree = Number(object.swapfree);
    } else {
      message.swapfree = 0;
    }
    if (object.dirty !== undefined && object.dirty !== null) {
      message.dirty = Number(object.dirty);
    } else {
      message.dirty = 0;
    }
    if (object.writeback !== undefined && object.writeback !== null) {
      message.writeback = Number(object.writeback);
    } else {
      message.writeback = 0;
    }
    if (object.anonpages !== undefined && object.anonpages !== null) {
      message.anonpages = Number(object.anonpages);
    } else {
      message.anonpages = 0;
    }
    if (object.mapped !== undefined && object.mapped !== null) {
      message.mapped = Number(object.mapped);
    } else {
      message.mapped = 0;
    }
    if (object.shmem !== undefined && object.shmem !== null) {
      message.shmem = Number(object.shmem);
    } else {
      message.shmem = 0;
    }
    if (object.slab !== undefined && object.slab !== null) {
      message.slab = Number(object.slab);
    } else {
      message.slab = 0;
    }
    if (object.sreclaimable !== undefined && object.sreclaimable !== null) {
      message.sreclaimable = Number(object.sreclaimable);
    } else {
      message.sreclaimable = 0;
    }
    if (object.sunreclaim !== undefined && object.sunreclaim !== null) {
      message.sunreclaim = Number(object.sunreclaim);
    } else {
      message.sunreclaim = 0;
    }
    if (object.kernelstack !== undefined && object.kernelstack !== null) {
      message.kernelstack = Number(object.kernelstack);
    } else {
      message.kernelstack = 0;
    }
    if (object.pagetables !== undefined && object.pagetables !== null) {
      message.pagetables = Number(object.pagetables);
    } else {
      message.pagetables = 0;
    }
    if (object.nfsunstable !== undefined && object.nfsunstable !== null) {
      message.nfsunstable = Number(object.nfsunstable);
    } else {
      message.nfsunstable = 0;
    }
    if (object.bounce !== undefined && object.bounce !== null) {
      message.bounce = Number(object.bounce);
    } else {
      message.bounce = 0;
    }
    if (object.writebacktmp !== undefined && object.writebacktmp !== null) {
      message.writebacktmp = Number(object.writebacktmp);
    } else {
      message.writebacktmp = 0;
    }
    if (object.commitlimit !== undefined && object.commitlimit !== null) {
      message.commitlimit = Number(object.commitlimit);
    } else {
      message.commitlimit = 0;
    }
    if (object.committedas !== undefined && object.committedas !== null) {
      message.committedas = Number(object.committedas);
    } else {
      message.committedas = 0;
    }
    if (object.vmalloctotal !== undefined && object.vmalloctotal !== null) {
      message.vmalloctotal = Number(object.vmalloctotal);
    } else {
      message.vmalloctotal = 0;
    }
    if (object.vmallocused !== undefined && object.vmallocused !== null) {
      message.vmallocused = Number(object.vmallocused);
    } else {
      message.vmallocused = 0;
    }
    if (object.vmallocchunk !== undefined && object.vmallocchunk !== null) {
      message.vmallocchunk = Number(object.vmallocchunk);
    } else {
      message.vmallocchunk = 0;
    }
    if (
      object.hardwarecorrupted !== undefined &&
      object.hardwarecorrupted !== null
    ) {
      message.hardwarecorrupted = Number(object.hardwarecorrupted);
    } else {
      message.hardwarecorrupted = 0;
    }
    if (object.anonhugepages !== undefined && object.anonhugepages !== null) {
      message.anonhugepages = Number(object.anonhugepages);
    } else {
      message.anonhugepages = 0;
    }
    if (object.shmemhugepages !== undefined && object.shmemhugepages !== null) {
      message.shmemhugepages = Number(object.shmemhugepages);
    } else {
      message.shmemhugepages = 0;
    }
    if (object.shmempmdmapped !== undefined && object.shmempmdmapped !== null) {
      message.shmempmdmapped = Number(object.shmempmdmapped);
    } else {
      message.shmempmdmapped = 0;
    }
    if (object.cmatotal !== undefined && object.cmatotal !== null) {
      message.cmatotal = Number(object.cmatotal);
    } else {
      message.cmatotal = 0;
    }
    if (object.cmafree !== undefined && object.cmafree !== null) {
      message.cmafree = Number(object.cmafree);
    } else {
      message.cmafree = 0;
    }
    if (object.hugepagestotal !== undefined && object.hugepagestotal !== null) {
      message.hugepagestotal = Number(object.hugepagestotal);
    } else {
      message.hugepagestotal = 0;
    }
    if (object.hugepagesfree !== undefined && object.hugepagesfree !== null) {
      message.hugepagesfree = Number(object.hugepagesfree);
    } else {
      message.hugepagesfree = 0;
    }
    if (object.hugepagesrsvd !== undefined && object.hugepagesrsvd !== null) {
      message.hugepagesrsvd = Number(object.hugepagesrsvd);
    } else {
      message.hugepagesrsvd = 0;
    }
    if (object.hugepagessurp !== undefined && object.hugepagessurp !== null) {
      message.hugepagessurp = Number(object.hugepagessurp);
    } else {
      message.hugepagessurp = 0;
    }
    if (object.hugepagesize !== undefined && object.hugepagesize !== null) {
      message.hugepagesize = Number(object.hugepagesize);
    } else {
      message.hugepagesize = 0;
    }
    if (object.directmap4k !== undefined && object.directmap4k !== null) {
      message.directmap4k = Number(object.directmap4k);
    } else {
      message.directmap4k = 0;
    }
    if (object.directmap2m !== undefined && object.directmap2m !== null) {
      message.directmap2m = Number(object.directmap2m);
    } else {
      message.directmap2m = 0;
    }
    if (object.directmap1g !== undefined && object.directmap1g !== null) {
      message.directmap1g = Number(object.directmap1g);
    } else {
      message.directmap1g = 0;
    }
    return message;
  },

  toJSON(message: MemInfo): unknown {
    const obj: any = {};
    message.memtotal !== undefined && (obj.memtotal = message.memtotal);
    message.memfree !== undefined && (obj.memfree = message.memfree);
    message.memavailable !== undefined &&
      (obj.memavailable = message.memavailable);
    message.buffers !== undefined && (obj.buffers = message.buffers);
    message.cached !== undefined && (obj.cached = message.cached);
    message.swapcached !== undefined && (obj.swapcached = message.swapcached);
    message.active !== undefined && (obj.active = message.active);
    message.inactive !== undefined && (obj.inactive = message.inactive);
    message.activeanon !== undefined && (obj.activeanon = message.activeanon);
    message.inactiveanon !== undefined &&
      (obj.inactiveanon = message.inactiveanon);
    message.activefile !== undefined && (obj.activefile = message.activefile);
    message.inactivefile !== undefined &&
      (obj.inactivefile = message.inactivefile);
    message.unevictable !== undefined &&
      (obj.unevictable = message.unevictable);
    message.mlocked !== undefined && (obj.mlocked = message.mlocked);
    message.swaptotal !== undefined && (obj.swaptotal = message.swaptotal);
    message.swapfree !== undefined && (obj.swapfree = message.swapfree);
    message.dirty !== undefined && (obj.dirty = message.dirty);
    message.writeback !== undefined && (obj.writeback = message.writeback);
    message.anonpages !== undefined && (obj.anonpages = message.anonpages);
    message.mapped !== undefined && (obj.mapped = message.mapped);
    message.shmem !== undefined && (obj.shmem = message.shmem);
    message.slab !== undefined && (obj.slab = message.slab);
    message.sreclaimable !== undefined &&
      (obj.sreclaimable = message.sreclaimable);
    message.sunreclaim !== undefined && (obj.sunreclaim = message.sunreclaim);
    message.kernelstack !== undefined &&
      (obj.kernelstack = message.kernelstack);
    message.pagetables !== undefined && (obj.pagetables = message.pagetables);
    message.nfsunstable !== undefined &&
      (obj.nfsunstable = message.nfsunstable);
    message.bounce !== undefined && (obj.bounce = message.bounce);
    message.writebacktmp !== undefined &&
      (obj.writebacktmp = message.writebacktmp);
    message.commitlimit !== undefined &&
      (obj.commitlimit = message.commitlimit);
    message.committedas !== undefined &&
      (obj.committedas = message.committedas);
    message.vmalloctotal !== undefined &&
      (obj.vmalloctotal = message.vmalloctotal);
    message.vmallocused !== undefined &&
      (obj.vmallocused = message.vmallocused);
    message.vmallocchunk !== undefined &&
      (obj.vmallocchunk = message.vmallocchunk);
    message.hardwarecorrupted !== undefined &&
      (obj.hardwarecorrupted = message.hardwarecorrupted);
    message.anonhugepages !== undefined &&
      (obj.anonhugepages = message.anonhugepages);
    message.shmemhugepages !== undefined &&
      (obj.shmemhugepages = message.shmemhugepages);
    message.shmempmdmapped !== undefined &&
      (obj.shmempmdmapped = message.shmempmdmapped);
    message.cmatotal !== undefined && (obj.cmatotal = message.cmatotal);
    message.cmafree !== undefined && (obj.cmafree = message.cmafree);
    message.hugepagestotal !== undefined &&
      (obj.hugepagestotal = message.hugepagestotal);
    message.hugepagesfree !== undefined &&
      (obj.hugepagesfree = message.hugepagesfree);
    message.hugepagesrsvd !== undefined &&
      (obj.hugepagesrsvd = message.hugepagesrsvd);
    message.hugepagessurp !== undefined &&
      (obj.hugepagessurp = message.hugepagessurp);
    message.hugepagesize !== undefined &&
      (obj.hugepagesize = message.hugepagesize);
    message.directmap4k !== undefined &&
      (obj.directmap4k = message.directmap4k);
    message.directmap2m !== undefined &&
      (obj.directmap2m = message.directmap2m);
    message.directmap1g !== undefined &&
      (obj.directmap1g = message.directmap1g);
    return obj;
  },

  fromPartial(object: DeepPartial<MemInfo>): MemInfo {
    const message = { ...baseMemInfo } as MemInfo;
    if (object.memtotal !== undefined && object.memtotal !== null) {
      message.memtotal = object.memtotal;
    } else {
      message.memtotal = 0;
    }
    if (object.memfree !== undefined && object.memfree !== null) {
      message.memfree = object.memfree;
    } else {
      message.memfree = 0;
    }
    if (object.memavailable !== undefined && object.memavailable !== null) {
      message.memavailable = object.memavailable;
    } else {
      message.memavailable = 0;
    }
    if (object.buffers !== undefined && object.buffers !== null) {
      message.buffers = object.buffers;
    } else {
      message.buffers = 0;
    }
    if (object.cached !== undefined && object.cached !== null) {
      message.cached = object.cached;
    } else {
      message.cached = 0;
    }
    if (object.swapcached !== undefined && object.swapcached !== null) {
      message.swapcached = object.swapcached;
    } else {
      message.swapcached = 0;
    }
    if (object.active !== undefined && object.active !== null) {
      message.active = object.active;
    } else {
      message.active = 0;
    }
    if (object.inactive !== undefined && object.inactive !== null) {
      message.inactive = object.inactive;
    } else {
      message.inactive = 0;
    }
    if (object.activeanon !== undefined && object.activeanon !== null) {
      message.activeanon = object.activeanon;
    } else {
      message.activeanon = 0;
    }
    if (object.inactiveanon !== undefined && object.inactiveanon !== null) {
      message.inactiveanon = object.inactiveanon;
    } else {
      message.inactiveanon = 0;
    }
    if (object.activefile !== undefined && object.activefile !== null) {
      message.activefile = object.activefile;
    } else {
      message.activefile = 0;
    }
    if (object.inactivefile !== undefined && object.inactivefile !== null) {
      message.inactivefile = object.inactivefile;
    } else {
      message.inactivefile = 0;
    }
    if (object.unevictable !== undefined && object.unevictable !== null) {
      message.unevictable = object.unevictable;
    } else {
      message.unevictable = 0;
    }
    if (object.mlocked !== undefined && object.mlocked !== null) {
      message.mlocked = object.mlocked;
    } else {
      message.mlocked = 0;
    }
    if (object.swaptotal !== undefined && object.swaptotal !== null) {
      message.swaptotal = object.swaptotal;
    } else {
      message.swaptotal = 0;
    }
    if (object.swapfree !== undefined && object.swapfree !== null) {
      message.swapfree = object.swapfree;
    } else {
      message.swapfree = 0;
    }
    if (object.dirty !== undefined && object.dirty !== null) {
      message.dirty = object.dirty;
    } else {
      message.dirty = 0;
    }
    if (object.writeback !== undefined && object.writeback !== null) {
      message.writeback = object.writeback;
    } else {
      message.writeback = 0;
    }
    if (object.anonpages !== undefined && object.anonpages !== null) {
      message.anonpages = object.anonpages;
    } else {
      message.anonpages = 0;
    }
    if (object.mapped !== undefined && object.mapped !== null) {
      message.mapped = object.mapped;
    } else {
      message.mapped = 0;
    }
    if (object.shmem !== undefined && object.shmem !== null) {
      message.shmem = object.shmem;
    } else {
      message.shmem = 0;
    }
    if (object.slab !== undefined && object.slab !== null) {
      message.slab = object.slab;
    } else {
      message.slab = 0;
    }
    if (object.sreclaimable !== undefined && object.sreclaimable !== null) {
      message.sreclaimable = object.sreclaimable;
    } else {
      message.sreclaimable = 0;
    }
    if (object.sunreclaim !== undefined && object.sunreclaim !== null) {
      message.sunreclaim = object.sunreclaim;
    } else {
      message.sunreclaim = 0;
    }
    if (object.kernelstack !== undefined && object.kernelstack !== null) {
      message.kernelstack = object.kernelstack;
    } else {
      message.kernelstack = 0;
    }
    if (object.pagetables !== undefined && object.pagetables !== null) {
      message.pagetables = object.pagetables;
    } else {
      message.pagetables = 0;
    }
    if (object.nfsunstable !== undefined && object.nfsunstable !== null) {
      message.nfsunstable = object.nfsunstable;
    } else {
      message.nfsunstable = 0;
    }
    if (object.bounce !== undefined && object.bounce !== null) {
      message.bounce = object.bounce;
    } else {
      message.bounce = 0;
    }
    if (object.writebacktmp !== undefined && object.writebacktmp !== null) {
      message.writebacktmp = object.writebacktmp;
    } else {
      message.writebacktmp = 0;
    }
    if (object.commitlimit !== undefined && object.commitlimit !== null) {
      message.commitlimit = object.commitlimit;
    } else {
      message.commitlimit = 0;
    }
    if (object.committedas !== undefined && object.committedas !== null) {
      message.committedas = object.committedas;
    } else {
      message.committedas = 0;
    }
    if (object.vmalloctotal !== undefined && object.vmalloctotal !== null) {
      message.vmalloctotal = object.vmalloctotal;
    } else {
      message.vmalloctotal = 0;
    }
    if (object.vmallocused !== undefined && object.vmallocused !== null) {
      message.vmallocused = object.vmallocused;
    } else {
      message.vmallocused = 0;
    }
    if (object.vmallocchunk !== undefined && object.vmallocchunk !== null) {
      message.vmallocchunk = object.vmallocchunk;
    } else {
      message.vmallocchunk = 0;
    }
    if (
      object.hardwarecorrupted !== undefined &&
      object.hardwarecorrupted !== null
    ) {
      message.hardwarecorrupted = object.hardwarecorrupted;
    } else {
      message.hardwarecorrupted = 0;
    }
    if (object.anonhugepages !== undefined && object.anonhugepages !== null) {
      message.anonhugepages = object.anonhugepages;
    } else {
      message.anonhugepages = 0;
    }
    if (object.shmemhugepages !== undefined && object.shmemhugepages !== null) {
      message.shmemhugepages = object.shmemhugepages;
    } else {
      message.shmemhugepages = 0;
    }
    if (object.shmempmdmapped !== undefined && object.shmempmdmapped !== null) {
      message.shmempmdmapped = object.shmempmdmapped;
    } else {
      message.shmempmdmapped = 0;
    }
    if (object.cmatotal !== undefined && object.cmatotal !== null) {
      message.cmatotal = object.cmatotal;
    } else {
      message.cmatotal = 0;
    }
    if (object.cmafree !== undefined && object.cmafree !== null) {
      message.cmafree = object.cmafree;
    } else {
      message.cmafree = 0;
    }
    if (object.hugepagestotal !== undefined && object.hugepagestotal !== null) {
      message.hugepagestotal = object.hugepagestotal;
    } else {
      message.hugepagestotal = 0;
    }
    if (object.hugepagesfree !== undefined && object.hugepagesfree !== null) {
      message.hugepagesfree = object.hugepagesfree;
    } else {
      message.hugepagesfree = 0;
    }
    if (object.hugepagesrsvd !== undefined && object.hugepagesrsvd !== null) {
      message.hugepagesrsvd = object.hugepagesrsvd;
    } else {
      message.hugepagesrsvd = 0;
    }
    if (object.hugepagessurp !== undefined && object.hugepagessurp !== null) {
      message.hugepagessurp = object.hugepagessurp;
    } else {
      message.hugepagessurp = 0;
    }
    if (object.hugepagesize !== undefined && object.hugepagesize !== null) {
      message.hugepagesize = object.hugepagesize;
    } else {
      message.hugepagesize = 0;
    }
    if (object.directmap4k !== undefined && object.directmap4k !== null) {
      message.directmap4k = object.directmap4k;
    } else {
      message.directmap4k = 0;
    }
    if (object.directmap2m !== undefined && object.directmap2m !== null) {
      message.directmap2m = object.directmap2m;
    } else {
      message.directmap2m = 0;
    }
    if (object.directmap1g !== undefined && object.directmap1g !== null) {
      message.directmap1g = object.directmap1g;
    } else {
      message.directmap1g = 0;
    }
    return message;
  },
};

const baseHostnameResponse: object = {};

export const HostnameResponse = {
  encode(message: HostnameResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      Hostname.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): HostnameResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseHostnameResponse } as HostnameResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Hostname.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HostnameResponse {
    const message = { ...baseHostnameResponse } as HostnameResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Hostname.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: HostnameResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Hostname.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<HostnameResponse>): HostnameResponse {
    const message = { ...baseHostnameResponse } as HostnameResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(Hostname.fromPartial(e));
      }
    }
    return message;
  },
};

const baseHostname: object = { hostname: "" };

export const Hostname = {
  encode(message: Hostname, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.hostname !== "") {
      writer.uint32(18).string(message.hostname);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Hostname {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseHostname } as Hostname;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.hostname = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Hostname {
    const message = { ...baseHostname } as Hostname;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.hostname !== undefined && object.hostname !== null) {
      message.hostname = String(object.hostname);
    } else {
      message.hostname = "";
    }
    return message;
  },

  toJSON(message: Hostname): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.hostname !== undefined && (obj.hostname = message.hostname);
    return obj;
  },

  fromPartial(object: DeepPartial<Hostname>): Hostname {
    const message = { ...baseHostname } as Hostname;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.hostname !== undefined && object.hostname !== null) {
      message.hostname = object.hostname;
    } else {
      message.hostname = "";
    }
    return message;
  },
};

const baseLoadAvgResponse: object = {};

export const LoadAvgResponse = {
  encode(message: LoadAvgResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      LoadAvg.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): LoadAvgResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLoadAvgResponse } as LoadAvgResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(LoadAvg.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoadAvgResponse {
    const message = { ...baseLoadAvgResponse } as LoadAvgResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(LoadAvg.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: LoadAvgResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? LoadAvg.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<LoadAvgResponse>): LoadAvgResponse {
    const message = { ...baseLoadAvgResponse } as LoadAvgResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(LoadAvg.fromPartial(e));
      }
    }
    return message;
  },
};

const baseLoadAvg: object = { load1: 0, load5: 0, load15: 0 };

export const LoadAvg = {
  encode(message: LoadAvg, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.load1 !== 0) {
      writer.uint32(17).double(message.load1);
    }
    if (message.load5 !== 0) {
      writer.uint32(25).double(message.load5);
    }
    if (message.load15 !== 0) {
      writer.uint32(33).double(message.load15);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): LoadAvg {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLoadAvg } as LoadAvg;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.load1 = reader.double();
          break;
        case 3:
          message.load5 = reader.double();
          break;
        case 4:
          message.load15 = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoadAvg {
    const message = { ...baseLoadAvg } as LoadAvg;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.load1 !== undefined && object.load1 !== null) {
      message.load1 = Number(object.load1);
    } else {
      message.load1 = 0;
    }
    if (object.load5 !== undefined && object.load5 !== null) {
      message.load5 = Number(object.load5);
    } else {
      message.load5 = 0;
    }
    if (object.load15 !== undefined && object.load15 !== null) {
      message.load15 = Number(object.load15);
    } else {
      message.load15 = 0;
    }
    return message;
  },

  toJSON(message: LoadAvg): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.load1 !== undefined && (obj.load1 = message.load1);
    message.load5 !== undefined && (obj.load5 = message.load5);
    message.load15 !== undefined && (obj.load15 = message.load15);
    return obj;
  },

  fromPartial(object: DeepPartial<LoadAvg>): LoadAvg {
    const message = { ...baseLoadAvg } as LoadAvg;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.load1 !== undefined && object.load1 !== null) {
      message.load1 = object.load1;
    } else {
      message.load1 = 0;
    }
    if (object.load5 !== undefined && object.load5 !== null) {
      message.load5 = object.load5;
    } else {
      message.load5 = 0;
    }
    if (object.load15 !== undefined && object.load15 !== null) {
      message.load15 = object.load15;
    } else {
      message.load15 = 0;
    }
    return message;
  },
};

const baseSystemStatResponse: object = {};

export const SystemStatResponse = {
  encode(
    message: SystemStatResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      SystemStat.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SystemStatResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSystemStatResponse } as SystemStatResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(SystemStat.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SystemStatResponse {
    const message = { ...baseSystemStatResponse } as SystemStatResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(SystemStat.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: SystemStatResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? SystemStat.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SystemStatResponse>): SystemStatResponse {
    const message = { ...baseSystemStatResponse } as SystemStatResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(SystemStat.fromPartial(e));
      }
    }
    return message;
  },
};

const baseSystemStat: object = {
  boot_time: 0,
  irq_total: 0,
  irq: 0,
  context_switches: 0,
  process_created: 0,
  process_running: 0,
  process_blocked: 0,
  soft_irq_total: 0,
};

export const SystemStat = {
  encode(message: SystemStat, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.boot_time !== 0) {
      writer.uint32(16).uint64(message.boot_time);
    }
    if (message.cpu_total !== undefined) {
      CPUStat.encode(message.cpu_total, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.cpu) {
      CPUStat.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.irq_total !== 0) {
      writer.uint32(40).uint64(message.irq_total);
    }
    writer.uint32(50).fork();
    for (const v of message.irq) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.context_switches !== 0) {
      writer.uint32(56).uint64(message.context_switches);
    }
    if (message.process_created !== 0) {
      writer.uint32(64).uint64(message.process_created);
    }
    if (message.process_running !== 0) {
      writer.uint32(72).uint64(message.process_running);
    }
    if (message.process_blocked !== 0) {
      writer.uint32(80).uint64(message.process_blocked);
    }
    if (message.soft_irq_total !== 0) {
      writer.uint32(88).uint64(message.soft_irq_total);
    }
    if (message.soft_irq !== undefined) {
      SoftIRQStat.encode(message.soft_irq, writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SystemStat {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSystemStat } as SystemStat;
    message.cpu = [];
    message.irq = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.boot_time = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.cpu_total = CPUStat.decode(reader, reader.uint32());
          break;
        case 4:
          message.cpu.push(CPUStat.decode(reader, reader.uint32()));
          break;
        case 5:
          message.irq_total = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.irq.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.irq.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 7:
          message.context_switches = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.process_created = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.process_running = longToNumber(reader.uint64() as Long);
          break;
        case 10:
          message.process_blocked = longToNumber(reader.uint64() as Long);
          break;
        case 11:
          message.soft_irq_total = longToNumber(reader.uint64() as Long);
          break;
        case 12:
          message.soft_irq = SoftIRQStat.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SystemStat {
    const message = { ...baseSystemStat } as SystemStat;
    message.cpu = [];
    message.irq = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.boot_time !== undefined && object.boot_time !== null) {
      message.boot_time = Number(object.boot_time);
    } else {
      message.boot_time = 0;
    }
    if (object.cpu_total !== undefined && object.cpu_total !== null) {
      message.cpu_total = CPUStat.fromJSON(object.cpu_total);
    } else {
      message.cpu_total = undefined;
    }
    if (object.cpu !== undefined && object.cpu !== null) {
      for (const e of object.cpu) {
        message.cpu.push(CPUStat.fromJSON(e));
      }
    }
    if (object.irq_total !== undefined && object.irq_total !== null) {
      message.irq_total = Number(object.irq_total);
    } else {
      message.irq_total = 0;
    }
    if (object.irq !== undefined && object.irq !== null) {
      for (const e of object.irq) {
        message.irq.push(Number(e));
      }
    }
    if (
      object.context_switches !== undefined &&
      object.context_switches !== null
    ) {
      message.context_switches = Number(object.context_switches);
    } else {
      message.context_switches = 0;
    }
    if (
      object.process_created !== undefined &&
      object.process_created !== null
    ) {
      message.process_created = Number(object.process_created);
    } else {
      message.process_created = 0;
    }
    if (
      object.process_running !== undefined &&
      object.process_running !== null
    ) {
      message.process_running = Number(object.process_running);
    } else {
      message.process_running = 0;
    }
    if (
      object.process_blocked !== undefined &&
      object.process_blocked !== null
    ) {
      message.process_blocked = Number(object.process_blocked);
    } else {
      message.process_blocked = 0;
    }
    if (object.soft_irq_total !== undefined && object.soft_irq_total !== null) {
      message.soft_irq_total = Number(object.soft_irq_total);
    } else {
      message.soft_irq_total = 0;
    }
    if (object.soft_irq !== undefined && object.soft_irq !== null) {
      message.soft_irq = SoftIRQStat.fromJSON(object.soft_irq);
    } else {
      message.soft_irq = undefined;
    }
    return message;
  },

  toJSON(message: SystemStat): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.boot_time !== undefined && (obj.boot_time = message.boot_time);
    message.cpu_total !== undefined &&
      (obj.cpu_total = message.cpu_total
        ? CPUStat.toJSON(message.cpu_total)
        : undefined);
    if (message.cpu) {
      obj.cpu = message.cpu.map((e) => (e ? CPUStat.toJSON(e) : undefined));
    } else {
      obj.cpu = [];
    }
    message.irq_total !== undefined && (obj.irq_total = message.irq_total);
    if (message.irq) {
      obj.irq = message.irq.map((e) => e);
    } else {
      obj.irq = [];
    }
    message.context_switches !== undefined &&
      (obj.context_switches = message.context_switches);
    message.process_created !== undefined &&
      (obj.process_created = message.process_created);
    message.process_running !== undefined &&
      (obj.process_running = message.process_running);
    message.process_blocked !== undefined &&
      (obj.process_blocked = message.process_blocked);
    message.soft_irq_total !== undefined &&
      (obj.soft_irq_total = message.soft_irq_total);
    message.soft_irq !== undefined &&
      (obj.soft_irq = message.soft_irq
        ? SoftIRQStat.toJSON(message.soft_irq)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<SystemStat>): SystemStat {
    const message = { ...baseSystemStat } as SystemStat;
    message.cpu = [];
    message.irq = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.boot_time !== undefined && object.boot_time !== null) {
      message.boot_time = object.boot_time;
    } else {
      message.boot_time = 0;
    }
    if (object.cpu_total !== undefined && object.cpu_total !== null) {
      message.cpu_total = CPUStat.fromPartial(object.cpu_total);
    } else {
      message.cpu_total = undefined;
    }
    if (object.cpu !== undefined && object.cpu !== null) {
      for (const e of object.cpu) {
        message.cpu.push(CPUStat.fromPartial(e));
      }
    }
    if (object.irq_total !== undefined && object.irq_total !== null) {
      message.irq_total = object.irq_total;
    } else {
      message.irq_total = 0;
    }
    if (object.irq !== undefined && object.irq !== null) {
      for (const e of object.irq) {
        message.irq.push(e);
      }
    }
    if (
      object.context_switches !== undefined &&
      object.context_switches !== null
    ) {
      message.context_switches = object.context_switches;
    } else {
      message.context_switches = 0;
    }
    if (
      object.process_created !== undefined &&
      object.process_created !== null
    ) {
      message.process_created = object.process_created;
    } else {
      message.process_created = 0;
    }
    if (
      object.process_running !== undefined &&
      object.process_running !== null
    ) {
      message.process_running = object.process_running;
    } else {
      message.process_running = 0;
    }
    if (
      object.process_blocked !== undefined &&
      object.process_blocked !== null
    ) {
      message.process_blocked = object.process_blocked;
    } else {
      message.process_blocked = 0;
    }
    if (object.soft_irq_total !== undefined && object.soft_irq_total !== null) {
      message.soft_irq_total = object.soft_irq_total;
    } else {
      message.soft_irq_total = 0;
    }
    if (object.soft_irq !== undefined && object.soft_irq !== null) {
      message.soft_irq = SoftIRQStat.fromPartial(object.soft_irq);
    } else {
      message.soft_irq = undefined;
    }
    return message;
  },
};

const baseCPUStat: object = {
  user: 0,
  nice: 0,
  system: 0,
  idle: 0,
  iowait: 0,
  irq: 0,
  soft_irq: 0,
  steal: 0,
  guest: 0,
  guest_nice: 0,
};

export const CPUStat = {
  encode(message: CPUStat, writer: Writer = Writer.create()): Writer {
    if (message.user !== 0) {
      writer.uint32(9).double(message.user);
    }
    if (message.nice !== 0) {
      writer.uint32(17).double(message.nice);
    }
    if (message.system !== 0) {
      writer.uint32(25).double(message.system);
    }
    if (message.idle !== 0) {
      writer.uint32(33).double(message.idle);
    }
    if (message.iowait !== 0) {
      writer.uint32(41).double(message.iowait);
    }
    if (message.irq !== 0) {
      writer.uint32(49).double(message.irq);
    }
    if (message.soft_irq !== 0) {
      writer.uint32(57).double(message.soft_irq);
    }
    if (message.steal !== 0) {
      writer.uint32(65).double(message.steal);
    }
    if (message.guest !== 0) {
      writer.uint32(73).double(message.guest);
    }
    if (message.guest_nice !== 0) {
      writer.uint32(81).double(message.guest_nice);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CPUStat {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCPUStat } as CPUStat;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = reader.double();
          break;
        case 2:
          message.nice = reader.double();
          break;
        case 3:
          message.system = reader.double();
          break;
        case 4:
          message.idle = reader.double();
          break;
        case 5:
          message.iowait = reader.double();
          break;
        case 6:
          message.irq = reader.double();
          break;
        case 7:
          message.soft_irq = reader.double();
          break;
        case 8:
          message.steal = reader.double();
          break;
        case 9:
          message.guest = reader.double();
          break;
        case 10:
          message.guest_nice = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CPUStat {
    const message = { ...baseCPUStat } as CPUStat;
    if (object.user !== undefined && object.user !== null) {
      message.user = Number(object.user);
    } else {
      message.user = 0;
    }
    if (object.nice !== undefined && object.nice !== null) {
      message.nice = Number(object.nice);
    } else {
      message.nice = 0;
    }
    if (object.system !== undefined && object.system !== null) {
      message.system = Number(object.system);
    } else {
      message.system = 0;
    }
    if (object.idle !== undefined && object.idle !== null) {
      message.idle = Number(object.idle);
    } else {
      message.idle = 0;
    }
    if (object.iowait !== undefined && object.iowait !== null) {
      message.iowait = Number(object.iowait);
    } else {
      message.iowait = 0;
    }
    if (object.irq !== undefined && object.irq !== null) {
      message.irq = Number(object.irq);
    } else {
      message.irq = 0;
    }
    if (object.soft_irq !== undefined && object.soft_irq !== null) {
      message.soft_irq = Number(object.soft_irq);
    } else {
      message.soft_irq = 0;
    }
    if (object.steal !== undefined && object.steal !== null) {
      message.steal = Number(object.steal);
    } else {
      message.steal = 0;
    }
    if (object.guest !== undefined && object.guest !== null) {
      message.guest = Number(object.guest);
    } else {
      message.guest = 0;
    }
    if (object.guest_nice !== undefined && object.guest_nice !== null) {
      message.guest_nice = Number(object.guest_nice);
    } else {
      message.guest_nice = 0;
    }
    return message;
  },

  toJSON(message: CPUStat): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user);
    message.nice !== undefined && (obj.nice = message.nice);
    message.system !== undefined && (obj.system = message.system);
    message.idle !== undefined && (obj.idle = message.idle);
    message.iowait !== undefined && (obj.iowait = message.iowait);
    message.irq !== undefined && (obj.irq = message.irq);
    message.soft_irq !== undefined && (obj.soft_irq = message.soft_irq);
    message.steal !== undefined && (obj.steal = message.steal);
    message.guest !== undefined && (obj.guest = message.guest);
    message.guest_nice !== undefined && (obj.guest_nice = message.guest_nice);
    return obj;
  },

  fromPartial(object: DeepPartial<CPUStat>): CPUStat {
    const message = { ...baseCPUStat } as CPUStat;
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    } else {
      message.user = 0;
    }
    if (object.nice !== undefined && object.nice !== null) {
      message.nice = object.nice;
    } else {
      message.nice = 0;
    }
    if (object.system !== undefined && object.system !== null) {
      message.system = object.system;
    } else {
      message.system = 0;
    }
    if (object.idle !== undefined && object.idle !== null) {
      message.idle = object.idle;
    } else {
      message.idle = 0;
    }
    if (object.iowait !== undefined && object.iowait !== null) {
      message.iowait = object.iowait;
    } else {
      message.iowait = 0;
    }
    if (object.irq !== undefined && object.irq !== null) {
      message.irq = object.irq;
    } else {
      message.irq = 0;
    }
    if (object.soft_irq !== undefined && object.soft_irq !== null) {
      message.soft_irq = object.soft_irq;
    } else {
      message.soft_irq = 0;
    }
    if (object.steal !== undefined && object.steal !== null) {
      message.steal = object.steal;
    } else {
      message.steal = 0;
    }
    if (object.guest !== undefined && object.guest !== null) {
      message.guest = object.guest;
    } else {
      message.guest = 0;
    }
    if (object.guest_nice !== undefined && object.guest_nice !== null) {
      message.guest_nice = object.guest_nice;
    } else {
      message.guest_nice = 0;
    }
    return message;
  },
};

const baseSoftIRQStat: object = {
  hi: 0,
  timer: 0,
  net_tx: 0,
  net_rx: 0,
  block: 0,
  block_io_poll: 0,
  tasklet: 0,
  sched: 0,
  hrtimer: 0,
  rcu: 0,
};

export const SoftIRQStat = {
  encode(message: SoftIRQStat, writer: Writer = Writer.create()): Writer {
    if (message.hi !== 0) {
      writer.uint32(8).uint64(message.hi);
    }
    if (message.timer !== 0) {
      writer.uint32(16).uint64(message.timer);
    }
    if (message.net_tx !== 0) {
      writer.uint32(24).uint64(message.net_tx);
    }
    if (message.net_rx !== 0) {
      writer.uint32(32).uint64(message.net_rx);
    }
    if (message.block !== 0) {
      writer.uint32(40).uint64(message.block);
    }
    if (message.block_io_poll !== 0) {
      writer.uint32(48).uint64(message.block_io_poll);
    }
    if (message.tasklet !== 0) {
      writer.uint32(56).uint64(message.tasklet);
    }
    if (message.sched !== 0) {
      writer.uint32(64).uint64(message.sched);
    }
    if (message.hrtimer !== 0) {
      writer.uint32(72).uint64(message.hrtimer);
    }
    if (message.rcu !== 0) {
      writer.uint32(80).uint64(message.rcu);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SoftIRQStat {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSoftIRQStat } as SoftIRQStat;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hi = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.timer = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.net_tx = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.net_rx = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.block = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.block_io_poll = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.tasklet = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.sched = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.hrtimer = longToNumber(reader.uint64() as Long);
          break;
        case 10:
          message.rcu = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SoftIRQStat {
    const message = { ...baseSoftIRQStat } as SoftIRQStat;
    if (object.hi !== undefined && object.hi !== null) {
      message.hi = Number(object.hi);
    } else {
      message.hi = 0;
    }
    if (object.timer !== undefined && object.timer !== null) {
      message.timer = Number(object.timer);
    } else {
      message.timer = 0;
    }
    if (object.net_tx !== undefined && object.net_tx !== null) {
      message.net_tx = Number(object.net_tx);
    } else {
      message.net_tx = 0;
    }
    if (object.net_rx !== undefined && object.net_rx !== null) {
      message.net_rx = Number(object.net_rx);
    } else {
      message.net_rx = 0;
    }
    if (object.block !== undefined && object.block !== null) {
      message.block = Number(object.block);
    } else {
      message.block = 0;
    }
    if (object.block_io_poll !== undefined && object.block_io_poll !== null) {
      message.block_io_poll = Number(object.block_io_poll);
    } else {
      message.block_io_poll = 0;
    }
    if (object.tasklet !== undefined && object.tasklet !== null) {
      message.tasklet = Number(object.tasklet);
    } else {
      message.tasklet = 0;
    }
    if (object.sched !== undefined && object.sched !== null) {
      message.sched = Number(object.sched);
    } else {
      message.sched = 0;
    }
    if (object.hrtimer !== undefined && object.hrtimer !== null) {
      message.hrtimer = Number(object.hrtimer);
    } else {
      message.hrtimer = 0;
    }
    if (object.rcu !== undefined && object.rcu !== null) {
      message.rcu = Number(object.rcu);
    } else {
      message.rcu = 0;
    }
    return message;
  },

  toJSON(message: SoftIRQStat): unknown {
    const obj: any = {};
    message.hi !== undefined && (obj.hi = message.hi);
    message.timer !== undefined && (obj.timer = message.timer);
    message.net_tx !== undefined && (obj.net_tx = message.net_tx);
    message.net_rx !== undefined && (obj.net_rx = message.net_rx);
    message.block !== undefined && (obj.block = message.block);
    message.block_io_poll !== undefined &&
      (obj.block_io_poll = message.block_io_poll);
    message.tasklet !== undefined && (obj.tasklet = message.tasklet);
    message.sched !== undefined && (obj.sched = message.sched);
    message.hrtimer !== undefined && (obj.hrtimer = message.hrtimer);
    message.rcu !== undefined && (obj.rcu = message.rcu);
    return obj;
  },

  fromPartial(object: DeepPartial<SoftIRQStat>): SoftIRQStat {
    const message = { ...baseSoftIRQStat } as SoftIRQStat;
    if (object.hi !== undefined && object.hi !== null) {
      message.hi = object.hi;
    } else {
      message.hi = 0;
    }
    if (object.timer !== undefined && object.timer !== null) {
      message.timer = object.timer;
    } else {
      message.timer = 0;
    }
    if (object.net_tx !== undefined && object.net_tx !== null) {
      message.net_tx = object.net_tx;
    } else {
      message.net_tx = 0;
    }
    if (object.net_rx !== undefined && object.net_rx !== null) {
      message.net_rx = object.net_rx;
    } else {
      message.net_rx = 0;
    }
    if (object.block !== undefined && object.block !== null) {
      message.block = object.block;
    } else {
      message.block = 0;
    }
    if (object.block_io_poll !== undefined && object.block_io_poll !== null) {
      message.block_io_poll = object.block_io_poll;
    } else {
      message.block_io_poll = 0;
    }
    if (object.tasklet !== undefined && object.tasklet !== null) {
      message.tasklet = object.tasklet;
    } else {
      message.tasklet = 0;
    }
    if (object.sched !== undefined && object.sched !== null) {
      message.sched = object.sched;
    } else {
      message.sched = 0;
    }
    if (object.hrtimer !== undefined && object.hrtimer !== null) {
      message.hrtimer = object.hrtimer;
    } else {
      message.hrtimer = 0;
    }
    if (object.rcu !== undefined && object.rcu !== null) {
      message.rcu = object.rcu;
    } else {
      message.rcu = 0;
    }
    return message;
  },
};

const baseCPUInfoResponse: object = {};

export const CPUInfoResponse = {
  encode(message: CPUInfoResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      CPUsInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CPUInfoResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCPUInfoResponse } as CPUInfoResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(CPUsInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CPUInfoResponse {
    const message = { ...baseCPUInfoResponse } as CPUInfoResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(CPUsInfo.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: CPUInfoResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? CPUsInfo.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<CPUInfoResponse>): CPUInfoResponse {
    const message = { ...baseCPUInfoResponse } as CPUInfoResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(CPUsInfo.fromPartial(e));
      }
    }
    return message;
  },
};

const baseCPUsInfo: object = {};

export const CPUsInfo = {
  encode(message: CPUsInfo, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.cpu_info) {
      CPUInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CPUsInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCPUsInfo } as CPUsInfo;
    message.cpu_info = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.cpu_info.push(CPUInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CPUsInfo {
    const message = { ...baseCPUsInfo } as CPUsInfo;
    message.cpu_info = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.cpu_info !== undefined && object.cpu_info !== null) {
      for (const e of object.cpu_info) {
        message.cpu_info.push(CPUInfo.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: CPUsInfo): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    if (message.cpu_info) {
      obj.cpu_info = message.cpu_info.map((e) =>
        e ? CPUInfo.toJSON(e) : undefined
      );
    } else {
      obj.cpu_info = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<CPUsInfo>): CPUsInfo {
    const message = { ...baseCPUsInfo } as CPUsInfo;
    message.cpu_info = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.cpu_info !== undefined && object.cpu_info !== null) {
      for (const e of object.cpu_info) {
        message.cpu_info.push(CPUInfo.fromPartial(e));
      }
    }
    return message;
  },
};

const baseCPUInfo: object = {
  processor: 0,
  vendor_id: "",
  cpu_family: "",
  model: "",
  model_name: "",
  stepping: "",
  microcode: "",
  cpu_mhz: 0,
  cache_size: "",
  physical_id: "",
  siblings: 0,
  core_id: "",
  cpu_cores: 0,
  apic_id: "",
  initial_apic_id: "",
  fpu: "",
  fpu_exception: "",
  cpu_id_level: 0,
  wp: "",
  flags: "",
  bugs: "",
  bogo_mips: 0,
  cl_flush_size: 0,
  cache_alignment: 0,
  address_sizes: "",
  power_management: "",
};

export const CPUInfo = {
  encode(message: CPUInfo, writer: Writer = Writer.create()): Writer {
    if (message.processor !== 0) {
      writer.uint32(8).uint32(message.processor);
    }
    if (message.vendor_id !== "") {
      writer.uint32(18).string(message.vendor_id);
    }
    if (message.cpu_family !== "") {
      writer.uint32(26).string(message.cpu_family);
    }
    if (message.model !== "") {
      writer.uint32(34).string(message.model);
    }
    if (message.model_name !== "") {
      writer.uint32(42).string(message.model_name);
    }
    if (message.stepping !== "") {
      writer.uint32(50).string(message.stepping);
    }
    if (message.microcode !== "") {
      writer.uint32(58).string(message.microcode);
    }
    if (message.cpu_mhz !== 0) {
      writer.uint32(65).double(message.cpu_mhz);
    }
    if (message.cache_size !== "") {
      writer.uint32(74).string(message.cache_size);
    }
    if (message.physical_id !== "") {
      writer.uint32(82).string(message.physical_id);
    }
    if (message.siblings !== 0) {
      writer.uint32(88).uint32(message.siblings);
    }
    if (message.core_id !== "") {
      writer.uint32(98).string(message.core_id);
    }
    if (message.cpu_cores !== 0) {
      writer.uint32(104).uint32(message.cpu_cores);
    }
    if (message.apic_id !== "") {
      writer.uint32(114).string(message.apic_id);
    }
    if (message.initial_apic_id !== "") {
      writer.uint32(122).string(message.initial_apic_id);
    }
    if (message.fpu !== "") {
      writer.uint32(130).string(message.fpu);
    }
    if (message.fpu_exception !== "") {
      writer.uint32(138).string(message.fpu_exception);
    }
    if (message.cpu_id_level !== 0) {
      writer.uint32(144).uint32(message.cpu_id_level);
    }
    if (message.wp !== "") {
      writer.uint32(154).string(message.wp);
    }
    for (const v of message.flags) {
      writer.uint32(162).string(v!);
    }
    for (const v of message.bugs) {
      writer.uint32(170).string(v!);
    }
    if (message.bogo_mips !== 0) {
      writer.uint32(177).double(message.bogo_mips);
    }
    if (message.cl_flush_size !== 0) {
      writer.uint32(184).uint32(message.cl_flush_size);
    }
    if (message.cache_alignment !== 0) {
      writer.uint32(192).uint32(message.cache_alignment);
    }
    if (message.address_sizes !== "") {
      writer.uint32(202).string(message.address_sizes);
    }
    if (message.power_management !== "") {
      writer.uint32(210).string(message.power_management);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CPUInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCPUInfo } as CPUInfo;
    message.flags = [];
    message.bugs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.processor = reader.uint32();
          break;
        case 2:
          message.vendor_id = reader.string();
          break;
        case 3:
          message.cpu_family = reader.string();
          break;
        case 4:
          message.model = reader.string();
          break;
        case 5:
          message.model_name = reader.string();
          break;
        case 6:
          message.stepping = reader.string();
          break;
        case 7:
          message.microcode = reader.string();
          break;
        case 8:
          message.cpu_mhz = reader.double();
          break;
        case 9:
          message.cache_size = reader.string();
          break;
        case 10:
          message.physical_id = reader.string();
          break;
        case 11:
          message.siblings = reader.uint32();
          break;
        case 12:
          message.core_id = reader.string();
          break;
        case 13:
          message.cpu_cores = reader.uint32();
          break;
        case 14:
          message.apic_id = reader.string();
          break;
        case 15:
          message.initial_apic_id = reader.string();
          break;
        case 16:
          message.fpu = reader.string();
          break;
        case 17:
          message.fpu_exception = reader.string();
          break;
        case 18:
          message.cpu_id_level = reader.uint32();
          break;
        case 19:
          message.wp = reader.string();
          break;
        case 20:
          message.flags.push(reader.string());
          break;
        case 21:
          message.bugs.push(reader.string());
          break;
        case 22:
          message.bogo_mips = reader.double();
          break;
        case 23:
          message.cl_flush_size = reader.uint32();
          break;
        case 24:
          message.cache_alignment = reader.uint32();
          break;
        case 25:
          message.address_sizes = reader.string();
          break;
        case 26:
          message.power_management = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CPUInfo {
    const message = { ...baseCPUInfo } as CPUInfo;
    message.flags = [];
    message.bugs = [];
    if (object.processor !== undefined && object.processor !== null) {
      message.processor = Number(object.processor);
    } else {
      message.processor = 0;
    }
    if (object.vendor_id !== undefined && object.vendor_id !== null) {
      message.vendor_id = String(object.vendor_id);
    } else {
      message.vendor_id = "";
    }
    if (object.cpu_family !== undefined && object.cpu_family !== null) {
      message.cpu_family = String(object.cpu_family);
    } else {
      message.cpu_family = "";
    }
    if (object.model !== undefined && object.model !== null) {
      message.model = String(object.model);
    } else {
      message.model = "";
    }
    if (object.model_name !== undefined && object.model_name !== null) {
      message.model_name = String(object.model_name);
    } else {
      message.model_name = "";
    }
    if (object.stepping !== undefined && object.stepping !== null) {
      message.stepping = String(object.stepping);
    } else {
      message.stepping = "";
    }
    if (object.microcode !== undefined && object.microcode !== null) {
      message.microcode = String(object.microcode);
    } else {
      message.microcode = "";
    }
    if (object.cpu_mhz !== undefined && object.cpu_mhz !== null) {
      message.cpu_mhz = Number(object.cpu_mhz);
    } else {
      message.cpu_mhz = 0;
    }
    if (object.cache_size !== undefined && object.cache_size !== null) {
      message.cache_size = String(object.cache_size);
    } else {
      message.cache_size = "";
    }
    if (object.physical_id !== undefined && object.physical_id !== null) {
      message.physical_id = String(object.physical_id);
    } else {
      message.physical_id = "";
    }
    if (object.siblings !== undefined && object.siblings !== null) {
      message.siblings = Number(object.siblings);
    } else {
      message.siblings = 0;
    }
    if (object.core_id !== undefined && object.core_id !== null) {
      message.core_id = String(object.core_id);
    } else {
      message.core_id = "";
    }
    if (object.cpu_cores !== undefined && object.cpu_cores !== null) {
      message.cpu_cores = Number(object.cpu_cores);
    } else {
      message.cpu_cores = 0;
    }
    if (object.apic_id !== undefined && object.apic_id !== null) {
      message.apic_id = String(object.apic_id);
    } else {
      message.apic_id = "";
    }
    if (
      object.initial_apic_id !== undefined &&
      object.initial_apic_id !== null
    ) {
      message.initial_apic_id = String(object.initial_apic_id);
    } else {
      message.initial_apic_id = "";
    }
    if (object.fpu !== undefined && object.fpu !== null) {
      message.fpu = String(object.fpu);
    } else {
      message.fpu = "";
    }
    if (object.fpu_exception !== undefined && object.fpu_exception !== null) {
      message.fpu_exception = String(object.fpu_exception);
    } else {
      message.fpu_exception = "";
    }
    if (object.cpu_id_level !== undefined && object.cpu_id_level !== null) {
      message.cpu_id_level = Number(object.cpu_id_level);
    } else {
      message.cpu_id_level = 0;
    }
    if (object.wp !== undefined && object.wp !== null) {
      message.wp = String(object.wp);
    } else {
      message.wp = "";
    }
    if (object.flags !== undefined && object.flags !== null) {
      for (const e of object.flags) {
        message.flags.push(String(e));
      }
    }
    if (object.bugs !== undefined && object.bugs !== null) {
      for (const e of object.bugs) {
        message.bugs.push(String(e));
      }
    }
    if (object.bogo_mips !== undefined && object.bogo_mips !== null) {
      message.bogo_mips = Number(object.bogo_mips);
    } else {
      message.bogo_mips = 0;
    }
    if (object.cl_flush_size !== undefined && object.cl_flush_size !== null) {
      message.cl_flush_size = Number(object.cl_flush_size);
    } else {
      message.cl_flush_size = 0;
    }
    if (
      object.cache_alignment !== undefined &&
      object.cache_alignment !== null
    ) {
      message.cache_alignment = Number(object.cache_alignment);
    } else {
      message.cache_alignment = 0;
    }
    if (object.address_sizes !== undefined && object.address_sizes !== null) {
      message.address_sizes = String(object.address_sizes);
    } else {
      message.address_sizes = "";
    }
    if (
      object.power_management !== undefined &&
      object.power_management !== null
    ) {
      message.power_management = String(object.power_management);
    } else {
      message.power_management = "";
    }
    return message;
  },

  toJSON(message: CPUInfo): unknown {
    const obj: any = {};
    message.processor !== undefined && (obj.processor = message.processor);
    message.vendor_id !== undefined && (obj.vendor_id = message.vendor_id);
    message.cpu_family !== undefined && (obj.cpu_family = message.cpu_family);
    message.model !== undefined && (obj.model = message.model);
    message.model_name !== undefined && (obj.model_name = message.model_name);
    message.stepping !== undefined && (obj.stepping = message.stepping);
    message.microcode !== undefined && (obj.microcode = message.microcode);
    message.cpu_mhz !== undefined && (obj.cpu_mhz = message.cpu_mhz);
    message.cache_size !== undefined && (obj.cache_size = message.cache_size);
    message.physical_id !== undefined &&
      (obj.physical_id = message.physical_id);
    message.siblings !== undefined && (obj.siblings = message.siblings);
    message.core_id !== undefined && (obj.core_id = message.core_id);
    message.cpu_cores !== undefined && (obj.cpu_cores = message.cpu_cores);
    message.apic_id !== undefined && (obj.apic_id = message.apic_id);
    message.initial_apic_id !== undefined &&
      (obj.initial_apic_id = message.initial_apic_id);
    message.fpu !== undefined && (obj.fpu = message.fpu);
    message.fpu_exception !== undefined &&
      (obj.fpu_exception = message.fpu_exception);
    message.cpu_id_level !== undefined &&
      (obj.cpu_id_level = message.cpu_id_level);
    message.wp !== undefined && (obj.wp = message.wp);
    if (message.flags) {
      obj.flags = message.flags.map((e) => e);
    } else {
      obj.flags = [];
    }
    if (message.bugs) {
      obj.bugs = message.bugs.map((e) => e);
    } else {
      obj.bugs = [];
    }
    message.bogo_mips !== undefined && (obj.bogo_mips = message.bogo_mips);
    message.cl_flush_size !== undefined &&
      (obj.cl_flush_size = message.cl_flush_size);
    message.cache_alignment !== undefined &&
      (obj.cache_alignment = message.cache_alignment);
    message.address_sizes !== undefined &&
      (obj.address_sizes = message.address_sizes);
    message.power_management !== undefined &&
      (obj.power_management = message.power_management);
    return obj;
  },

  fromPartial(object: DeepPartial<CPUInfo>): CPUInfo {
    const message = { ...baseCPUInfo } as CPUInfo;
    message.flags = [];
    message.bugs = [];
    if (object.processor !== undefined && object.processor !== null) {
      message.processor = object.processor;
    } else {
      message.processor = 0;
    }
    if (object.vendor_id !== undefined && object.vendor_id !== null) {
      message.vendor_id = object.vendor_id;
    } else {
      message.vendor_id = "";
    }
    if (object.cpu_family !== undefined && object.cpu_family !== null) {
      message.cpu_family = object.cpu_family;
    } else {
      message.cpu_family = "";
    }
    if (object.model !== undefined && object.model !== null) {
      message.model = object.model;
    } else {
      message.model = "";
    }
    if (object.model_name !== undefined && object.model_name !== null) {
      message.model_name = object.model_name;
    } else {
      message.model_name = "";
    }
    if (object.stepping !== undefined && object.stepping !== null) {
      message.stepping = object.stepping;
    } else {
      message.stepping = "";
    }
    if (object.microcode !== undefined && object.microcode !== null) {
      message.microcode = object.microcode;
    } else {
      message.microcode = "";
    }
    if (object.cpu_mhz !== undefined && object.cpu_mhz !== null) {
      message.cpu_mhz = object.cpu_mhz;
    } else {
      message.cpu_mhz = 0;
    }
    if (object.cache_size !== undefined && object.cache_size !== null) {
      message.cache_size = object.cache_size;
    } else {
      message.cache_size = "";
    }
    if (object.physical_id !== undefined && object.physical_id !== null) {
      message.physical_id = object.physical_id;
    } else {
      message.physical_id = "";
    }
    if (object.siblings !== undefined && object.siblings !== null) {
      message.siblings = object.siblings;
    } else {
      message.siblings = 0;
    }
    if (object.core_id !== undefined && object.core_id !== null) {
      message.core_id = object.core_id;
    } else {
      message.core_id = "";
    }
    if (object.cpu_cores !== undefined && object.cpu_cores !== null) {
      message.cpu_cores = object.cpu_cores;
    } else {
      message.cpu_cores = 0;
    }
    if (object.apic_id !== undefined && object.apic_id !== null) {
      message.apic_id = object.apic_id;
    } else {
      message.apic_id = "";
    }
    if (
      object.initial_apic_id !== undefined &&
      object.initial_apic_id !== null
    ) {
      message.initial_apic_id = object.initial_apic_id;
    } else {
      message.initial_apic_id = "";
    }
    if (object.fpu !== undefined && object.fpu !== null) {
      message.fpu = object.fpu;
    } else {
      message.fpu = "";
    }
    if (object.fpu_exception !== undefined && object.fpu_exception !== null) {
      message.fpu_exception = object.fpu_exception;
    } else {
      message.fpu_exception = "";
    }
    if (object.cpu_id_level !== undefined && object.cpu_id_level !== null) {
      message.cpu_id_level = object.cpu_id_level;
    } else {
      message.cpu_id_level = 0;
    }
    if (object.wp !== undefined && object.wp !== null) {
      message.wp = object.wp;
    } else {
      message.wp = "";
    }
    if (object.flags !== undefined && object.flags !== null) {
      for (const e of object.flags) {
        message.flags.push(e);
      }
    }
    if (object.bugs !== undefined && object.bugs !== null) {
      for (const e of object.bugs) {
        message.bugs.push(e);
      }
    }
    if (object.bogo_mips !== undefined && object.bogo_mips !== null) {
      message.bogo_mips = object.bogo_mips;
    } else {
      message.bogo_mips = 0;
    }
    if (object.cl_flush_size !== undefined && object.cl_flush_size !== null) {
      message.cl_flush_size = object.cl_flush_size;
    } else {
      message.cl_flush_size = 0;
    }
    if (
      object.cache_alignment !== undefined &&
      object.cache_alignment !== null
    ) {
      message.cache_alignment = object.cache_alignment;
    } else {
      message.cache_alignment = 0;
    }
    if (object.address_sizes !== undefined && object.address_sizes !== null) {
      message.address_sizes = object.address_sizes;
    } else {
      message.address_sizes = "";
    }
    if (
      object.power_management !== undefined &&
      object.power_management !== null
    ) {
      message.power_management = object.power_management;
    } else {
      message.power_management = "";
    }
    return message;
  },
};

const baseNetworkDeviceStatsResponse: object = {};

export const NetworkDeviceStatsResponse = {
  encode(
    message: NetworkDeviceStatsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      NetworkDeviceStats.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): NetworkDeviceStatsResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseNetworkDeviceStatsResponse,
    } as NetworkDeviceStatsResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(
            NetworkDeviceStats.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetworkDeviceStatsResponse {
    const message = {
      ...baseNetworkDeviceStatsResponse,
    } as NetworkDeviceStatsResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(NetworkDeviceStats.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: NetworkDeviceStatsResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? NetworkDeviceStats.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<NetworkDeviceStatsResponse>
  ): NetworkDeviceStatsResponse {
    const message = {
      ...baseNetworkDeviceStatsResponse,
    } as NetworkDeviceStatsResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(NetworkDeviceStats.fromPartial(e));
      }
    }
    return message;
  },
};

const baseNetworkDeviceStats: object = {};

export const NetworkDeviceStats = {
  encode(
    message: NetworkDeviceStats,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.total !== undefined) {
      NetDev.encode(message.total, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.devices) {
      NetDev.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NetworkDeviceStats {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNetworkDeviceStats } as NetworkDeviceStats;
    message.devices = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.total = NetDev.decode(reader, reader.uint32());
          break;
        case 3:
          message.devices.push(NetDev.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetworkDeviceStats {
    const message = { ...baseNetworkDeviceStats } as NetworkDeviceStats;
    message.devices = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = NetDev.fromJSON(object.total);
    } else {
      message.total = undefined;
    }
    if (object.devices !== undefined && object.devices !== null) {
      for (const e of object.devices) {
        message.devices.push(NetDev.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: NetworkDeviceStats): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.total !== undefined &&
      (obj.total = message.total ? NetDev.toJSON(message.total) : undefined);
    if (message.devices) {
      obj.devices = message.devices.map((e) =>
        e ? NetDev.toJSON(e) : undefined
      );
    } else {
      obj.devices = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<NetworkDeviceStats>): NetworkDeviceStats {
    const message = { ...baseNetworkDeviceStats } as NetworkDeviceStats;
    message.devices = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = NetDev.fromPartial(object.total);
    } else {
      message.total = undefined;
    }
    if (object.devices !== undefined && object.devices !== null) {
      for (const e of object.devices) {
        message.devices.push(NetDev.fromPartial(e));
      }
    }
    return message;
  },
};

const baseNetDev: object = {
  name: "",
  rx_bytes: 0,
  rx_packets: 0,
  rx_errors: 0,
  rx_dropped: 0,
  rx_fifo: 0,
  rx_frame: 0,
  rx_compressed: 0,
  rx_multicast: 0,
  tx_bytes: 0,
  tx_packets: 0,
  tx_errors: 0,
  tx_dropped: 0,
  tx_fifo: 0,
  tx_collisions: 0,
  tx_carrier: 0,
  tx_compressed: 0,
};

export const NetDev = {
  encode(message: NetDev, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.rx_bytes !== 0) {
      writer.uint32(16).uint64(message.rx_bytes);
    }
    if (message.rx_packets !== 0) {
      writer.uint32(24).uint64(message.rx_packets);
    }
    if (message.rx_errors !== 0) {
      writer.uint32(32).uint64(message.rx_errors);
    }
    if (message.rx_dropped !== 0) {
      writer.uint32(40).uint64(message.rx_dropped);
    }
    if (message.rx_fifo !== 0) {
      writer.uint32(48).uint64(message.rx_fifo);
    }
    if (message.rx_frame !== 0) {
      writer.uint32(56).uint64(message.rx_frame);
    }
    if (message.rx_compressed !== 0) {
      writer.uint32(64).uint64(message.rx_compressed);
    }
    if (message.rx_multicast !== 0) {
      writer.uint32(72).uint64(message.rx_multicast);
    }
    if (message.tx_bytes !== 0) {
      writer.uint32(80).uint64(message.tx_bytes);
    }
    if (message.tx_packets !== 0) {
      writer.uint32(88).uint64(message.tx_packets);
    }
    if (message.tx_errors !== 0) {
      writer.uint32(96).uint64(message.tx_errors);
    }
    if (message.tx_dropped !== 0) {
      writer.uint32(104).uint64(message.tx_dropped);
    }
    if (message.tx_fifo !== 0) {
      writer.uint32(112).uint64(message.tx_fifo);
    }
    if (message.tx_collisions !== 0) {
      writer.uint32(120).uint64(message.tx_collisions);
    }
    if (message.tx_carrier !== 0) {
      writer.uint32(128).uint64(message.tx_carrier);
    }
    if (message.tx_compressed !== 0) {
      writer.uint32(136).uint64(message.tx_compressed);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NetDev {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNetDev } as NetDev;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.rx_bytes = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.rx_packets = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.rx_errors = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.rx_dropped = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.rx_fifo = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.rx_frame = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.rx_compressed = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.rx_multicast = longToNumber(reader.uint64() as Long);
          break;
        case 10:
          message.tx_bytes = longToNumber(reader.uint64() as Long);
          break;
        case 11:
          message.tx_packets = longToNumber(reader.uint64() as Long);
          break;
        case 12:
          message.tx_errors = longToNumber(reader.uint64() as Long);
          break;
        case 13:
          message.tx_dropped = longToNumber(reader.uint64() as Long);
          break;
        case 14:
          message.tx_fifo = longToNumber(reader.uint64() as Long);
          break;
        case 15:
          message.tx_collisions = longToNumber(reader.uint64() as Long);
          break;
        case 16:
          message.tx_carrier = longToNumber(reader.uint64() as Long);
          break;
        case 17:
          message.tx_compressed = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetDev {
    const message = { ...baseNetDev } as NetDev;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.rx_bytes !== undefined && object.rx_bytes !== null) {
      message.rx_bytes = Number(object.rx_bytes);
    } else {
      message.rx_bytes = 0;
    }
    if (object.rx_packets !== undefined && object.rx_packets !== null) {
      message.rx_packets = Number(object.rx_packets);
    } else {
      message.rx_packets = 0;
    }
    if (object.rx_errors !== undefined && object.rx_errors !== null) {
      message.rx_errors = Number(object.rx_errors);
    } else {
      message.rx_errors = 0;
    }
    if (object.rx_dropped !== undefined && object.rx_dropped !== null) {
      message.rx_dropped = Number(object.rx_dropped);
    } else {
      message.rx_dropped = 0;
    }
    if (object.rx_fifo !== undefined && object.rx_fifo !== null) {
      message.rx_fifo = Number(object.rx_fifo);
    } else {
      message.rx_fifo = 0;
    }
    if (object.rx_frame !== undefined && object.rx_frame !== null) {
      message.rx_frame = Number(object.rx_frame);
    } else {
      message.rx_frame = 0;
    }
    if (object.rx_compressed !== undefined && object.rx_compressed !== null) {
      message.rx_compressed = Number(object.rx_compressed);
    } else {
      message.rx_compressed = 0;
    }
    if (object.rx_multicast !== undefined && object.rx_multicast !== null) {
      message.rx_multicast = Number(object.rx_multicast);
    } else {
      message.rx_multicast = 0;
    }
    if (object.tx_bytes !== undefined && object.tx_bytes !== null) {
      message.tx_bytes = Number(object.tx_bytes);
    } else {
      message.tx_bytes = 0;
    }
    if (object.tx_packets !== undefined && object.tx_packets !== null) {
      message.tx_packets = Number(object.tx_packets);
    } else {
      message.tx_packets = 0;
    }
    if (object.tx_errors !== undefined && object.tx_errors !== null) {
      message.tx_errors = Number(object.tx_errors);
    } else {
      message.tx_errors = 0;
    }
    if (object.tx_dropped !== undefined && object.tx_dropped !== null) {
      message.tx_dropped = Number(object.tx_dropped);
    } else {
      message.tx_dropped = 0;
    }
    if (object.tx_fifo !== undefined && object.tx_fifo !== null) {
      message.tx_fifo = Number(object.tx_fifo);
    } else {
      message.tx_fifo = 0;
    }
    if (object.tx_collisions !== undefined && object.tx_collisions !== null) {
      message.tx_collisions = Number(object.tx_collisions);
    } else {
      message.tx_collisions = 0;
    }
    if (object.tx_carrier !== undefined && object.tx_carrier !== null) {
      message.tx_carrier = Number(object.tx_carrier);
    } else {
      message.tx_carrier = 0;
    }
    if (object.tx_compressed !== undefined && object.tx_compressed !== null) {
      message.tx_compressed = Number(object.tx_compressed);
    } else {
      message.tx_compressed = 0;
    }
    return message;
  },

  toJSON(message: NetDev): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.rx_bytes !== undefined && (obj.rx_bytes = message.rx_bytes);
    message.rx_packets !== undefined && (obj.rx_packets = message.rx_packets);
    message.rx_errors !== undefined && (obj.rx_errors = message.rx_errors);
    message.rx_dropped !== undefined && (obj.rx_dropped = message.rx_dropped);
    message.rx_fifo !== undefined && (obj.rx_fifo = message.rx_fifo);
    message.rx_frame !== undefined && (obj.rx_frame = message.rx_frame);
    message.rx_compressed !== undefined &&
      (obj.rx_compressed = message.rx_compressed);
    message.rx_multicast !== undefined &&
      (obj.rx_multicast = message.rx_multicast);
    message.tx_bytes !== undefined && (obj.tx_bytes = message.tx_bytes);
    message.tx_packets !== undefined && (obj.tx_packets = message.tx_packets);
    message.tx_errors !== undefined && (obj.tx_errors = message.tx_errors);
    message.tx_dropped !== undefined && (obj.tx_dropped = message.tx_dropped);
    message.tx_fifo !== undefined && (obj.tx_fifo = message.tx_fifo);
    message.tx_collisions !== undefined &&
      (obj.tx_collisions = message.tx_collisions);
    message.tx_carrier !== undefined && (obj.tx_carrier = message.tx_carrier);
    message.tx_compressed !== undefined &&
      (obj.tx_compressed = message.tx_compressed);
    return obj;
  },

  fromPartial(object: DeepPartial<NetDev>): NetDev {
    const message = { ...baseNetDev } as NetDev;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.rx_bytes !== undefined && object.rx_bytes !== null) {
      message.rx_bytes = object.rx_bytes;
    } else {
      message.rx_bytes = 0;
    }
    if (object.rx_packets !== undefined && object.rx_packets !== null) {
      message.rx_packets = object.rx_packets;
    } else {
      message.rx_packets = 0;
    }
    if (object.rx_errors !== undefined && object.rx_errors !== null) {
      message.rx_errors = object.rx_errors;
    } else {
      message.rx_errors = 0;
    }
    if (object.rx_dropped !== undefined && object.rx_dropped !== null) {
      message.rx_dropped = object.rx_dropped;
    } else {
      message.rx_dropped = 0;
    }
    if (object.rx_fifo !== undefined && object.rx_fifo !== null) {
      message.rx_fifo = object.rx_fifo;
    } else {
      message.rx_fifo = 0;
    }
    if (object.rx_frame !== undefined && object.rx_frame !== null) {
      message.rx_frame = object.rx_frame;
    } else {
      message.rx_frame = 0;
    }
    if (object.rx_compressed !== undefined && object.rx_compressed !== null) {
      message.rx_compressed = object.rx_compressed;
    } else {
      message.rx_compressed = 0;
    }
    if (object.rx_multicast !== undefined && object.rx_multicast !== null) {
      message.rx_multicast = object.rx_multicast;
    } else {
      message.rx_multicast = 0;
    }
    if (object.tx_bytes !== undefined && object.tx_bytes !== null) {
      message.tx_bytes = object.tx_bytes;
    } else {
      message.tx_bytes = 0;
    }
    if (object.tx_packets !== undefined && object.tx_packets !== null) {
      message.tx_packets = object.tx_packets;
    } else {
      message.tx_packets = 0;
    }
    if (object.tx_errors !== undefined && object.tx_errors !== null) {
      message.tx_errors = object.tx_errors;
    } else {
      message.tx_errors = 0;
    }
    if (object.tx_dropped !== undefined && object.tx_dropped !== null) {
      message.tx_dropped = object.tx_dropped;
    } else {
      message.tx_dropped = 0;
    }
    if (object.tx_fifo !== undefined && object.tx_fifo !== null) {
      message.tx_fifo = object.tx_fifo;
    } else {
      message.tx_fifo = 0;
    }
    if (object.tx_collisions !== undefined && object.tx_collisions !== null) {
      message.tx_collisions = object.tx_collisions;
    } else {
      message.tx_collisions = 0;
    }
    if (object.tx_carrier !== undefined && object.tx_carrier !== null) {
      message.tx_carrier = object.tx_carrier;
    } else {
      message.tx_carrier = 0;
    }
    if (object.tx_compressed !== undefined && object.tx_compressed !== null) {
      message.tx_compressed = object.tx_compressed;
    } else {
      message.tx_compressed = 0;
    }
    return message;
  },
};

const baseDiskStatsResponse: object = {};

export const DiskStatsResponse = {
  encode(message: DiskStatsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.messages) {
      DiskStats.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DiskStatsResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDiskStatsResponse } as DiskStatsResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(DiskStats.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DiskStatsResponse {
    const message = { ...baseDiskStatsResponse } as DiskStatsResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(DiskStats.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: DiskStatsResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? DiskStats.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<DiskStatsResponse>): DiskStatsResponse {
    const message = { ...baseDiskStatsResponse } as DiskStatsResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(DiskStats.fromPartial(e));
      }
    }
    return message;
  },
};

const baseDiskStats: object = {};

export const DiskStats = {
  encode(message: DiskStats, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.total !== undefined) {
      DiskStat.encode(message.total, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.devices) {
      DiskStat.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DiskStats {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDiskStats } as DiskStats;
    message.devices = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.total = DiskStat.decode(reader, reader.uint32());
          break;
        case 3:
          message.devices.push(DiskStat.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DiskStats {
    const message = { ...baseDiskStats } as DiskStats;
    message.devices = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = DiskStat.fromJSON(object.total);
    } else {
      message.total = undefined;
    }
    if (object.devices !== undefined && object.devices !== null) {
      for (const e of object.devices) {
        message.devices.push(DiskStat.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: DiskStats): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.total !== undefined &&
      (obj.total = message.total ? DiskStat.toJSON(message.total) : undefined);
    if (message.devices) {
      obj.devices = message.devices.map((e) =>
        e ? DiskStat.toJSON(e) : undefined
      );
    } else {
      obj.devices = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<DiskStats>): DiskStats {
    const message = { ...baseDiskStats } as DiskStats;
    message.devices = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = DiskStat.fromPartial(object.total);
    } else {
      message.total = undefined;
    }
    if (object.devices !== undefined && object.devices !== null) {
      for (const e of object.devices) {
        message.devices.push(DiskStat.fromPartial(e));
      }
    }
    return message;
  },
};

const baseDiskStat: object = {
  name: "",
  read_completed: 0,
  read_merged: 0,
  read_sectors: 0,
  read_time_ms: 0,
  write_completed: 0,
  write_merged: 0,
  write_sectors: 0,
  write_time_ms: 0,
  io_in_progress: 0,
  io_time_ms: 0,
  io_time_weighted_ms: 0,
  discard_completed: 0,
  discard_merged: 0,
  discard_sectors: 0,
  discard_time_ms: 0,
};

export const DiskStat = {
  encode(message: DiskStat, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.read_completed !== 0) {
      writer.uint32(16).uint64(message.read_completed);
    }
    if (message.read_merged !== 0) {
      writer.uint32(24).uint64(message.read_merged);
    }
    if (message.read_sectors !== 0) {
      writer.uint32(32).uint64(message.read_sectors);
    }
    if (message.read_time_ms !== 0) {
      writer.uint32(40).uint64(message.read_time_ms);
    }
    if (message.write_completed !== 0) {
      writer.uint32(48).uint64(message.write_completed);
    }
    if (message.write_merged !== 0) {
      writer.uint32(56).uint64(message.write_merged);
    }
    if (message.write_sectors !== 0) {
      writer.uint32(64).uint64(message.write_sectors);
    }
    if (message.write_time_ms !== 0) {
      writer.uint32(72).uint64(message.write_time_ms);
    }
    if (message.io_in_progress !== 0) {
      writer.uint32(80).uint64(message.io_in_progress);
    }
    if (message.io_time_ms !== 0) {
      writer.uint32(88).uint64(message.io_time_ms);
    }
    if (message.io_time_weighted_ms !== 0) {
      writer.uint32(96).uint64(message.io_time_weighted_ms);
    }
    if (message.discard_completed !== 0) {
      writer.uint32(104).uint64(message.discard_completed);
    }
    if (message.discard_merged !== 0) {
      writer.uint32(112).uint64(message.discard_merged);
    }
    if (message.discard_sectors !== 0) {
      writer.uint32(120).uint64(message.discard_sectors);
    }
    if (message.discard_time_ms !== 0) {
      writer.uint32(128).uint64(message.discard_time_ms);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DiskStat {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDiskStat } as DiskStat;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.read_completed = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.read_merged = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.read_sectors = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.read_time_ms = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.write_completed = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.write_merged = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.write_sectors = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.write_time_ms = longToNumber(reader.uint64() as Long);
          break;
        case 10:
          message.io_in_progress = longToNumber(reader.uint64() as Long);
          break;
        case 11:
          message.io_time_ms = longToNumber(reader.uint64() as Long);
          break;
        case 12:
          message.io_time_weighted_ms = longToNumber(reader.uint64() as Long);
          break;
        case 13:
          message.discard_completed = longToNumber(reader.uint64() as Long);
          break;
        case 14:
          message.discard_merged = longToNumber(reader.uint64() as Long);
          break;
        case 15:
          message.discard_sectors = longToNumber(reader.uint64() as Long);
          break;
        case 16:
          message.discard_time_ms = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DiskStat {
    const message = { ...baseDiskStat } as DiskStat;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.read_completed !== undefined && object.read_completed !== null) {
      message.read_completed = Number(object.read_completed);
    } else {
      message.read_completed = 0;
    }
    if (object.read_merged !== undefined && object.read_merged !== null) {
      message.read_merged = Number(object.read_merged);
    } else {
      message.read_merged = 0;
    }
    if (object.read_sectors !== undefined && object.read_sectors !== null) {
      message.read_sectors = Number(object.read_sectors);
    } else {
      message.read_sectors = 0;
    }
    if (object.read_time_ms !== undefined && object.read_time_ms !== null) {
      message.read_time_ms = Number(object.read_time_ms);
    } else {
      message.read_time_ms = 0;
    }
    if (
      object.write_completed !== undefined &&
      object.write_completed !== null
    ) {
      message.write_completed = Number(object.write_completed);
    } else {
      message.write_completed = 0;
    }
    if (object.write_merged !== undefined && object.write_merged !== null) {
      message.write_merged = Number(object.write_merged);
    } else {
      message.write_merged = 0;
    }
    if (object.write_sectors !== undefined && object.write_sectors !== null) {
      message.write_sectors = Number(object.write_sectors);
    } else {
      message.write_sectors = 0;
    }
    if (object.write_time_ms !== undefined && object.write_time_ms !== null) {
      message.write_time_ms = Number(object.write_time_ms);
    } else {
      message.write_time_ms = 0;
    }
    if (object.io_in_progress !== undefined && object.io_in_progress !== null) {
      message.io_in_progress = Number(object.io_in_progress);
    } else {
      message.io_in_progress = 0;
    }
    if (object.io_time_ms !== undefined && object.io_time_ms !== null) {
      message.io_time_ms = Number(object.io_time_ms);
    } else {
      message.io_time_ms = 0;
    }
    if (
      object.io_time_weighted_ms !== undefined &&
      object.io_time_weighted_ms !== null
    ) {
      message.io_time_weighted_ms = Number(object.io_time_weighted_ms);
    } else {
      message.io_time_weighted_ms = 0;
    }
    if (
      object.discard_completed !== undefined &&
      object.discard_completed !== null
    ) {
      message.discard_completed = Number(object.discard_completed);
    } else {
      message.discard_completed = 0;
    }
    if (object.discard_merged !== undefined && object.discard_merged !== null) {
      message.discard_merged = Number(object.discard_merged);
    } else {
      message.discard_merged = 0;
    }
    if (
      object.discard_sectors !== undefined &&
      object.discard_sectors !== null
    ) {
      message.discard_sectors = Number(object.discard_sectors);
    } else {
      message.discard_sectors = 0;
    }
    if (
      object.discard_time_ms !== undefined &&
      object.discard_time_ms !== null
    ) {
      message.discard_time_ms = Number(object.discard_time_ms);
    } else {
      message.discard_time_ms = 0;
    }
    return message;
  },

  toJSON(message: DiskStat): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.read_completed !== undefined &&
      (obj.read_completed = message.read_completed);
    message.read_merged !== undefined &&
      (obj.read_merged = message.read_merged);
    message.read_sectors !== undefined &&
      (obj.read_sectors = message.read_sectors);
    message.read_time_ms !== undefined &&
      (obj.read_time_ms = message.read_time_ms);
    message.write_completed !== undefined &&
      (obj.write_completed = message.write_completed);
    message.write_merged !== undefined &&
      (obj.write_merged = message.write_merged);
    message.write_sectors !== undefined &&
      (obj.write_sectors = message.write_sectors);
    message.write_time_ms !== undefined &&
      (obj.write_time_ms = message.write_time_ms);
    message.io_in_progress !== undefined &&
      (obj.io_in_progress = message.io_in_progress);
    message.io_time_ms !== undefined && (obj.io_time_ms = message.io_time_ms);
    message.io_time_weighted_ms !== undefined &&
      (obj.io_time_weighted_ms = message.io_time_weighted_ms);
    message.discard_completed !== undefined &&
      (obj.discard_completed = message.discard_completed);
    message.discard_merged !== undefined &&
      (obj.discard_merged = message.discard_merged);
    message.discard_sectors !== undefined &&
      (obj.discard_sectors = message.discard_sectors);
    message.discard_time_ms !== undefined &&
      (obj.discard_time_ms = message.discard_time_ms);
    return obj;
  },

  fromPartial(object: DeepPartial<DiskStat>): DiskStat {
    const message = { ...baseDiskStat } as DiskStat;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.read_completed !== undefined && object.read_completed !== null) {
      message.read_completed = object.read_completed;
    } else {
      message.read_completed = 0;
    }
    if (object.read_merged !== undefined && object.read_merged !== null) {
      message.read_merged = object.read_merged;
    } else {
      message.read_merged = 0;
    }
    if (object.read_sectors !== undefined && object.read_sectors !== null) {
      message.read_sectors = object.read_sectors;
    } else {
      message.read_sectors = 0;
    }
    if (object.read_time_ms !== undefined && object.read_time_ms !== null) {
      message.read_time_ms = object.read_time_ms;
    } else {
      message.read_time_ms = 0;
    }
    if (
      object.write_completed !== undefined &&
      object.write_completed !== null
    ) {
      message.write_completed = object.write_completed;
    } else {
      message.write_completed = 0;
    }
    if (object.write_merged !== undefined && object.write_merged !== null) {
      message.write_merged = object.write_merged;
    } else {
      message.write_merged = 0;
    }
    if (object.write_sectors !== undefined && object.write_sectors !== null) {
      message.write_sectors = object.write_sectors;
    } else {
      message.write_sectors = 0;
    }
    if (object.write_time_ms !== undefined && object.write_time_ms !== null) {
      message.write_time_ms = object.write_time_ms;
    } else {
      message.write_time_ms = 0;
    }
    if (object.io_in_progress !== undefined && object.io_in_progress !== null) {
      message.io_in_progress = object.io_in_progress;
    } else {
      message.io_in_progress = 0;
    }
    if (object.io_time_ms !== undefined && object.io_time_ms !== null) {
      message.io_time_ms = object.io_time_ms;
    } else {
      message.io_time_ms = 0;
    }
    if (
      object.io_time_weighted_ms !== undefined &&
      object.io_time_weighted_ms !== null
    ) {
      message.io_time_weighted_ms = object.io_time_weighted_ms;
    } else {
      message.io_time_weighted_ms = 0;
    }
    if (
      object.discard_completed !== undefined &&
      object.discard_completed !== null
    ) {
      message.discard_completed = object.discard_completed;
    } else {
      message.discard_completed = 0;
    }
    if (object.discard_merged !== undefined && object.discard_merged !== null) {
      message.discard_merged = object.discard_merged;
    } else {
      message.discard_merged = 0;
    }
    if (
      object.discard_sectors !== undefined &&
      object.discard_sectors !== null
    ) {
      message.discard_sectors = object.discard_sectors;
    } else {
      message.discard_sectors = 0;
    }
    if (
      object.discard_time_ms !== undefined &&
      object.discard_time_ms !== null
    ) {
      message.discard_time_ms = object.discard_time_ms;
    } else {
      message.discard_time_ms = 0;
    }
    return message;
  },
};

const baseEtcdLeaveClusterRequest: object = {};

export const EtcdLeaveClusterRequest = {
  encode(_: EtcdLeaveClusterRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdLeaveClusterRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseEtcdLeaveClusterRequest,
    } as EtcdLeaveClusterRequest;
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

  fromJSON(_: any): EtcdLeaveClusterRequest {
    const message = {
      ...baseEtcdLeaveClusterRequest,
    } as EtcdLeaveClusterRequest;
    return message;
  },

  toJSON(_: EtcdLeaveClusterRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<EtcdLeaveClusterRequest>
  ): EtcdLeaveClusterRequest {
    const message = {
      ...baseEtcdLeaveClusterRequest,
    } as EtcdLeaveClusterRequest;
    return message;
  },
};

const baseEtcdLeaveCluster: object = {};

export const EtcdLeaveCluster = {
  encode(message: EtcdLeaveCluster, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdLeaveCluster {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEtcdLeaveCluster } as EtcdLeaveCluster;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdLeaveCluster {
    const message = { ...baseEtcdLeaveCluster } as EtcdLeaveCluster;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: EtcdLeaveCluster): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<EtcdLeaveCluster>): EtcdLeaveCluster {
    const message = { ...baseEtcdLeaveCluster } as EtcdLeaveCluster;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },
};

const baseEtcdLeaveClusterResponse: object = {};

export const EtcdLeaveClusterResponse = {
  encode(
    message: EtcdLeaveClusterResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      EtcdLeaveCluster.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): EtcdLeaveClusterResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseEtcdLeaveClusterResponse,
    } as EtcdLeaveClusterResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(
            EtcdLeaveCluster.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdLeaveClusterResponse {
    const message = {
      ...baseEtcdLeaveClusterResponse,
    } as EtcdLeaveClusterResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(EtcdLeaveCluster.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: EtcdLeaveClusterResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? EtcdLeaveCluster.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<EtcdLeaveClusterResponse>
  ): EtcdLeaveClusterResponse {
    const message = {
      ...baseEtcdLeaveClusterResponse,
    } as EtcdLeaveClusterResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(EtcdLeaveCluster.fromPartial(e));
      }
    }
    return message;
  },
};

const baseEtcdRemoveMemberRequest: object = { member: "" };

export const EtcdRemoveMemberRequest = {
  encode(
    message: EtcdRemoveMemberRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.member !== "") {
      writer.uint32(10).string(message.member);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdRemoveMemberRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseEtcdRemoveMemberRequest,
    } as EtcdRemoveMemberRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.member = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdRemoveMemberRequest {
    const message = {
      ...baseEtcdRemoveMemberRequest,
    } as EtcdRemoveMemberRequest;
    if (object.member !== undefined && object.member !== null) {
      message.member = String(object.member);
    } else {
      message.member = "";
    }
    return message;
  },

  toJSON(message: EtcdRemoveMemberRequest): unknown {
    const obj: any = {};
    message.member !== undefined && (obj.member = message.member);
    return obj;
  },

  fromPartial(
    object: DeepPartial<EtcdRemoveMemberRequest>
  ): EtcdRemoveMemberRequest {
    const message = {
      ...baseEtcdRemoveMemberRequest,
    } as EtcdRemoveMemberRequest;
    if (object.member !== undefined && object.member !== null) {
      message.member = object.member;
    } else {
      message.member = "";
    }
    return message;
  },
};

const baseEtcdRemoveMember: object = {};

export const EtcdRemoveMember = {
  encode(message: EtcdRemoveMember, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdRemoveMember {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEtcdRemoveMember } as EtcdRemoveMember;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdRemoveMember {
    const message = { ...baseEtcdRemoveMember } as EtcdRemoveMember;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: EtcdRemoveMember): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<EtcdRemoveMember>): EtcdRemoveMember {
    const message = { ...baseEtcdRemoveMember } as EtcdRemoveMember;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },
};

const baseEtcdRemoveMemberResponse: object = {};

export const EtcdRemoveMemberResponse = {
  encode(
    message: EtcdRemoveMemberResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      EtcdRemoveMember.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): EtcdRemoveMemberResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseEtcdRemoveMemberResponse,
    } as EtcdRemoveMemberResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(
            EtcdRemoveMember.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdRemoveMemberResponse {
    const message = {
      ...baseEtcdRemoveMemberResponse,
    } as EtcdRemoveMemberResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(EtcdRemoveMember.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: EtcdRemoveMemberResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? EtcdRemoveMember.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<EtcdRemoveMemberResponse>
  ): EtcdRemoveMemberResponse {
    const message = {
      ...baseEtcdRemoveMemberResponse,
    } as EtcdRemoveMemberResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(EtcdRemoveMember.fromPartial(e));
      }
    }
    return message;
  },
};

const baseEtcdForfeitLeadershipRequest: object = {};

export const EtcdForfeitLeadershipRequest = {
  encode(
    _: EtcdForfeitLeadershipRequest,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): EtcdForfeitLeadershipRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseEtcdForfeitLeadershipRequest,
    } as EtcdForfeitLeadershipRequest;
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

  fromJSON(_: any): EtcdForfeitLeadershipRequest {
    const message = {
      ...baseEtcdForfeitLeadershipRequest,
    } as EtcdForfeitLeadershipRequest;
    return message;
  },

  toJSON(_: EtcdForfeitLeadershipRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<EtcdForfeitLeadershipRequest>
  ): EtcdForfeitLeadershipRequest {
    const message = {
      ...baseEtcdForfeitLeadershipRequest,
    } as EtcdForfeitLeadershipRequest;
    return message;
  },
};

const baseEtcdForfeitLeadership: object = { member: "" };

export const EtcdForfeitLeadership = {
  encode(
    message: EtcdForfeitLeadership,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.member !== "") {
      writer.uint32(18).string(message.member);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdForfeitLeadership {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEtcdForfeitLeadership } as EtcdForfeitLeadership;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.member = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdForfeitLeadership {
    const message = { ...baseEtcdForfeitLeadership } as EtcdForfeitLeadership;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.member !== undefined && object.member !== null) {
      message.member = String(object.member);
    } else {
      message.member = "";
    }
    return message;
  },

  toJSON(message: EtcdForfeitLeadership): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.member !== undefined && (obj.member = message.member);
    return obj;
  },

  fromPartial(
    object: DeepPartial<EtcdForfeitLeadership>
  ): EtcdForfeitLeadership {
    const message = { ...baseEtcdForfeitLeadership } as EtcdForfeitLeadership;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.member !== undefined && object.member !== null) {
      message.member = object.member;
    } else {
      message.member = "";
    }
    return message;
  },
};

const baseEtcdForfeitLeadershipResponse: object = {};

export const EtcdForfeitLeadershipResponse = {
  encode(
    message: EtcdForfeitLeadershipResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      EtcdForfeitLeadership.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): EtcdForfeitLeadershipResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseEtcdForfeitLeadershipResponse,
    } as EtcdForfeitLeadershipResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(
            EtcdForfeitLeadership.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdForfeitLeadershipResponse {
    const message = {
      ...baseEtcdForfeitLeadershipResponse,
    } as EtcdForfeitLeadershipResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(EtcdForfeitLeadership.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: EtcdForfeitLeadershipResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? EtcdForfeitLeadership.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<EtcdForfeitLeadershipResponse>
  ): EtcdForfeitLeadershipResponse {
    const message = {
      ...baseEtcdForfeitLeadershipResponse,
    } as EtcdForfeitLeadershipResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(EtcdForfeitLeadership.fromPartial(e));
      }
    }
    return message;
  },
};

const baseEtcdMemberListRequest: object = { query_local: false };

export const EtcdMemberListRequest = {
  encode(
    message: EtcdMemberListRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.query_local === true) {
      writer.uint32(8).bool(message.query_local);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdMemberListRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEtcdMemberListRequest } as EtcdMemberListRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.query_local = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdMemberListRequest {
    const message = { ...baseEtcdMemberListRequest } as EtcdMemberListRequest;
    if (object.query_local !== undefined && object.query_local !== null) {
      message.query_local = Boolean(object.query_local);
    } else {
      message.query_local = false;
    }
    return message;
  },

  toJSON(message: EtcdMemberListRequest): unknown {
    const obj: any = {};
    message.query_local !== undefined &&
      (obj.query_local = message.query_local);
    return obj;
  },

  fromPartial(
    object: DeepPartial<EtcdMemberListRequest>
  ): EtcdMemberListRequest {
    const message = { ...baseEtcdMemberListRequest } as EtcdMemberListRequest;
    if (object.query_local !== undefined && object.query_local !== null) {
      message.query_local = object.query_local;
    } else {
      message.query_local = false;
    }
    return message;
  },
};

const baseEtcdMember: object = {
  id: 0,
  hostname: "",
  peer_urls: "",
  client_urls: "",
};

export const EtcdMember = {
  encode(message: EtcdMember, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.hostname !== "") {
      writer.uint32(26).string(message.hostname);
    }
    for (const v of message.peer_urls) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.client_urls) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdMember {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEtcdMember } as EtcdMember;
    message.peer_urls = [];
    message.client_urls = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.hostname = reader.string();
          break;
        case 4:
          message.peer_urls.push(reader.string());
          break;
        case 5:
          message.client_urls.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdMember {
    const message = { ...baseEtcdMember } as EtcdMember;
    message.peer_urls = [];
    message.client_urls = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.hostname !== undefined && object.hostname !== null) {
      message.hostname = String(object.hostname);
    } else {
      message.hostname = "";
    }
    if (object.peer_urls !== undefined && object.peer_urls !== null) {
      for (const e of object.peer_urls) {
        message.peer_urls.push(String(e));
      }
    }
    if (object.client_urls !== undefined && object.client_urls !== null) {
      for (const e of object.client_urls) {
        message.client_urls.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: EtcdMember): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.hostname !== undefined && (obj.hostname = message.hostname);
    if (message.peer_urls) {
      obj.peer_urls = message.peer_urls.map((e) => e);
    } else {
      obj.peer_urls = [];
    }
    if (message.client_urls) {
      obj.client_urls = message.client_urls.map((e) => e);
    } else {
      obj.client_urls = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<EtcdMember>): EtcdMember {
    const message = { ...baseEtcdMember } as EtcdMember;
    message.peer_urls = [];
    message.client_urls = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.hostname !== undefined && object.hostname !== null) {
      message.hostname = object.hostname;
    } else {
      message.hostname = "";
    }
    if (object.peer_urls !== undefined && object.peer_urls !== null) {
      for (const e of object.peer_urls) {
        message.peer_urls.push(e);
      }
    }
    if (object.client_urls !== undefined && object.client_urls !== null) {
      for (const e of object.client_urls) {
        message.client_urls.push(e);
      }
    }
    return message;
  },
};

const baseEtcdMembers: object = { legacy_members: "" };

export const EtcdMembers = {
  encode(message: EtcdMembers, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.legacy_members) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.members) {
      EtcdMember.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdMembers {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEtcdMembers } as EtcdMembers;
    message.legacy_members = [];
    message.members = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.legacy_members.push(reader.string());
          break;
        case 3:
          message.members.push(EtcdMember.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdMembers {
    const message = { ...baseEtcdMembers } as EtcdMembers;
    message.legacy_members = [];
    message.members = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.legacy_members !== undefined && object.legacy_members !== null) {
      for (const e of object.legacy_members) {
        message.legacy_members.push(String(e));
      }
    }
    if (object.members !== undefined && object.members !== null) {
      for (const e of object.members) {
        message.members.push(EtcdMember.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: EtcdMembers): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    if (message.legacy_members) {
      obj.legacy_members = message.legacy_members.map((e) => e);
    } else {
      obj.legacy_members = [];
    }
    if (message.members) {
      obj.members = message.members.map((e) =>
        e ? EtcdMember.toJSON(e) : undefined
      );
    } else {
      obj.members = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<EtcdMembers>): EtcdMembers {
    const message = { ...baseEtcdMembers } as EtcdMembers;
    message.legacy_members = [];
    message.members = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.legacy_members !== undefined && object.legacy_members !== null) {
      for (const e of object.legacy_members) {
        message.legacy_members.push(e);
      }
    }
    if (object.members !== undefined && object.members !== null) {
      for (const e of object.members) {
        message.members.push(EtcdMember.fromPartial(e));
      }
    }
    return message;
  },
};

const baseEtcdMemberListResponse: object = {};

export const EtcdMemberListResponse = {
  encode(
    message: EtcdMemberListResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      EtcdMembers.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdMemberListResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEtcdMemberListResponse } as EtcdMemberListResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(EtcdMembers.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdMemberListResponse {
    const message = { ...baseEtcdMemberListResponse } as EtcdMemberListResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(EtcdMembers.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: EtcdMemberListResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? EtcdMembers.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<EtcdMemberListResponse>
  ): EtcdMemberListResponse {
    const message = { ...baseEtcdMemberListResponse } as EtcdMemberListResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(EtcdMembers.fromPartial(e));
      }
    }
    return message;
  },
};

const baseEtcdSnapshotRequest: object = {};

export const EtcdSnapshotRequest = {
  encode(_: EtcdSnapshotRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdSnapshotRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEtcdSnapshotRequest } as EtcdSnapshotRequest;
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

  fromJSON(_: any): EtcdSnapshotRequest {
    const message = { ...baseEtcdSnapshotRequest } as EtcdSnapshotRequest;
    return message;
  },

  toJSON(_: EtcdSnapshotRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<EtcdSnapshotRequest>): EtcdSnapshotRequest {
    const message = { ...baseEtcdSnapshotRequest } as EtcdSnapshotRequest;
    return message;
  },
};

const baseEtcdRecover: object = {};

export const EtcdRecover = {
  encode(message: EtcdRecover, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdRecover {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEtcdRecover } as EtcdRecover;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdRecover {
    const message = { ...baseEtcdRecover } as EtcdRecover;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: EtcdRecover): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<EtcdRecover>): EtcdRecover {
    const message = { ...baseEtcdRecover } as EtcdRecover;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },
};

const baseEtcdRecoverResponse: object = {};

export const EtcdRecoverResponse = {
  encode(
    message: EtcdRecoverResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      EtcdRecover.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdRecoverResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEtcdRecoverResponse } as EtcdRecoverResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(EtcdRecover.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdRecoverResponse {
    const message = { ...baseEtcdRecoverResponse } as EtcdRecoverResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(EtcdRecover.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: EtcdRecoverResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? EtcdRecover.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<EtcdRecoverResponse>): EtcdRecoverResponse {
    const message = { ...baseEtcdRecoverResponse } as EtcdRecoverResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(EtcdRecover.fromPartial(e));
      }
    }
    return message;
  },
};

const baseRouteConfig: object = { network: "", gateway: "", metric: 0 };

export const RouteConfig = {
  encode(message: RouteConfig, writer: Writer = Writer.create()): Writer {
    if (message.network !== "") {
      writer.uint32(10).string(message.network);
    }
    if (message.gateway !== "") {
      writer.uint32(18).string(message.gateway);
    }
    if (message.metric !== 0) {
      writer.uint32(24).uint32(message.metric);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RouteConfig {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRouteConfig } as RouteConfig;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.network = reader.string();
          break;
        case 2:
          message.gateway = reader.string();
          break;
        case 3:
          message.metric = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RouteConfig {
    const message = { ...baseRouteConfig } as RouteConfig;
    if (object.network !== undefined && object.network !== null) {
      message.network = String(object.network);
    } else {
      message.network = "";
    }
    if (object.gateway !== undefined && object.gateway !== null) {
      message.gateway = String(object.gateway);
    } else {
      message.gateway = "";
    }
    if (object.metric !== undefined && object.metric !== null) {
      message.metric = Number(object.metric);
    } else {
      message.metric = 0;
    }
    return message;
  },

  toJSON(message: RouteConfig): unknown {
    const obj: any = {};
    message.network !== undefined && (obj.network = message.network);
    message.gateway !== undefined && (obj.gateway = message.gateway);
    message.metric !== undefined && (obj.metric = message.metric);
    return obj;
  },

  fromPartial(object: DeepPartial<RouteConfig>): RouteConfig {
    const message = { ...baseRouteConfig } as RouteConfig;
    if (object.network !== undefined && object.network !== null) {
      message.network = object.network;
    } else {
      message.network = "";
    }
    if (object.gateway !== undefined && object.gateway !== null) {
      message.gateway = object.gateway;
    } else {
      message.gateway = "";
    }
    if (object.metric !== undefined && object.metric !== null) {
      message.metric = object.metric;
    } else {
      message.metric = 0;
    }
    return message;
  },
};

const baseDHCPOptionsConfig: object = { route_metric: 0 };

export const DHCPOptionsConfig = {
  encode(message: DHCPOptionsConfig, writer: Writer = Writer.create()): Writer {
    if (message.route_metric !== 0) {
      writer.uint32(8).uint32(message.route_metric);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DHCPOptionsConfig {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDHCPOptionsConfig } as DHCPOptionsConfig;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.route_metric = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DHCPOptionsConfig {
    const message = { ...baseDHCPOptionsConfig } as DHCPOptionsConfig;
    if (object.route_metric !== undefined && object.route_metric !== null) {
      message.route_metric = Number(object.route_metric);
    } else {
      message.route_metric = 0;
    }
    return message;
  },

  toJSON(message: DHCPOptionsConfig): unknown {
    const obj: any = {};
    message.route_metric !== undefined &&
      (obj.route_metric = message.route_metric);
    return obj;
  },

  fromPartial(object: DeepPartial<DHCPOptionsConfig>): DHCPOptionsConfig {
    const message = { ...baseDHCPOptionsConfig } as DHCPOptionsConfig;
    if (object.route_metric !== undefined && object.route_metric !== null) {
      message.route_metric = object.route_metric;
    } else {
      message.route_metric = 0;
    }
    return message;
  },
};

const baseNetworkDeviceConfig: object = {
  interface: "",
  cidr: "",
  mtu: 0,
  dhcp: false,
  ignore: false,
};

export const NetworkDeviceConfig = {
  encode(
    message: NetworkDeviceConfig,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.interface !== "") {
      writer.uint32(10).string(message.interface);
    }
    if (message.cidr !== "") {
      writer.uint32(18).string(message.cidr);
    }
    if (message.mtu !== 0) {
      writer.uint32(24).int32(message.mtu);
    }
    if (message.dhcp === true) {
      writer.uint32(32).bool(message.dhcp);
    }
    if (message.ignore === true) {
      writer.uint32(40).bool(message.ignore);
    }
    if (message.dhcp_options !== undefined) {
      DHCPOptionsConfig.encode(
        message.dhcp_options,
        writer.uint32(50).fork()
      ).ldelim();
    }
    for (const v of message.routes) {
      RouteConfig.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NetworkDeviceConfig {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNetworkDeviceConfig } as NetworkDeviceConfig;
    message.routes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interface = reader.string();
          break;
        case 2:
          message.cidr = reader.string();
          break;
        case 3:
          message.mtu = reader.int32();
          break;
        case 4:
          message.dhcp = reader.bool();
          break;
        case 5:
          message.ignore = reader.bool();
          break;
        case 6:
          message.dhcp_options = DHCPOptionsConfig.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.routes.push(RouteConfig.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetworkDeviceConfig {
    const message = { ...baseNetworkDeviceConfig } as NetworkDeviceConfig;
    message.routes = [];
    if (object.interface !== undefined && object.interface !== null) {
      message.interface = String(object.interface);
    } else {
      message.interface = "";
    }
    if (object.cidr !== undefined && object.cidr !== null) {
      message.cidr = String(object.cidr);
    } else {
      message.cidr = "";
    }
    if (object.mtu !== undefined && object.mtu !== null) {
      message.mtu = Number(object.mtu);
    } else {
      message.mtu = 0;
    }
    if (object.dhcp !== undefined && object.dhcp !== null) {
      message.dhcp = Boolean(object.dhcp);
    } else {
      message.dhcp = false;
    }
    if (object.ignore !== undefined && object.ignore !== null) {
      message.ignore = Boolean(object.ignore);
    } else {
      message.ignore = false;
    }
    if (object.dhcp_options !== undefined && object.dhcp_options !== null) {
      message.dhcp_options = DHCPOptionsConfig.fromJSON(object.dhcp_options);
    } else {
      message.dhcp_options = undefined;
    }
    if (object.routes !== undefined && object.routes !== null) {
      for (const e of object.routes) {
        message.routes.push(RouteConfig.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: NetworkDeviceConfig): unknown {
    const obj: any = {};
    message.interface !== undefined && (obj.interface = message.interface);
    message.cidr !== undefined && (obj.cidr = message.cidr);
    message.mtu !== undefined && (obj.mtu = message.mtu);
    message.dhcp !== undefined && (obj.dhcp = message.dhcp);
    message.ignore !== undefined && (obj.ignore = message.ignore);
    message.dhcp_options !== undefined &&
      (obj.dhcp_options = message.dhcp_options
        ? DHCPOptionsConfig.toJSON(message.dhcp_options)
        : undefined);
    if (message.routes) {
      obj.routes = message.routes.map((e) =>
        e ? RouteConfig.toJSON(e) : undefined
      );
    } else {
      obj.routes = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<NetworkDeviceConfig>): NetworkDeviceConfig {
    const message = { ...baseNetworkDeviceConfig } as NetworkDeviceConfig;
    message.routes = [];
    if (object.interface !== undefined && object.interface !== null) {
      message.interface = object.interface;
    } else {
      message.interface = "";
    }
    if (object.cidr !== undefined && object.cidr !== null) {
      message.cidr = object.cidr;
    } else {
      message.cidr = "";
    }
    if (object.mtu !== undefined && object.mtu !== null) {
      message.mtu = object.mtu;
    } else {
      message.mtu = 0;
    }
    if (object.dhcp !== undefined && object.dhcp !== null) {
      message.dhcp = object.dhcp;
    } else {
      message.dhcp = false;
    }
    if (object.ignore !== undefined && object.ignore !== null) {
      message.ignore = object.ignore;
    } else {
      message.ignore = false;
    }
    if (object.dhcp_options !== undefined && object.dhcp_options !== null) {
      message.dhcp_options = DHCPOptionsConfig.fromPartial(object.dhcp_options);
    } else {
      message.dhcp_options = undefined;
    }
    if (object.routes !== undefined && object.routes !== null) {
      for (const e of object.routes) {
        message.routes.push(RouteConfig.fromPartial(e));
      }
    }
    return message;
  },
};

const baseNetworkConfig: object = { hostname: "" };

export const NetworkConfig = {
  encode(message: NetworkConfig, writer: Writer = Writer.create()): Writer {
    if (message.hostname !== "") {
      writer.uint32(10).string(message.hostname);
    }
    for (const v of message.interfaces) {
      NetworkDeviceConfig.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NetworkConfig {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNetworkConfig } as NetworkConfig;
    message.interfaces = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostname = reader.string();
          break;
        case 2:
          message.interfaces.push(
            NetworkDeviceConfig.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NetworkConfig {
    const message = { ...baseNetworkConfig } as NetworkConfig;
    message.interfaces = [];
    if (object.hostname !== undefined && object.hostname !== null) {
      message.hostname = String(object.hostname);
    } else {
      message.hostname = "";
    }
    if (object.interfaces !== undefined && object.interfaces !== null) {
      for (const e of object.interfaces) {
        message.interfaces.push(NetworkDeviceConfig.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: NetworkConfig): unknown {
    const obj: any = {};
    message.hostname !== undefined && (obj.hostname = message.hostname);
    if (message.interfaces) {
      obj.interfaces = message.interfaces.map((e) =>
        e ? NetworkDeviceConfig.toJSON(e) : undefined
      );
    } else {
      obj.interfaces = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<NetworkConfig>): NetworkConfig {
    const message = { ...baseNetworkConfig } as NetworkConfig;
    message.interfaces = [];
    if (object.hostname !== undefined && object.hostname !== null) {
      message.hostname = object.hostname;
    } else {
      message.hostname = "";
    }
    if (object.interfaces !== undefined && object.interfaces !== null) {
      for (const e of object.interfaces) {
        message.interfaces.push(NetworkDeviceConfig.fromPartial(e));
      }
    }
    return message;
  },
};

const baseInstallConfig: object = { install_disk: "", install_image: "" };

export const InstallConfig = {
  encode(message: InstallConfig, writer: Writer = Writer.create()): Writer {
    if (message.install_disk !== "") {
      writer.uint32(10).string(message.install_disk);
    }
    if (message.install_image !== "") {
      writer.uint32(18).string(message.install_image);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): InstallConfig {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseInstallConfig } as InstallConfig;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.install_disk = reader.string();
          break;
        case 2:
          message.install_image = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstallConfig {
    const message = { ...baseInstallConfig } as InstallConfig;
    if (object.install_disk !== undefined && object.install_disk !== null) {
      message.install_disk = String(object.install_disk);
    } else {
      message.install_disk = "";
    }
    if (object.install_image !== undefined && object.install_image !== null) {
      message.install_image = String(object.install_image);
    } else {
      message.install_image = "";
    }
    return message;
  },

  toJSON(message: InstallConfig): unknown {
    const obj: any = {};
    message.install_disk !== undefined &&
      (obj.install_disk = message.install_disk);
    message.install_image !== undefined &&
      (obj.install_image = message.install_image);
    return obj;
  },

  fromPartial(object: DeepPartial<InstallConfig>): InstallConfig {
    const message = { ...baseInstallConfig } as InstallConfig;
    if (object.install_disk !== undefined && object.install_disk !== null) {
      message.install_disk = object.install_disk;
    } else {
      message.install_disk = "";
    }
    if (object.install_image !== undefined && object.install_image !== null) {
      message.install_image = object.install_image;
    } else {
      message.install_image = "";
    }
    return message;
  },
};

const baseMachineConfig: object = { type: 0, kubernetes_version: "" };

export const MachineConfig = {
  encode(message: MachineConfig, writer: Writer = Writer.create()): Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.install_config !== undefined) {
      InstallConfig.encode(
        message.install_config,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.network_config !== undefined) {
      NetworkConfig.encode(
        message.network_config,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.kubernetes_version !== "") {
      writer.uint32(34).string(message.kubernetes_version);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MachineConfig {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMachineConfig } as MachineConfig;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.install_config = InstallConfig.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.network_config = NetworkConfig.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.kubernetes_version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MachineConfig {
    const message = { ...baseMachineConfig } as MachineConfig;
    if (object.type !== undefined && object.type !== null) {
      message.type = machineConfig_MachineTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.install_config !== undefined && object.install_config !== null) {
      message.install_config = InstallConfig.fromJSON(object.install_config);
    } else {
      message.install_config = undefined;
    }
    if (object.network_config !== undefined && object.network_config !== null) {
      message.network_config = NetworkConfig.fromJSON(object.network_config);
    } else {
      message.network_config = undefined;
    }
    if (
      object.kubernetes_version !== undefined &&
      object.kubernetes_version !== null
    ) {
      message.kubernetes_version = String(object.kubernetes_version);
    } else {
      message.kubernetes_version = "";
    }
    return message;
  },

  toJSON(message: MachineConfig): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = machineConfig_MachineTypeToJSON(message.type));
    message.install_config !== undefined &&
      (obj.install_config = message.install_config
        ? InstallConfig.toJSON(message.install_config)
        : undefined);
    message.network_config !== undefined &&
      (obj.network_config = message.network_config
        ? NetworkConfig.toJSON(message.network_config)
        : undefined);
    message.kubernetes_version !== undefined &&
      (obj.kubernetes_version = message.kubernetes_version);
    return obj;
  },

  fromPartial(object: DeepPartial<MachineConfig>): MachineConfig {
    const message = { ...baseMachineConfig } as MachineConfig;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.install_config !== undefined && object.install_config !== null) {
      message.install_config = InstallConfig.fromPartial(object.install_config);
    } else {
      message.install_config = undefined;
    }
    if (object.network_config !== undefined && object.network_config !== null) {
      message.network_config = NetworkConfig.fromPartial(object.network_config);
    } else {
      message.network_config = undefined;
    }
    if (
      object.kubernetes_version !== undefined &&
      object.kubernetes_version !== null
    ) {
      message.kubernetes_version = object.kubernetes_version;
    } else {
      message.kubernetes_version = "";
    }
    return message;
  },
};

const baseControlPlaneConfig: object = { endpoint: "" };

export const ControlPlaneConfig = {
  encode(
    message: ControlPlaneConfig,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.endpoint !== "") {
      writer.uint32(10).string(message.endpoint);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ControlPlaneConfig {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseControlPlaneConfig } as ControlPlaneConfig;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.endpoint = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ControlPlaneConfig {
    const message = { ...baseControlPlaneConfig } as ControlPlaneConfig;
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = String(object.endpoint);
    } else {
      message.endpoint = "";
    }
    return message;
  },

  toJSON(message: ControlPlaneConfig): unknown {
    const obj: any = {};
    message.endpoint !== undefined && (obj.endpoint = message.endpoint);
    return obj;
  },

  fromPartial(object: DeepPartial<ControlPlaneConfig>): ControlPlaneConfig {
    const message = { ...baseControlPlaneConfig } as ControlPlaneConfig;
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = object.endpoint;
    } else {
      message.endpoint = "";
    }
    return message;
  },
};

const baseCNIConfig: object = { name: "", urls: "" };

export const CNIConfig = {
  encode(message: CNIConfig, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.urls) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CNIConfig {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCNIConfig } as CNIConfig;
    message.urls = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.urls.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CNIConfig {
    const message = { ...baseCNIConfig } as CNIConfig;
    message.urls = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.urls !== undefined && object.urls !== null) {
      for (const e of object.urls) {
        message.urls.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: CNIConfig): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.urls) {
      obj.urls = message.urls.map((e) => e);
    } else {
      obj.urls = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<CNIConfig>): CNIConfig {
    const message = { ...baseCNIConfig } as CNIConfig;
    message.urls = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.urls !== undefined && object.urls !== null) {
      for (const e of object.urls) {
        message.urls.push(e);
      }
    }
    return message;
  },
};

const baseClusterNetworkConfig: object = { dns_domain: "" };

export const ClusterNetworkConfig = {
  encode(
    message: ClusterNetworkConfig,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.dns_domain !== "") {
      writer.uint32(10).string(message.dns_domain);
    }
    if (message.cni_config !== undefined) {
      CNIConfig.encode(message.cni_config, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ClusterNetworkConfig {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClusterNetworkConfig } as ClusterNetworkConfig;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dns_domain = reader.string();
          break;
        case 2:
          message.cni_config = CNIConfig.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClusterNetworkConfig {
    const message = { ...baseClusterNetworkConfig } as ClusterNetworkConfig;
    if (object.dns_domain !== undefined && object.dns_domain !== null) {
      message.dns_domain = String(object.dns_domain);
    } else {
      message.dns_domain = "";
    }
    if (object.cni_config !== undefined && object.cni_config !== null) {
      message.cni_config = CNIConfig.fromJSON(object.cni_config);
    } else {
      message.cni_config = undefined;
    }
    return message;
  },

  toJSON(message: ClusterNetworkConfig): unknown {
    const obj: any = {};
    message.dns_domain !== undefined && (obj.dns_domain = message.dns_domain);
    message.cni_config !== undefined &&
      (obj.cni_config = message.cni_config
        ? CNIConfig.toJSON(message.cni_config)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<ClusterNetworkConfig>): ClusterNetworkConfig {
    const message = { ...baseClusterNetworkConfig } as ClusterNetworkConfig;
    if (object.dns_domain !== undefined && object.dns_domain !== null) {
      message.dns_domain = object.dns_domain;
    } else {
      message.dns_domain = "";
    }
    if (object.cni_config !== undefined && object.cni_config !== null) {
      message.cni_config = CNIConfig.fromPartial(object.cni_config);
    } else {
      message.cni_config = undefined;
    }
    return message;
  },
};

const baseClusterConfig: object = {
  name: "",
  allow_scheduling_on_masters: false,
};

export const ClusterConfig = {
  encode(message: ClusterConfig, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.control_plane !== undefined) {
      ControlPlaneConfig.encode(
        message.control_plane,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.cluster_network !== undefined) {
      ClusterNetworkConfig.encode(
        message.cluster_network,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.allow_scheduling_on_masters === true) {
      writer.uint32(32).bool(message.allow_scheduling_on_masters);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ClusterConfig {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClusterConfig } as ClusterConfig;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.control_plane = ControlPlaneConfig.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.cluster_network = ClusterNetworkConfig.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.allow_scheduling_on_masters = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClusterConfig {
    const message = { ...baseClusterConfig } as ClusterConfig;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.control_plane !== undefined && object.control_plane !== null) {
      message.control_plane = ControlPlaneConfig.fromJSON(object.control_plane);
    } else {
      message.control_plane = undefined;
    }
    if (
      object.cluster_network !== undefined &&
      object.cluster_network !== null
    ) {
      message.cluster_network = ClusterNetworkConfig.fromJSON(
        object.cluster_network
      );
    } else {
      message.cluster_network = undefined;
    }
    if (
      object.allow_scheduling_on_masters !== undefined &&
      object.allow_scheduling_on_masters !== null
    ) {
      message.allow_scheduling_on_masters = Boolean(
        object.allow_scheduling_on_masters
      );
    } else {
      message.allow_scheduling_on_masters = false;
    }
    return message;
  },

  toJSON(message: ClusterConfig): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.control_plane !== undefined &&
      (obj.control_plane = message.control_plane
        ? ControlPlaneConfig.toJSON(message.control_plane)
        : undefined);
    message.cluster_network !== undefined &&
      (obj.cluster_network = message.cluster_network
        ? ClusterNetworkConfig.toJSON(message.cluster_network)
        : undefined);
    message.allow_scheduling_on_masters !== undefined &&
      (obj.allow_scheduling_on_masters = message.allow_scheduling_on_masters);
    return obj;
  },

  fromPartial(object: DeepPartial<ClusterConfig>): ClusterConfig {
    const message = { ...baseClusterConfig } as ClusterConfig;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.control_plane !== undefined && object.control_plane !== null) {
      message.control_plane = ControlPlaneConfig.fromPartial(
        object.control_plane
      );
    } else {
      message.control_plane = undefined;
    }
    if (
      object.cluster_network !== undefined &&
      object.cluster_network !== null
    ) {
      message.cluster_network = ClusterNetworkConfig.fromPartial(
        object.cluster_network
      );
    } else {
      message.cluster_network = undefined;
    }
    if (
      object.allow_scheduling_on_masters !== undefined &&
      object.allow_scheduling_on_masters !== null
    ) {
      message.allow_scheduling_on_masters = object.allow_scheduling_on_masters;
    } else {
      message.allow_scheduling_on_masters = false;
    }
    return message;
  },
};

const baseGenerateConfigurationRequest: object = { config_version: "" };

export const GenerateConfigurationRequest = {
  encode(
    message: GenerateConfigurationRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.config_version !== "") {
      writer.uint32(10).string(message.config_version);
    }
    if (message.cluster_config !== undefined) {
      ClusterConfig.encode(
        message.cluster_config,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.machine_config !== undefined) {
      MachineConfig.encode(
        message.machine_config,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.override_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.override_time),
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GenerateConfigurationRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGenerateConfigurationRequest,
    } as GenerateConfigurationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.config_version = reader.string();
          break;
        case 2:
          message.cluster_config = ClusterConfig.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.machine_config = MachineConfig.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.override_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateConfigurationRequest {
    const message = {
      ...baseGenerateConfigurationRequest,
    } as GenerateConfigurationRequest;
    if (object.config_version !== undefined && object.config_version !== null) {
      message.config_version = String(object.config_version);
    } else {
      message.config_version = "";
    }
    if (object.cluster_config !== undefined && object.cluster_config !== null) {
      message.cluster_config = ClusterConfig.fromJSON(object.cluster_config);
    } else {
      message.cluster_config = undefined;
    }
    if (object.machine_config !== undefined && object.machine_config !== null) {
      message.machine_config = MachineConfig.fromJSON(object.machine_config);
    } else {
      message.machine_config = undefined;
    }
    if (object.override_time !== undefined && object.override_time !== null) {
      message.override_time = fromJsonTimestamp(object.override_time);
    } else {
      message.override_time = undefined;
    }
    return message;
  },

  toJSON(message: GenerateConfigurationRequest): unknown {
    const obj: any = {};
    message.config_version !== undefined &&
      (obj.config_version = message.config_version);
    message.cluster_config !== undefined &&
      (obj.cluster_config = message.cluster_config
        ? ClusterConfig.toJSON(message.cluster_config)
        : undefined);
    message.machine_config !== undefined &&
      (obj.machine_config = message.machine_config
        ? MachineConfig.toJSON(message.machine_config)
        : undefined);
    message.override_time !== undefined &&
      (obj.override_time = message.override_time.toISOString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenerateConfigurationRequest>
  ): GenerateConfigurationRequest {
    const message = {
      ...baseGenerateConfigurationRequest,
    } as GenerateConfigurationRequest;
    if (object.config_version !== undefined && object.config_version !== null) {
      message.config_version = object.config_version;
    } else {
      message.config_version = "";
    }
    if (object.cluster_config !== undefined && object.cluster_config !== null) {
      message.cluster_config = ClusterConfig.fromPartial(object.cluster_config);
    } else {
      message.cluster_config = undefined;
    }
    if (object.machine_config !== undefined && object.machine_config !== null) {
      message.machine_config = MachineConfig.fromPartial(object.machine_config);
    } else {
      message.machine_config = undefined;
    }
    if (object.override_time !== undefined && object.override_time !== null) {
      message.override_time = object.override_time;
    } else {
      message.override_time = undefined;
    }
    return message;
  },
};

const baseGenerateConfiguration: object = {};

export const GenerateConfiguration = {
  encode(
    message: GenerateConfiguration,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.data) {
      writer.uint32(18).bytes(v!);
    }
    if (message.talosconfig.length !== 0) {
      writer.uint32(26).bytes(message.talosconfig);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenerateConfiguration {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenerateConfiguration } as GenerateConfiguration;
    message.data = [];
    message.talosconfig = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.data.push(reader.bytes());
          break;
        case 3:
          message.talosconfig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateConfiguration {
    const message = { ...baseGenerateConfiguration } as GenerateConfiguration;
    message.data = [];
    message.talosconfig = new Uint8Array();
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(bytesFromBase64(e));
      }
    }
    if (object.talosconfig !== undefined && object.talosconfig !== null) {
      message.talosconfig = bytesFromBase64(object.talosconfig);
    }
    return message;
  },

  toJSON(message: GenerateConfiguration): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    if (message.data) {
      obj.data = message.data.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array())
      );
    } else {
      obj.data = [];
    }
    message.talosconfig !== undefined &&
      (obj.talosconfig = base64FromBytes(
        message.talosconfig !== undefined
          ? message.talosconfig
          : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenerateConfiguration>
  ): GenerateConfiguration {
    const message = { ...baseGenerateConfiguration } as GenerateConfiguration;
    message.data = [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(e);
      }
    }
    if (object.talosconfig !== undefined && object.talosconfig !== null) {
      message.talosconfig = object.talosconfig;
    } else {
      message.talosconfig = new Uint8Array();
    }
    return message;
  },
};

const baseGenerateConfigurationResponse: object = {};

export const GenerateConfigurationResponse = {
  encode(
    message: GenerateConfigurationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      GenerateConfiguration.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GenerateConfigurationResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGenerateConfigurationResponse,
    } as GenerateConfigurationResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(
            GenerateConfiguration.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateConfigurationResponse {
    const message = {
      ...baseGenerateConfigurationResponse,
    } as GenerateConfigurationResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(GenerateConfiguration.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenerateConfigurationResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? GenerateConfiguration.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenerateConfigurationResponse>
  ): GenerateConfigurationResponse {
    const message = {
      ...baseGenerateConfigurationResponse,
    } as GenerateConfigurationResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(GenerateConfiguration.fromPartial(e));
      }
    }
    return message;
  },
};

const baseRemoveBootkubeInitializedKey: object = {};

export const RemoveBootkubeInitializedKey = {
  encode(
    message: RemoveBootkubeInitializedKey,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): RemoveBootkubeInitializedKey {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseRemoveBootkubeInitializedKey,
    } as RemoveBootkubeInitializedKey;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveBootkubeInitializedKey {
    const message = {
      ...baseRemoveBootkubeInitializedKey,
    } as RemoveBootkubeInitializedKey;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },

  toJSON(message: RemoveBootkubeInitializedKey): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<RemoveBootkubeInitializedKey>
  ): RemoveBootkubeInitializedKey {
    const message = {
      ...baseRemoveBootkubeInitializedKey,
    } as RemoveBootkubeInitializedKey;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    return message;
  },
};

const baseRemoveBootkubeInitializedKeyResponse: object = {};

export const RemoveBootkubeInitializedKeyResponse = {
  encode(
    message: RemoveBootkubeInitializedKeyResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      RemoveBootkubeInitializedKey.encode(
        v!,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): RemoveBootkubeInitializedKeyResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseRemoveBootkubeInitializedKeyResponse,
    } as RemoveBootkubeInitializedKeyResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(
            RemoveBootkubeInitializedKey.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveBootkubeInitializedKeyResponse {
    const message = {
      ...baseRemoveBootkubeInitializedKeyResponse,
    } as RemoveBootkubeInitializedKeyResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(RemoveBootkubeInitializedKey.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: RemoveBootkubeInitializedKeyResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? RemoveBootkubeInitializedKey.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<RemoveBootkubeInitializedKeyResponse>
  ): RemoveBootkubeInitializedKeyResponse {
    const message = {
      ...baseRemoveBootkubeInitializedKeyResponse,
    } as RemoveBootkubeInitializedKeyResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(RemoveBootkubeInitializedKey.fromPartial(e));
      }
    }
    return message;
  },
};

const baseGenerateClientConfigurationRequest: object = { roles: "" };

export const GenerateClientConfigurationRequest = {
  encode(
    message: GenerateClientConfigurationRequest,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.roles) {
      writer.uint32(10).string(v!);
    }
    if (message.crt_ttl !== undefined) {
      Duration.encode(message.crt_ttl, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GenerateClientConfigurationRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGenerateClientConfigurationRequest,
    } as GenerateClientConfigurationRequest;
    message.roles = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roles.push(reader.string());
          break;
        case 2:
          message.crt_ttl = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateClientConfigurationRequest {
    const message = {
      ...baseGenerateClientConfigurationRequest,
    } as GenerateClientConfigurationRequest;
    message.roles = [];
    if (object.roles !== undefined && object.roles !== null) {
      for (const e of object.roles) {
        message.roles.push(String(e));
      }
    }
    if (object.crt_ttl !== undefined && object.crt_ttl !== null) {
      message.crt_ttl = Duration.fromJSON(object.crt_ttl);
    } else {
      message.crt_ttl = undefined;
    }
    return message;
  },

  toJSON(message: GenerateClientConfigurationRequest): unknown {
    const obj: any = {};
    if (message.roles) {
      obj.roles = message.roles.map((e) => e);
    } else {
      obj.roles = [];
    }
    message.crt_ttl !== undefined &&
      (obj.crt_ttl = message.crt_ttl
        ? Duration.toJSON(message.crt_ttl)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenerateClientConfigurationRequest>
  ): GenerateClientConfigurationRequest {
    const message = {
      ...baseGenerateClientConfigurationRequest,
    } as GenerateClientConfigurationRequest;
    message.roles = [];
    if (object.roles !== undefined && object.roles !== null) {
      for (const e of object.roles) {
        message.roles.push(e);
      }
    }
    if (object.crt_ttl !== undefined && object.crt_ttl !== null) {
      message.crt_ttl = Duration.fromPartial(object.crt_ttl);
    } else {
      message.crt_ttl = undefined;
    }
    return message;
  },
};

const baseGenerateClientConfiguration: object = {};

export const GenerateClientConfiguration = {
  encode(
    message: GenerateClientConfiguration,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.ca.length !== 0) {
      writer.uint32(18).bytes(message.ca);
    }
    if (message.crt.length !== 0) {
      writer.uint32(26).bytes(message.crt);
    }
    if (message.key.length !== 0) {
      writer.uint32(34).bytes(message.key);
    }
    if (message.talosconfig.length !== 0) {
      writer.uint32(42).bytes(message.talosconfig);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GenerateClientConfiguration {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGenerateClientConfiguration,
    } as GenerateClientConfiguration;
    message.ca = new Uint8Array();
    message.crt = new Uint8Array();
    message.key = new Uint8Array();
    message.talosconfig = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.ca = reader.bytes();
          break;
        case 3:
          message.crt = reader.bytes();
          break;
        case 4:
          message.key = reader.bytes();
          break;
        case 5:
          message.talosconfig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateClientConfiguration {
    const message = {
      ...baseGenerateClientConfiguration,
    } as GenerateClientConfiguration;
    message.ca = new Uint8Array();
    message.crt = new Uint8Array();
    message.key = new Uint8Array();
    message.talosconfig = new Uint8Array();
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromJSON(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.ca !== undefined && object.ca !== null) {
      message.ca = bytesFromBase64(object.ca);
    }
    if (object.crt !== undefined && object.crt !== null) {
      message.crt = bytesFromBase64(object.crt);
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = bytesFromBase64(object.key);
    }
    if (object.talosconfig !== undefined && object.talosconfig !== null) {
      message.talosconfig = bytesFromBase64(object.talosconfig);
    }
    return message;
  },

  toJSON(message: GenerateClientConfiguration): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.ca !== undefined &&
      (obj.ca = base64FromBytes(
        message.ca !== undefined ? message.ca : new Uint8Array()
      ));
    message.crt !== undefined &&
      (obj.crt = base64FromBytes(
        message.crt !== undefined ? message.crt : new Uint8Array()
      ));
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array()
      ));
    message.talosconfig !== undefined &&
      (obj.talosconfig = base64FromBytes(
        message.talosconfig !== undefined
          ? message.talosconfig
          : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenerateClientConfiguration>
  ): GenerateClientConfiguration {
    const message = {
      ...baseGenerateClientConfiguration,
    } as GenerateClientConfiguration;
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    } else {
      message.metadata = undefined;
    }
    if (object.ca !== undefined && object.ca !== null) {
      message.ca = object.ca;
    } else {
      message.ca = new Uint8Array();
    }
    if (object.crt !== undefined && object.crt !== null) {
      message.crt = object.crt;
    } else {
      message.crt = new Uint8Array();
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = new Uint8Array();
    }
    if (object.talosconfig !== undefined && object.talosconfig !== null) {
      message.talosconfig = object.talosconfig;
    } else {
      message.talosconfig = new Uint8Array();
    }
    return message;
  },
};

const baseGenerateClientConfigurationResponse: object = {};

export const GenerateClientConfigurationResponse = {
  encode(
    message: GenerateClientConfigurationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.messages) {
      GenerateClientConfiguration.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GenerateClientConfigurationResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGenerateClientConfigurationResponse,
    } as GenerateClientConfigurationResponse;
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(
            GenerateClientConfiguration.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenerateClientConfigurationResponse {
    const message = {
      ...baseGenerateClientConfigurationResponse,
    } as GenerateClientConfigurationResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(GenerateClientConfiguration.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenerateClientConfigurationResponse): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? GenerateClientConfiguration.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenerateClientConfigurationResponse>
  ): GenerateClientConfigurationResponse {
    const message = {
      ...baseGenerateClientConfigurationResponse,
    } as GenerateClientConfigurationResponse;
    message.messages = [];
    if (object.messages !== undefined && object.messages !== null) {
      for (const e of object.messages) {
        message.messages.push(GenerateClientConfiguration.fromPartial(e));
      }
    }
    return message;
  },
};

/** The machine service definition. */
export interface MachineService {
  ApplyConfiguration(
    request: ApplyConfigurationRequest
  ): Promise<ApplyConfigurationResponse>;
  Bootstrap(request: BootstrapRequest): Promise<BootstrapResponse>;
  Containers(request: ContainersRequest): Promise<ContainersResponse>;
  Copy(request: CopyRequest): Observable<Data>;
  CPUInfo(request: Empty): Promise<CPUInfoResponse>;
  DiskStats(request: Empty): Promise<DiskStatsResponse>;
  Dmesg(request: DmesgRequest): Observable<Data>;
  Events(request: EventsRequest): Observable<Event>;
  EtcdMemberList(
    request: EtcdMemberListRequest
  ): Promise<EtcdMemberListResponse>;
  EtcdRemoveMember(
    request: EtcdRemoveMemberRequest
  ): Promise<EtcdRemoveMemberResponse>;
  EtcdLeaveCluster(
    request: EtcdLeaveClusterRequest
  ): Promise<EtcdLeaveClusterResponse>;
  EtcdForfeitLeadership(
    request: EtcdForfeitLeadershipRequest
  ): Promise<EtcdForfeitLeadershipResponse>;
  /**
   * EtcdRecover method uploads etcd data snapshot created with EtcdSnapshot
   * to the node.
   *
   * Snapshot can be later used to recover the cluster via Bootstrap method.
   */
  EtcdRecover(request: Observable<Data>): Promise<EtcdRecoverResponse>;
  /**
   * EtcdSnapshot method creates etcd data snapshot (backup) from the local etcd instance
   * and streams it back to the client.
   *
   * This method is available only on control plane nodes (which run etcd).
   */
  EtcdSnapshot(request: EtcdSnapshotRequest): Observable<Data>;
  GenerateConfiguration(
    request: GenerateConfigurationRequest
  ): Promise<GenerateConfigurationResponse>;
  Hostname(request: Empty): Promise<HostnameResponse>;
  Kubeconfig(request: Empty): Observable<Data>;
  List(request: ListRequest): Observable<FileInfo>;
  DiskUsage(request: DiskUsageRequest): Observable<DiskUsageInfo>;
  LoadAvg(request: Empty): Promise<LoadAvgResponse>;
  Logs(request: LogsRequest): Observable<Data>;
  Memory(request: Empty): Promise<MemoryResponse>;
  Mounts(request: Empty): Promise<MountsResponse>;
  NetworkDeviceStats(request: Empty): Promise<NetworkDeviceStatsResponse>;
  Processes(request: Empty): Promise<ProcessesResponse>;
  Read(request: ReadRequest): Observable<Data>;
  Reboot(request: Empty): Promise<RebootResponse>;
  Restart(request: RestartRequest): Promise<RestartResponse>;
  Rollback(request: RollbackRequest): Promise<RollbackResponse>;
  Reset(request: ResetRequest): Promise<ResetResponse>;
  /** @deprecated */
  RemoveBootkubeInitializedKey(
    request: Empty
  ): Promise<RemoveBootkubeInitializedKeyResponse>;
  ServiceList(request: Empty): Promise<ServiceListResponse>;
  ServiceRestart(
    request: ServiceRestartRequest
  ): Promise<ServiceRestartResponse>;
  ServiceStart(request: ServiceStartRequest): Promise<ServiceStartResponse>;
  ServiceStop(request: ServiceStopRequest): Promise<ServiceStopResponse>;
  Shutdown(request: Empty): Promise<ShutdownResponse>;
  Stats(request: StatsRequest): Promise<StatsResponse>;
  SystemStat(request: Empty): Promise<SystemStatResponse>;
  Upgrade(request: UpgradeRequest): Promise<UpgradeResponse>;
  Version(request: Empty): Promise<VersionResponse>;
  /** GenerateClientConfiguration generates talosctl client configuration (talosconfig). */
  GenerateClientConfiguration(
    request: GenerateClientConfigurationRequest
  ): Promise<GenerateClientConfigurationResponse>;
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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
