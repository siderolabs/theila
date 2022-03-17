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
  /**
   * replaced by mode
   *
   * @deprecated
   */
  on_reboot: boolean;
  /**
   * replaced by mode
   *
   * @deprecated
   */
  immediate: boolean;
  mode: ApplyConfigurationRequest_Mode;
}

export enum ApplyConfigurationRequest_Mode {
  REBOOT = 0,
  AUTO = 1,
  NO_REBOOT = 2,
  STAGED = 3,
  UNRECOGNIZED = -1,
}

export function applyConfigurationRequest_ModeFromJSON(
  object: any
): ApplyConfigurationRequest_Mode {
  switch (object) {
    case 0:
    case "REBOOT":
      return ApplyConfigurationRequest_Mode.REBOOT;
    case 1:
    case "AUTO":
      return ApplyConfigurationRequest_Mode.AUTO;
    case 2:
    case "NO_REBOOT":
      return ApplyConfigurationRequest_Mode.NO_REBOOT;
    case 3:
    case "STAGED":
      return ApplyConfigurationRequest_Mode.STAGED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ApplyConfigurationRequest_Mode.UNRECOGNIZED;
  }
}

export function applyConfigurationRequest_ModeToJSON(
  object: ApplyConfigurationRequest_Mode
): string {
  switch (object) {
    case ApplyConfigurationRequest_Mode.REBOOT:
      return "REBOOT";
    case ApplyConfigurationRequest_Mode.AUTO:
      return "AUTO";
    case ApplyConfigurationRequest_Mode.NO_REBOOT:
      return "NO_REBOOT";
    case ApplyConfigurationRequest_Mode.STAGED:
      return "STAGED";
    default:
      return "UNKNOWN";
  }
}

/** ApplyConfigurationResponse describes the response to a configuration request. */
export interface ApplyConfiguration {
  metadata: Metadata | undefined;
  /** Configuration validation warnings. */
  warnings: string[];
  /** States which mode was actually chosen. */
  mode: ApplyConfigurationRequest_Mode;
  /** Human-readable message explaining the result of the apply configuration call. */
  mode_details: string;
}

export interface ApplyConfigurationResponse {
  messages: ApplyConfiguration[];
}

/** rpc reboot */
export interface RebootRequest {
  mode: RebootRequest_Mode;
}

export enum RebootRequest_Mode {
  DEFAULT = 0,
  POWERCYCLE = 1,
  UNRECOGNIZED = -1,
}

export function rebootRequest_ModeFromJSON(object: any): RebootRequest_Mode {
  switch (object) {
    case 0:
    case "DEFAULT":
      return RebootRequest_Mode.DEFAULT;
    case 1:
    case "POWERCYCLE":
      return RebootRequest_Mode.POWERCYCLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RebootRequest_Mode.UNRECOGNIZED;
  }
}

export function rebootRequest_ModeToJSON(object: RebootRequest_Mode): string {
  switch (object) {
    case RebootRequest_Mode.DEFAULT:
      return "DEFAULT";
    case RebootRequest_Mode.POWERCYCLE:
      return "POWERCYCLE";
    default:
      return "UNKNOWN";
  }
}

/** The reboot message containing the reboot status. */
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

/** ConfigLoadErrorEvent is reported when the config loading has failed. */
export interface ConfigLoadErrorEvent {
  error: string;
}

/** ConfigValidationErrorEvent is reported when config validation has failed. */
export interface ConfigValidationErrorEvent {
  error: string;
}

/** AddressEvent reports node endpoints aggregated from k8s.Endpoints and network.Hostname. */
export interface AddressEvent {
  hostname: string;
  addresses: string[];
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

export interface ShutdownRequest {
  /** Force indicates whether node should shutdown without first cordening and draining */
  force: boolean;
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
  /** Owner uid */
  uid: number;
  /** Owner gid */
  gid: number;
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
  /** Features describe individual Talos features that can be switched on or off. */
  features: FeaturesInfo | undefined;
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

/** FeaturesInfo describes individual Talos features that can be switched on or off. */
export interface FeaturesInfo {
  /** RBAC is true if role-based access control is enabled. */
  rbac: boolean;
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
  /** learner flag */
  is_learner: boolean;
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
  TYPE_WORKER = 3,
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
    case "TYPE_WORKER":
      return MachineConfig_MachineType.TYPE_WORKER;
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
    case MachineConfig_MachineType.TYPE_WORKER:
      return "TYPE_WORKER";
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

function createBaseApplyConfigurationRequest(): ApplyConfigurationRequest {
  return {
    data: new Uint8Array(),
    on_reboot: false,
    immediate: false,
    mode: 0,
  };
}

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
    if (message.mode !== 0) {
      writer.uint32(32).int32(message.mode);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): ApplyConfigurationRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApplyConfigurationRequest();
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
        case 4:
          message.mode = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApplyConfigurationRequest {
    return {
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      on_reboot: isSet(object.on_reboot) ? Boolean(object.on_reboot) : false,
      immediate: isSet(object.immediate) ? Boolean(object.immediate) : false,
      mode: isSet(object.mode)
        ? applyConfigurationRequest_ModeFromJSON(object.mode)
        : 0,
    };
  },

  toJSON(message: ApplyConfigurationRequest): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.on_reboot !== undefined && (obj.on_reboot = message.on_reboot);
    message.immediate !== undefined && (obj.immediate = message.immediate);
    message.mode !== undefined &&
      (obj.mode = applyConfigurationRequest_ModeToJSON(message.mode));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ApplyConfigurationRequest>, I>>(
    object: I
  ): ApplyConfigurationRequest {
    const message = createBaseApplyConfigurationRequest();
    message.data = object.data ?? new Uint8Array();
    message.on_reboot = object.on_reboot ?? false;
    message.immediate = object.immediate ?? false;
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseApplyConfiguration(): ApplyConfiguration {
  return { metadata: undefined, warnings: [], mode: 0, mode_details: "" };
}

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
    if (message.mode !== 0) {
      writer.uint32(24).int32(message.mode);
    }
    if (message.mode_details !== "") {
      writer.uint32(34).string(message.mode_details);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ApplyConfiguration {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApplyConfiguration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.warnings.push(reader.string());
          break;
        case 3:
          message.mode = reader.int32() as any;
          break;
        case 4:
          message.mode_details = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApplyConfiguration {
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      warnings: Array.isArray(object?.warnings)
        ? object.warnings.map((e: any) => String(e))
        : [],
      mode: isSet(object.mode)
        ? applyConfigurationRequest_ModeFromJSON(object.mode)
        : 0,
      mode_details: isSet(object.mode_details)
        ? String(object.mode_details)
        : "",
    };
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
    message.mode !== undefined &&
      (obj.mode = applyConfigurationRequest_ModeToJSON(message.mode));
    message.mode_details !== undefined &&
      (obj.mode_details = message.mode_details);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ApplyConfiguration>, I>>(
    object: I
  ): ApplyConfiguration {
    const message = createBaseApplyConfiguration();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.warnings = object.warnings?.map((e) => e) || [];
    message.mode = object.mode ?? 0;
    message.mode_details = object.mode_details ?? "";
    return message;
  },
};

function createBaseApplyConfigurationResponse(): ApplyConfigurationResponse {
  return { messages: [] };
}

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
    const message = createBaseApplyConfigurationResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => ApplyConfiguration.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<ApplyConfigurationResponse>, I>>(
    object: I
  ): ApplyConfigurationResponse {
    const message = createBaseApplyConfigurationResponse();
    message.messages =
      object.messages?.map((e) => ApplyConfiguration.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRebootRequest(): RebootRequest {
  return { mode: 0 };
}

export const RebootRequest = {
  encode(message: RebootRequest, writer: Writer = Writer.create()): Writer {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RebootRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRebootRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mode = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RebootRequest {
    return {
      mode: isSet(object.mode) ? rebootRequest_ModeFromJSON(object.mode) : 0,
    };
  },

  toJSON(message: RebootRequest): unknown {
    const obj: any = {};
    message.mode !== undefined &&
      (obj.mode = rebootRequest_ModeToJSON(message.mode));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RebootRequest>, I>>(
    object: I
  ): RebootRequest {
    const message = createBaseRebootRequest();
    message.mode = object.mode ?? 0;
    return message;
  },
};

function createBaseReboot(): Reboot {
  return { metadata: undefined };
}

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
    const message = createBaseReboot();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: Reboot): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Reboot>, I>>(object: I): Reboot {
    const message = createBaseReboot();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseRebootResponse(): RebootResponse {
  return { messages: [] };
}

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
    const message = createBaseRebootResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Reboot.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<RebootResponse>, I>>(
    object: I
  ): RebootResponse {
    const message = createBaseRebootResponse();
    message.messages = object.messages?.map((e) => Reboot.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBootstrapRequest(): BootstrapRequest {
  return { recover_etcd: false, recover_skip_hash_check: false };
}

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
    const message = createBaseBootstrapRequest();
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
    return {
      recover_etcd: isSet(object.recover_etcd)
        ? Boolean(object.recover_etcd)
        : false,
      recover_skip_hash_check: isSet(object.recover_skip_hash_check)
        ? Boolean(object.recover_skip_hash_check)
        : false,
    };
  },

  toJSON(message: BootstrapRequest): unknown {
    const obj: any = {};
    message.recover_etcd !== undefined &&
      (obj.recover_etcd = message.recover_etcd);
    message.recover_skip_hash_check !== undefined &&
      (obj.recover_skip_hash_check = message.recover_skip_hash_check);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BootstrapRequest>, I>>(
    object: I
  ): BootstrapRequest {
    const message = createBaseBootstrapRequest();
    message.recover_etcd = object.recover_etcd ?? false;
    message.recover_skip_hash_check = object.recover_skip_hash_check ?? false;
    return message;
  },
};

function createBaseBootstrap(): Bootstrap {
  return { metadata: undefined };
}

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
    const message = createBaseBootstrap();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: Bootstrap): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Bootstrap>, I>>(
    object: I
  ): Bootstrap {
    const message = createBaseBootstrap();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseBootstrapResponse(): BootstrapResponse {
  return { messages: [] };
}

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
    const message = createBaseBootstrapResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Bootstrap.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<BootstrapResponse>, I>>(
    object: I
  ): BootstrapResponse {
    const message = createBaseBootstrapResponse();
    message.messages =
      object.messages?.map((e) => Bootstrap.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSequenceEvent(): SequenceEvent {
  return { sequence: "", action: 0, error: undefined };
}

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
    const message = createBaseSequenceEvent();
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
    return {
      sequence: isSet(object.sequence) ? String(object.sequence) : "",
      action: isSet(object.action)
        ? sequenceEvent_ActionFromJSON(object.action)
        : 0,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
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

  fromPartial<I extends Exact<DeepPartial<SequenceEvent>, I>>(
    object: I
  ): SequenceEvent {
    const message = createBaseSequenceEvent();
    message.sequence = object.sequence ?? "";
    message.action = object.action ?? 0;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBasePhaseEvent(): PhaseEvent {
  return { phase: "", action: 0 };
}

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
    const message = createBasePhaseEvent();
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
    return {
      phase: isSet(object.phase) ? String(object.phase) : "",
      action: isSet(object.action)
        ? phaseEvent_ActionFromJSON(object.action)
        : 0,
    };
  },

  toJSON(message: PhaseEvent): unknown {
    const obj: any = {};
    message.phase !== undefined && (obj.phase = message.phase);
    message.action !== undefined &&
      (obj.action = phaseEvent_ActionToJSON(message.action));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PhaseEvent>, I>>(
    object: I
  ): PhaseEvent {
    const message = createBasePhaseEvent();
    message.phase = object.phase ?? "";
    message.action = object.action ?? 0;
    return message;
  },
};

function createBaseTaskEvent(): TaskEvent {
  return { task: "", action: 0 };
}

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
    const message = createBaseTaskEvent();
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
    return {
      task: isSet(object.task) ? String(object.task) : "",
      action: isSet(object.action)
        ? taskEvent_ActionFromJSON(object.action)
        : 0,
    };
  },

  toJSON(message: TaskEvent): unknown {
    const obj: any = {};
    message.task !== undefined && (obj.task = message.task);
    message.action !== undefined &&
      (obj.action = taskEvent_ActionToJSON(message.action));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TaskEvent>, I>>(
    object: I
  ): TaskEvent {
    const message = createBaseTaskEvent();
    message.task = object.task ?? "";
    message.action = object.action ?? 0;
    return message;
  },
};

function createBaseServiceStateEvent(): ServiceStateEvent {
  return { service: "", action: 0, message: "", health: undefined };
}

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
    const message = createBaseServiceStateEvent();
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
    return {
      service: isSet(object.service) ? String(object.service) : "",
      action: isSet(object.action)
        ? serviceStateEvent_ActionFromJSON(object.action)
        : 0,
      message: isSet(object.message) ? String(object.message) : "",
      health: isSet(object.health)
        ? ServiceHealth.fromJSON(object.health)
        : undefined,
    };
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

  fromPartial<I extends Exact<DeepPartial<ServiceStateEvent>, I>>(
    object: I
  ): ServiceStateEvent {
    const message = createBaseServiceStateEvent();
    message.service = object.service ?? "";
    message.action = object.action ?? 0;
    message.message = object.message ?? "";
    message.health =
      object.health !== undefined && object.health !== null
        ? ServiceHealth.fromPartial(object.health)
        : undefined;
    return message;
  },
};

function createBaseRestartEvent(): RestartEvent {
  return { cmd: 0 };
}

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
    const message = createBaseRestartEvent();
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
    return {
      cmd: isSet(object.cmd) ? Number(object.cmd) : 0,
    };
  },

  toJSON(message: RestartEvent): unknown {
    const obj: any = {};
    message.cmd !== undefined && (obj.cmd = Math.round(message.cmd));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RestartEvent>, I>>(
    object: I
  ): RestartEvent {
    const message = createBaseRestartEvent();
    message.cmd = object.cmd ?? 0;
    return message;
  },
};

function createBaseConfigLoadErrorEvent(): ConfigLoadErrorEvent {
  return { error: "" };
}

export const ConfigLoadErrorEvent = {
  encode(
    message: ConfigLoadErrorEvent,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.error !== "") {
      writer.uint32(10).string(message.error);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ConfigLoadErrorEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigLoadErrorEvent();
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

  fromJSON(object: any): ConfigLoadErrorEvent {
    return {
      error: isSet(object.error) ? String(object.error) : "",
    };
  },

  toJSON(message: ConfigLoadErrorEvent): unknown {
    const obj: any = {};
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConfigLoadErrorEvent>, I>>(
    object: I
  ): ConfigLoadErrorEvent {
    const message = createBaseConfigLoadErrorEvent();
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseConfigValidationErrorEvent(): ConfigValidationErrorEvent {
  return { error: "" };
}

export const ConfigValidationErrorEvent = {
  encode(
    message: ConfigValidationErrorEvent,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.error !== "") {
      writer.uint32(10).string(message.error);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): ConfigValidationErrorEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigValidationErrorEvent();
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

  fromJSON(object: any): ConfigValidationErrorEvent {
    return {
      error: isSet(object.error) ? String(object.error) : "",
    };
  },

  toJSON(message: ConfigValidationErrorEvent): unknown {
    const obj: any = {};
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConfigValidationErrorEvent>, I>>(
    object: I
  ): ConfigValidationErrorEvent {
    const message = createBaseConfigValidationErrorEvent();
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseAddressEvent(): AddressEvent {
  return { hostname: "", addresses: [] };
}

export const AddressEvent = {
  encode(message: AddressEvent, writer: Writer = Writer.create()): Writer {
    if (message.hostname !== "") {
      writer.uint32(10).string(message.hostname);
    }
    for (const v of message.addresses) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AddressEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddressEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostname = reader.string();
          break;
        case 2:
          message.addresses.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddressEvent {
    return {
      hostname: isSet(object.hostname) ? String(object.hostname) : "",
      addresses: Array.isArray(object?.addresses)
        ? object.addresses.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: AddressEvent): unknown {
    const obj: any = {};
    message.hostname !== undefined && (obj.hostname = message.hostname);
    if (message.addresses) {
      obj.addresses = message.addresses.map((e) => e);
    } else {
      obj.addresses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddressEvent>, I>>(
    object: I
  ): AddressEvent {
    const message = createBaseAddressEvent();
    message.hostname = object.hostname ?? "";
    message.addresses = object.addresses?.map((e) => e) || [];
    return message;
  },
};

function createBaseEventsRequest(): EventsRequest {
  return { tail_events: 0, tail_id: "", tail_seconds: 0 };
}

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
    const message = createBaseEventsRequest();
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
    return {
      tail_events: isSet(object.tail_events) ? Number(object.tail_events) : 0,
      tail_id: isSet(object.tail_id) ? String(object.tail_id) : "",
      tail_seconds: isSet(object.tail_seconds)
        ? Number(object.tail_seconds)
        : 0,
    };
  },

  toJSON(message: EventsRequest): unknown {
    const obj: any = {};
    message.tail_events !== undefined &&
      (obj.tail_events = Math.round(message.tail_events));
    message.tail_id !== undefined && (obj.tail_id = message.tail_id);
    message.tail_seconds !== undefined &&
      (obj.tail_seconds = Math.round(message.tail_seconds));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventsRequest>, I>>(
    object: I
  ): EventsRequest {
    const message = createBaseEventsRequest();
    message.tail_events = object.tail_events ?? 0;
    message.tail_id = object.tail_id ?? "";
    message.tail_seconds = object.tail_seconds ?? 0;
    return message;
  },
};

function createBaseEvent(): Event {
  return { metadata: undefined, data: undefined, id: "" };
}

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
    const message = createBaseEvent();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      data: isSet(object.data) ? Any.fromJSON(object.data) : undefined,
      id: isSet(object.id) ? String(object.id) : "",
    };
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

  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = createBaseEvent();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.data =
      object.data !== undefined && object.data !== null
        ? Any.fromPartial(object.data)
        : undefined;
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseResetPartitionSpec(): ResetPartitionSpec {
  return { label: "", wipe: false };
}

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
    const message = createBaseResetPartitionSpec();
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
    return {
      label: isSet(object.label) ? String(object.label) : "",
      wipe: isSet(object.wipe) ? Boolean(object.wipe) : false,
    };
  },

  toJSON(message: ResetPartitionSpec): unknown {
    const obj: any = {};
    message.label !== undefined && (obj.label = message.label);
    message.wipe !== undefined && (obj.wipe = message.wipe);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResetPartitionSpec>, I>>(
    object: I
  ): ResetPartitionSpec {
    const message = createBaseResetPartitionSpec();
    message.label = object.label ?? "";
    message.wipe = object.wipe ?? false;
    return message;
  },
};

function createBaseResetRequest(): ResetRequest {
  return { graceful: false, reboot: false, system_partitions_to_wipe: [] };
}

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
    const message = createBaseResetRequest();
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
    return {
      graceful: isSet(object.graceful) ? Boolean(object.graceful) : false,
      reboot: isSet(object.reboot) ? Boolean(object.reboot) : false,
      system_partitions_to_wipe: Array.isArray(
        object?.system_partitions_to_wipe
      )
        ? object.system_partitions_to_wipe.map((e: any) =>
            ResetPartitionSpec.fromJSON(e)
          )
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<ResetRequest>, I>>(
    object: I
  ): ResetRequest {
    const message = createBaseResetRequest();
    message.graceful = object.graceful ?? false;
    message.reboot = object.reboot ?? false;
    message.system_partitions_to_wipe =
      object.system_partitions_to_wipe?.map((e) =>
        ResetPartitionSpec.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseReset(): Reset {
  return { metadata: undefined };
}

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
    const message = createBaseReset();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: Reset): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Reset>, I>>(object: I): Reset {
    const message = createBaseReset();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseResetResponse(): ResetResponse {
  return { messages: [] };
}

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
    const message = createBaseResetResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Reset.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<ResetResponse>, I>>(
    object: I
  ): ResetResponse {
    const message = createBaseResetResponse();
    message.messages = object.messages?.map((e) => Reset.fromPartial(e)) || [];
    return message;
  },
};

function createBaseShutdown(): Shutdown {
  return { metadata: undefined };
}

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
    const message = createBaseShutdown();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: Shutdown): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Shutdown>, I>>(object: I): Shutdown {
    const message = createBaseShutdown();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseShutdownRequest(): ShutdownRequest {
  return { force: false };
}

export const ShutdownRequest = {
  encode(message: ShutdownRequest, writer: Writer = Writer.create()): Writer {
    if (message.force === true) {
      writer.uint32(8).bool(message.force);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ShutdownRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseShutdownRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.force = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ShutdownRequest {
    return {
      force: isSet(object.force) ? Boolean(object.force) : false,
    };
  },

  toJSON(message: ShutdownRequest): unknown {
    const obj: any = {};
    message.force !== undefined && (obj.force = message.force);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ShutdownRequest>, I>>(
    object: I
  ): ShutdownRequest {
    const message = createBaseShutdownRequest();
    message.force = object.force ?? false;
    return message;
  },
};

function createBaseShutdownResponse(): ShutdownResponse {
  return { messages: [] };
}

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
    const message = createBaseShutdownResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Shutdown.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<ShutdownResponse>, I>>(
    object: I
  ): ShutdownResponse {
    const message = createBaseShutdownResponse();
    message.messages =
      object.messages?.map((e) => Shutdown.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUpgradeRequest(): UpgradeRequest {
  return { image: "", preserve: false, stage: false, force: false };
}

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
    const message = createBaseUpgradeRequest();
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
    return {
      image: isSet(object.image) ? String(object.image) : "",
      preserve: isSet(object.preserve) ? Boolean(object.preserve) : false,
      stage: isSet(object.stage) ? Boolean(object.stage) : false,
      force: isSet(object.force) ? Boolean(object.force) : false,
    };
  },

  toJSON(message: UpgradeRequest): unknown {
    const obj: any = {};
    message.image !== undefined && (obj.image = message.image);
    message.preserve !== undefined && (obj.preserve = message.preserve);
    message.stage !== undefined && (obj.stage = message.stage);
    message.force !== undefined && (obj.force = message.force);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpgradeRequest>, I>>(
    object: I
  ): UpgradeRequest {
    const message = createBaseUpgradeRequest();
    message.image = object.image ?? "";
    message.preserve = object.preserve ?? false;
    message.stage = object.stage ?? false;
    message.force = object.force ?? false;
    return message;
  },
};

function createBaseUpgrade(): Upgrade {
  return { metadata: undefined, ack: "" };
}

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
    const message = createBaseUpgrade();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      ack: isSet(object.ack) ? String(object.ack) : "",
    };
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

  fromPartial<I extends Exact<DeepPartial<Upgrade>, I>>(object: I): Upgrade {
    const message = createBaseUpgrade();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.ack = object.ack ?? "";
    return message;
  },
};

function createBaseUpgradeResponse(): UpgradeResponse {
  return { messages: [] };
}

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
    const message = createBaseUpgradeResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Upgrade.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<UpgradeResponse>, I>>(
    object: I
  ): UpgradeResponse {
    const message = createBaseUpgradeResponse();
    message.messages =
      object.messages?.map((e) => Upgrade.fromPartial(e)) || [];
    return message;
  },
};

function createBaseServiceList(): ServiceList {
  return { metadata: undefined, services: [] };
}

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
    const message = createBaseServiceList();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      services: Array.isArray(object?.services)
        ? object.services.map((e: any) => ServiceInfo.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<ServiceList>, I>>(
    object: I
  ): ServiceList {
    const message = createBaseServiceList();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.services =
      object.services?.map((e) => ServiceInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseServiceListResponse(): ServiceListResponse {
  return { messages: [] };
}

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
    const message = createBaseServiceListResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => ServiceList.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<ServiceListResponse>, I>>(
    object: I
  ): ServiceListResponse {
    const message = createBaseServiceListResponse();
    message.messages =
      object.messages?.map((e) => ServiceList.fromPartial(e)) || [];
    return message;
  },
};

function createBaseServiceInfo(): ServiceInfo {
  return { id: "", state: "", events: undefined, health: undefined };
}

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
    const message = createBaseServiceInfo();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
      state: isSet(object.state) ? String(object.state) : "",
      events: isSet(object.events)
        ? ServiceEvents.fromJSON(object.events)
        : undefined,
      health: isSet(object.health)
        ? ServiceHealth.fromJSON(object.health)
        : undefined,
    };
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

  fromPartial<I extends Exact<DeepPartial<ServiceInfo>, I>>(
    object: I
  ): ServiceInfo {
    const message = createBaseServiceInfo();
    message.id = object.id ?? "";
    message.state = object.state ?? "";
    message.events =
      object.events !== undefined && object.events !== null
        ? ServiceEvents.fromPartial(object.events)
        : undefined;
    message.health =
      object.health !== undefined && object.health !== null
        ? ServiceHealth.fromPartial(object.health)
        : undefined;
    return message;
  },
};

function createBaseServiceEvents(): ServiceEvents {
  return { events: [] };
}

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
    const message = createBaseServiceEvents();
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
    return {
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => ServiceEvent.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<ServiceEvents>, I>>(
    object: I
  ): ServiceEvents {
    const message = createBaseServiceEvents();
    message.events =
      object.events?.map((e) => ServiceEvent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseServiceEvent(): ServiceEvent {
  return { msg: "", state: "", ts: undefined };
}

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
    const message = createBaseServiceEvent();
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
    return {
      msg: isSet(object.msg) ? String(object.msg) : "",
      state: isSet(object.state) ? String(object.state) : "",
      ts: isSet(object.ts) ? fromJsonTimestamp(object.ts) : undefined,
    };
  },

  toJSON(message: ServiceEvent): unknown {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg);
    message.state !== undefined && (obj.state = message.state);
    message.ts !== undefined && (obj.ts = message.ts.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ServiceEvent>, I>>(
    object: I
  ): ServiceEvent {
    const message = createBaseServiceEvent();
    message.msg = object.msg ?? "";
    message.state = object.state ?? "";
    message.ts = object.ts ?? undefined;
    return message;
  },
};

function createBaseServiceHealth(): ServiceHealth {
  return {
    unknown: false,
    healthy: false,
    last_message: "",
    last_change: undefined,
  };
}

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
    const message = createBaseServiceHealth();
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
    return {
      unknown: isSet(object.unknown) ? Boolean(object.unknown) : false,
      healthy: isSet(object.healthy) ? Boolean(object.healthy) : false,
      last_message: isSet(object.last_message)
        ? String(object.last_message)
        : "",
      last_change: isSet(object.last_change)
        ? fromJsonTimestamp(object.last_change)
        : undefined,
    };
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

  fromPartial<I extends Exact<DeepPartial<ServiceHealth>, I>>(
    object: I
  ): ServiceHealth {
    const message = createBaseServiceHealth();
    message.unknown = object.unknown ?? false;
    message.healthy = object.healthy ?? false;
    message.last_message = object.last_message ?? "";
    message.last_change = object.last_change ?? undefined;
    return message;
  },
};

function createBaseServiceStartRequest(): ServiceStartRequest {
  return { id: "" };
}

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
    const message = createBaseServiceStartRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: ServiceStartRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ServiceStartRequest>, I>>(
    object: I
  ): ServiceStartRequest {
    const message = createBaseServiceStartRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseServiceStart(): ServiceStart {
  return { metadata: undefined, resp: "" };
}

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
    const message = createBaseServiceStart();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      resp: isSet(object.resp) ? String(object.resp) : "",
    };
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

  fromPartial<I extends Exact<DeepPartial<ServiceStart>, I>>(
    object: I
  ): ServiceStart {
    const message = createBaseServiceStart();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.resp = object.resp ?? "";
    return message;
  },
};

function createBaseServiceStartResponse(): ServiceStartResponse {
  return { messages: [] };
}

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
    const message = createBaseServiceStartResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => ServiceStart.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<ServiceStartResponse>, I>>(
    object: I
  ): ServiceStartResponse {
    const message = createBaseServiceStartResponse();
    message.messages =
      object.messages?.map((e) => ServiceStart.fromPartial(e)) || [];
    return message;
  },
};

function createBaseServiceStopRequest(): ServiceStopRequest {
  return { id: "" };
}

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
    const message = createBaseServiceStopRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: ServiceStopRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ServiceStopRequest>, I>>(
    object: I
  ): ServiceStopRequest {
    const message = createBaseServiceStopRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseServiceStop(): ServiceStop {
  return { metadata: undefined, resp: "" };
}

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
    const message = createBaseServiceStop();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      resp: isSet(object.resp) ? String(object.resp) : "",
    };
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

  fromPartial<I extends Exact<DeepPartial<ServiceStop>, I>>(
    object: I
  ): ServiceStop {
    const message = createBaseServiceStop();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.resp = object.resp ?? "";
    return message;
  },
};

function createBaseServiceStopResponse(): ServiceStopResponse {
  return { messages: [] };
}

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
    const message = createBaseServiceStopResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => ServiceStop.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<ServiceStopResponse>, I>>(
    object: I
  ): ServiceStopResponse {
    const message = createBaseServiceStopResponse();
    message.messages =
      object.messages?.map((e) => ServiceStop.fromPartial(e)) || [];
    return message;
  },
};

function createBaseServiceRestartRequest(): ServiceRestartRequest {
  return { id: "" };
}

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
    const message = createBaseServiceRestartRequest();
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
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: ServiceRestartRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ServiceRestartRequest>, I>>(
    object: I
  ): ServiceRestartRequest {
    const message = createBaseServiceRestartRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseServiceRestart(): ServiceRestart {
  return { metadata: undefined, resp: "" };
}

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
    const message = createBaseServiceRestart();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      resp: isSet(object.resp) ? String(object.resp) : "",
    };
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

  fromPartial<I extends Exact<DeepPartial<ServiceRestart>, I>>(
    object: I
  ): ServiceRestart {
    const message = createBaseServiceRestart();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.resp = object.resp ?? "";
    return message;
  },
};

function createBaseServiceRestartResponse(): ServiceRestartResponse {
  return { messages: [] };
}

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
    const message = createBaseServiceRestartResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => ServiceRestart.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<ServiceRestartResponse>, I>>(
    object: I
  ): ServiceRestartResponse {
    const message = createBaseServiceRestartResponse();
    message.messages =
      object.messages?.map((e) => ServiceRestart.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCopyRequest(): CopyRequest {
  return { root_path: "" };
}

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
    const message = createBaseCopyRequest();
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
    return {
      root_path: isSet(object.root_path) ? String(object.root_path) : "",
    };
  },

  toJSON(message: CopyRequest): unknown {
    const obj: any = {};
    message.root_path !== undefined && (obj.root_path = message.root_path);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CopyRequest>, I>>(
    object: I
  ): CopyRequest {
    const message = createBaseCopyRequest();
    message.root_path = object.root_path ?? "";
    return message;
  },
};

function createBaseListRequest(): ListRequest {
  return { root: "", recurse: false, recursion_depth: 0, types: [] };
}

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
    const message = createBaseListRequest();
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
    return {
      root: isSet(object.root) ? String(object.root) : "",
      recurse: isSet(object.recurse) ? Boolean(object.recurse) : false,
      recursion_depth: isSet(object.recursion_depth)
        ? Number(object.recursion_depth)
        : 0,
      types: Array.isArray(object?.types)
        ? object.types.map((e: any) => listRequest_TypeFromJSON(e))
        : [],
    };
  },

  toJSON(message: ListRequest): unknown {
    const obj: any = {};
    message.root !== undefined && (obj.root = message.root);
    message.recurse !== undefined && (obj.recurse = message.recurse);
    message.recursion_depth !== undefined &&
      (obj.recursion_depth = Math.round(message.recursion_depth));
    if (message.types) {
      obj.types = message.types.map((e) => listRequest_TypeToJSON(e));
    } else {
      obj.types = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListRequest>, I>>(
    object: I
  ): ListRequest {
    const message = createBaseListRequest();
    message.root = object.root ?? "";
    message.recurse = object.recurse ?? false;
    message.recursion_depth = object.recursion_depth ?? 0;
    message.types = object.types?.map((e) => e) || [];
    return message;
  },
};

function createBaseDiskUsageRequest(): DiskUsageRequest {
  return { recursion_depth: 0, all: false, threshold: 0, paths: [] };
}

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
    const message = createBaseDiskUsageRequest();
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
    return {
      recursion_depth: isSet(object.recursion_depth)
        ? Number(object.recursion_depth)
        : 0,
      all: isSet(object.all) ? Boolean(object.all) : false,
      threshold: isSet(object.threshold) ? Number(object.threshold) : 0,
      paths: Array.isArray(object?.paths)
        ? object.paths.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: DiskUsageRequest): unknown {
    const obj: any = {};
    message.recursion_depth !== undefined &&
      (obj.recursion_depth = Math.round(message.recursion_depth));
    message.all !== undefined && (obj.all = message.all);
    message.threshold !== undefined &&
      (obj.threshold = Math.round(message.threshold));
    if (message.paths) {
      obj.paths = message.paths.map((e) => e);
    } else {
      obj.paths = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DiskUsageRequest>, I>>(
    object: I
  ): DiskUsageRequest {
    const message = createBaseDiskUsageRequest();
    message.recursion_depth = object.recursion_depth ?? 0;
    message.all = object.all ?? false;
    message.threshold = object.threshold ?? 0;
    message.paths = object.paths?.map((e) => e) || [];
    return message;
  },
};

function createBaseFileInfo(): FileInfo {
  return {
    metadata: undefined,
    name: "",
    size: 0,
    mode: 0,
    modified: 0,
    is_dir: false,
    error: "",
    link: "",
    relative_name: "",
    uid: 0,
    gid: 0,
  };
}

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
    if (message.uid !== 0) {
      writer.uint32(80).uint32(message.uid);
    }
    if (message.gid !== 0) {
      writer.uint32(88).uint32(message.gid);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FileInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileInfo();
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
        case 10:
          message.uid = reader.uint32();
          break;
        case 11:
          message.gid = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FileInfo {
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      size: isSet(object.size) ? Number(object.size) : 0,
      mode: isSet(object.mode) ? Number(object.mode) : 0,
      modified: isSet(object.modified) ? Number(object.modified) : 0,
      is_dir: isSet(object.is_dir) ? Boolean(object.is_dir) : false,
      error: isSet(object.error) ? String(object.error) : "",
      link: isSet(object.link) ? String(object.link) : "",
      relative_name: isSet(object.relative_name)
        ? String(object.relative_name)
        : "",
      uid: isSet(object.uid) ? Number(object.uid) : 0,
      gid: isSet(object.gid) ? Number(object.gid) : 0,
    };
  },

  toJSON(message: FileInfo): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.size !== undefined && (obj.size = Math.round(message.size));
    message.mode !== undefined && (obj.mode = Math.round(message.mode));
    message.modified !== undefined &&
      (obj.modified = Math.round(message.modified));
    message.is_dir !== undefined && (obj.is_dir = message.is_dir);
    message.error !== undefined && (obj.error = message.error);
    message.link !== undefined && (obj.link = message.link);
    message.relative_name !== undefined &&
      (obj.relative_name = message.relative_name);
    message.uid !== undefined && (obj.uid = Math.round(message.uid));
    message.gid !== undefined && (obj.gid = Math.round(message.gid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FileInfo>, I>>(object: I): FileInfo {
    const message = createBaseFileInfo();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.name = object.name ?? "";
    message.size = object.size ?? 0;
    message.mode = object.mode ?? 0;
    message.modified = object.modified ?? 0;
    message.is_dir = object.is_dir ?? false;
    message.error = object.error ?? "";
    message.link = object.link ?? "";
    message.relative_name = object.relative_name ?? "";
    message.uid = object.uid ?? 0;
    message.gid = object.gid ?? 0;
    return message;
  },
};

function createBaseDiskUsageInfo(): DiskUsageInfo {
  return {
    metadata: undefined,
    name: "",
    size: 0,
    error: "",
    relative_name: "",
  };
}

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
    const message = createBaseDiskUsageInfo();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      size: isSet(object.size) ? Number(object.size) : 0,
      error: isSet(object.error) ? String(object.error) : "",
      relative_name: isSet(object.relative_name)
        ? String(object.relative_name)
        : "",
    };
  },

  toJSON(message: DiskUsageInfo): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.size !== undefined && (obj.size = Math.round(message.size));
    message.error !== undefined && (obj.error = message.error);
    message.relative_name !== undefined &&
      (obj.relative_name = message.relative_name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DiskUsageInfo>, I>>(
    object: I
  ): DiskUsageInfo {
    const message = createBaseDiskUsageInfo();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.name = object.name ?? "";
    message.size = object.size ?? 0;
    message.error = object.error ?? "";
    message.relative_name = object.relative_name ?? "";
    return message;
  },
};

function createBaseMounts(): Mounts {
  return { metadata: undefined, stats: [] };
}

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
    const message = createBaseMounts();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      stats: Array.isArray(object?.stats)
        ? object.stats.map((e: any) => MountStat.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<Mounts>, I>>(object: I): Mounts {
    const message = createBaseMounts();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.stats = object.stats?.map((e) => MountStat.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMountsResponse(): MountsResponse {
  return { messages: [] };
}

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
    const message = createBaseMountsResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Mounts.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<MountsResponse>, I>>(
    object: I
  ): MountsResponse {
    const message = createBaseMountsResponse();
    message.messages = object.messages?.map((e) => Mounts.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMountStat(): MountStat {
  return { filesystem: "", size: 0, available: 0, mounted_on: "" };
}

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
    const message = createBaseMountStat();
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
    return {
      filesystem: isSet(object.filesystem) ? String(object.filesystem) : "",
      size: isSet(object.size) ? Number(object.size) : 0,
      available: isSet(object.available) ? Number(object.available) : 0,
      mounted_on: isSet(object.mounted_on) ? String(object.mounted_on) : "",
    };
  },

  toJSON(message: MountStat): unknown {
    const obj: any = {};
    message.filesystem !== undefined && (obj.filesystem = message.filesystem);
    message.size !== undefined && (obj.size = Math.round(message.size));
    message.available !== undefined &&
      (obj.available = Math.round(message.available));
    message.mounted_on !== undefined && (obj.mounted_on = message.mounted_on);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MountStat>, I>>(
    object: I
  ): MountStat {
    const message = createBaseMountStat();
    message.filesystem = object.filesystem ?? "";
    message.size = object.size ?? 0;
    message.available = object.available ?? 0;
    message.mounted_on = object.mounted_on ?? "";
    return message;
  },
};

function createBaseVersion(): Version {
  return {
    metadata: undefined,
    version: undefined,
    platform: undefined,
    features: undefined,
  };
}

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
    if (message.features !== undefined) {
      FeaturesInfo.encode(message.features, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Version {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVersion();
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
        case 4:
          message.features = FeaturesInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Version {
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      version: isSet(object.version)
        ? VersionInfo.fromJSON(object.version)
        : undefined,
      platform: isSet(object.platform)
        ? PlatformInfo.fromJSON(object.platform)
        : undefined,
      features: isSet(object.features)
        ? FeaturesInfo.fromJSON(object.features)
        : undefined,
    };
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
    message.features !== undefined &&
      (obj.features = message.features
        ? FeaturesInfo.toJSON(message.features)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Version>, I>>(object: I): Version {
    const message = createBaseVersion();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.version =
      object.version !== undefined && object.version !== null
        ? VersionInfo.fromPartial(object.version)
        : undefined;
    message.platform =
      object.platform !== undefined && object.platform !== null
        ? PlatformInfo.fromPartial(object.platform)
        : undefined;
    message.features =
      object.features !== undefined && object.features !== null
        ? FeaturesInfo.fromPartial(object.features)
        : undefined;
    return message;
  },
};

function createBaseVersionResponse(): VersionResponse {
  return { messages: [] };
}

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
    const message = createBaseVersionResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Version.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<VersionResponse>, I>>(
    object: I
  ): VersionResponse {
    const message = createBaseVersionResponse();
    message.messages =
      object.messages?.map((e) => Version.fromPartial(e)) || [];
    return message;
  },
};

function createBaseVersionInfo(): VersionInfo {
  return { tag: "", sha: "", built: "", go_version: "", os: "", arch: "" };
}

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
    const message = createBaseVersionInfo();
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
    return {
      tag: isSet(object.tag) ? String(object.tag) : "",
      sha: isSet(object.sha) ? String(object.sha) : "",
      built: isSet(object.built) ? String(object.built) : "",
      go_version: isSet(object.go_version) ? String(object.go_version) : "",
      os: isSet(object.os) ? String(object.os) : "",
      arch: isSet(object.arch) ? String(object.arch) : "",
    };
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

  fromPartial<I extends Exact<DeepPartial<VersionInfo>, I>>(
    object: I
  ): VersionInfo {
    const message = createBaseVersionInfo();
    message.tag = object.tag ?? "";
    message.sha = object.sha ?? "";
    message.built = object.built ?? "";
    message.go_version = object.go_version ?? "";
    message.os = object.os ?? "";
    message.arch = object.arch ?? "";
    return message;
  },
};

function createBasePlatformInfo(): PlatformInfo {
  return { name: "", mode: "" };
}

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
    const message = createBasePlatformInfo();
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
    return {
      name: isSet(object.name) ? String(object.name) : "",
      mode: isSet(object.mode) ? String(object.mode) : "",
    };
  },

  toJSON(message: PlatformInfo): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.mode !== undefined && (obj.mode = message.mode);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlatformInfo>, I>>(
    object: I
  ): PlatformInfo {
    const message = createBasePlatformInfo();
    message.name = object.name ?? "";
    message.mode = object.mode ?? "";
    return message;
  },
};

function createBaseFeaturesInfo(): FeaturesInfo {
  return { rbac: false };
}

export const FeaturesInfo = {
  encode(message: FeaturesInfo, writer: Writer = Writer.create()): Writer {
    if (message.rbac === true) {
      writer.uint32(8).bool(message.rbac);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FeaturesInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeaturesInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rbac = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FeaturesInfo {
    return {
      rbac: isSet(object.rbac) ? Boolean(object.rbac) : false,
    };
  },

  toJSON(message: FeaturesInfo): unknown {
    const obj: any = {};
    message.rbac !== undefined && (obj.rbac = message.rbac);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FeaturesInfo>, I>>(
    object: I
  ): FeaturesInfo {
    const message = createBaseFeaturesInfo();
    message.rbac = object.rbac ?? false;
    return message;
  },
};

function createBaseLogsRequest(): LogsRequest {
  return { namespace: "", id: "", driver: 0, follow: false, tail_lines: 0 };
}

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
    const message = createBaseLogsRequest();
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
    return {
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      id: isSet(object.id) ? String(object.id) : "",
      driver: isSet(object.driver) ? containerDriverFromJSON(object.driver) : 0,
      follow: isSet(object.follow) ? Boolean(object.follow) : false,
      tail_lines: isSet(object.tail_lines) ? Number(object.tail_lines) : 0,
    };
  },

  toJSON(message: LogsRequest): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.id !== undefined && (obj.id = message.id);
    message.driver !== undefined &&
      (obj.driver = containerDriverToJSON(message.driver));
    message.follow !== undefined && (obj.follow = message.follow);
    message.tail_lines !== undefined &&
      (obj.tail_lines = Math.round(message.tail_lines));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LogsRequest>, I>>(
    object: I
  ): LogsRequest {
    const message = createBaseLogsRequest();
    message.namespace = object.namespace ?? "";
    message.id = object.id ?? "";
    message.driver = object.driver ?? 0;
    message.follow = object.follow ?? false;
    message.tail_lines = object.tail_lines ?? 0;
    return message;
  },
};

function createBaseReadRequest(): ReadRequest {
  return { path: "" };
}

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
    const message = createBaseReadRequest();
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
    return {
      path: isSet(object.path) ? String(object.path) : "",
    };
  },

  toJSON(message: ReadRequest): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ReadRequest>, I>>(
    object: I
  ): ReadRequest {
    const message = createBaseReadRequest();
    message.path = object.path ?? "";
    return message;
  },
};

function createBaseRollbackRequest(): RollbackRequest {
  return {};
}

export const RollbackRequest = {
  encode(_: RollbackRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RollbackRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRollbackRequest();
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
    return {};
  },

  toJSON(_: RollbackRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RollbackRequest>, I>>(
    _: I
  ): RollbackRequest {
    const message = createBaseRollbackRequest();
    return message;
  },
};

function createBaseRollback(): Rollback {
  return { metadata: undefined };
}

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
    const message = createBaseRollback();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: Rollback): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Rollback>, I>>(object: I): Rollback {
    const message = createBaseRollback();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseRollbackResponse(): RollbackResponse {
  return { messages: [] };
}

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
    const message = createBaseRollbackResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Rollback.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<RollbackResponse>, I>>(
    object: I
  ): RollbackResponse {
    const message = createBaseRollbackResponse();
    message.messages =
      object.messages?.map((e) => Rollback.fromPartial(e)) || [];
    return message;
  },
};

function createBaseContainersRequest(): ContainersRequest {
  return { namespace: "", driver: 0 };
}

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
    const message = createBaseContainersRequest();
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
    return {
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      driver: isSet(object.driver) ? containerDriverFromJSON(object.driver) : 0,
    };
  },

  toJSON(message: ContainersRequest): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.driver !== undefined &&
      (obj.driver = containerDriverToJSON(message.driver));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ContainersRequest>, I>>(
    object: I
  ): ContainersRequest {
    const message = createBaseContainersRequest();
    message.namespace = object.namespace ?? "";
    message.driver = object.driver ?? 0;
    return message;
  },
};

function createBaseContainerInfo(): ContainerInfo {
  return {
    namespace: "",
    id: "",
    image: "",
    pid: 0,
    status: "",
    pod_id: "",
    name: "",
  };
}

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
    const message = createBaseContainerInfo();
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
    return {
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      id: isSet(object.id) ? String(object.id) : "",
      image: isSet(object.image) ? String(object.image) : "",
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      status: isSet(object.status) ? String(object.status) : "",
      pod_id: isSet(object.pod_id) ? String(object.pod_id) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: ContainerInfo): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.id !== undefined && (obj.id = message.id);
    message.image !== undefined && (obj.image = message.image);
    message.pid !== undefined && (obj.pid = Math.round(message.pid));
    message.status !== undefined && (obj.status = message.status);
    message.pod_id !== undefined && (obj.pod_id = message.pod_id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ContainerInfo>, I>>(
    object: I
  ): ContainerInfo {
    const message = createBaseContainerInfo();
    message.namespace = object.namespace ?? "";
    message.id = object.id ?? "";
    message.image = object.image ?? "";
    message.pid = object.pid ?? 0;
    message.status = object.status ?? "";
    message.pod_id = object.pod_id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseContainer(): Container {
  return { metadata: undefined, containers: [] };
}

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
    const message = createBaseContainer();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      containers: Array.isArray(object?.containers)
        ? object.containers.map((e: any) => ContainerInfo.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<Container>, I>>(
    object: I
  ): Container {
    const message = createBaseContainer();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.containers =
      object.containers?.map((e) => ContainerInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseContainersResponse(): ContainersResponse {
  return { messages: [] };
}

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
    const message = createBaseContainersResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Container.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<ContainersResponse>, I>>(
    object: I
  ): ContainersResponse {
    const message = createBaseContainersResponse();
    message.messages =
      object.messages?.map((e) => Container.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDmesgRequest(): DmesgRequest {
  return { follow: false, tail: false };
}

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
    const message = createBaseDmesgRequest();
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
    return {
      follow: isSet(object.follow) ? Boolean(object.follow) : false,
      tail: isSet(object.tail) ? Boolean(object.tail) : false,
    };
  },

  toJSON(message: DmesgRequest): unknown {
    const obj: any = {};
    message.follow !== undefined && (obj.follow = message.follow);
    message.tail !== undefined && (obj.tail = message.tail);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DmesgRequest>, I>>(
    object: I
  ): DmesgRequest {
    const message = createBaseDmesgRequest();
    message.follow = object.follow ?? false;
    message.tail = object.tail ?? false;
    return message;
  },
};

function createBaseProcessesResponse(): ProcessesResponse {
  return { messages: [] };
}

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
    const message = createBaseProcessesResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Process.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<ProcessesResponse>, I>>(
    object: I
  ): ProcessesResponse {
    const message = createBaseProcessesResponse();
    message.messages =
      object.messages?.map((e) => Process.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProcess(): Process {
  return { metadata: undefined, processes: [] };
}

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
    const message = createBaseProcess();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      processes: Array.isArray(object?.processes)
        ? object.processes.map((e: any) => ProcessInfo.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<Process>, I>>(object: I): Process {
    const message = createBaseProcess();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.processes =
      object.processes?.map((e) => ProcessInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProcessInfo(): ProcessInfo {
  return {
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
}

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
    const message = createBaseProcessInfo();
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
    return {
      pid: isSet(object.pid) ? Number(object.pid) : 0,
      ppid: isSet(object.ppid) ? Number(object.ppid) : 0,
      state: isSet(object.state) ? String(object.state) : "",
      threads: isSet(object.threads) ? Number(object.threads) : 0,
      cpu_time: isSet(object.cpu_time) ? Number(object.cpu_time) : 0,
      virtual_memory: isSet(object.virtual_memory)
        ? Number(object.virtual_memory)
        : 0,
      resident_memory: isSet(object.resident_memory)
        ? Number(object.resident_memory)
        : 0,
      command: isSet(object.command) ? String(object.command) : "",
      executable: isSet(object.executable) ? String(object.executable) : "",
      args: isSet(object.args) ? String(object.args) : "",
    };
  },

  toJSON(message: ProcessInfo): unknown {
    const obj: any = {};
    message.pid !== undefined && (obj.pid = Math.round(message.pid));
    message.ppid !== undefined && (obj.ppid = Math.round(message.ppid));
    message.state !== undefined && (obj.state = message.state);
    message.threads !== undefined &&
      (obj.threads = Math.round(message.threads));
    message.cpu_time !== undefined && (obj.cpu_time = message.cpu_time);
    message.virtual_memory !== undefined &&
      (obj.virtual_memory = Math.round(message.virtual_memory));
    message.resident_memory !== undefined &&
      (obj.resident_memory = Math.round(message.resident_memory));
    message.command !== undefined && (obj.command = message.command);
    message.executable !== undefined && (obj.executable = message.executable);
    message.args !== undefined && (obj.args = message.args);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProcessInfo>, I>>(
    object: I
  ): ProcessInfo {
    const message = createBaseProcessInfo();
    message.pid = object.pid ?? 0;
    message.ppid = object.ppid ?? 0;
    message.state = object.state ?? "";
    message.threads = object.threads ?? 0;
    message.cpu_time = object.cpu_time ?? 0;
    message.virtual_memory = object.virtual_memory ?? 0;
    message.resident_memory = object.resident_memory ?? 0;
    message.command = object.command ?? "";
    message.executable = object.executable ?? "";
    message.args = object.args ?? "";
    return message;
  },
};

function createBaseRestartRequest(): RestartRequest {
  return { namespace: "", id: "", driver: 0 };
}

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
    const message = createBaseRestartRequest();
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
    return {
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      id: isSet(object.id) ? String(object.id) : "",
      driver: isSet(object.driver) ? containerDriverFromJSON(object.driver) : 0,
    };
  },

  toJSON(message: RestartRequest): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.id !== undefined && (obj.id = message.id);
    message.driver !== undefined &&
      (obj.driver = containerDriverToJSON(message.driver));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RestartRequest>, I>>(
    object: I
  ): RestartRequest {
    const message = createBaseRestartRequest();
    message.namespace = object.namespace ?? "";
    message.id = object.id ?? "";
    message.driver = object.driver ?? 0;
    return message;
  },
};

function createBaseRestart(): Restart {
  return { metadata: undefined };
}

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
    const message = createBaseRestart();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: Restart): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Restart>, I>>(object: I): Restart {
    const message = createBaseRestart();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseRestartResponse(): RestartResponse {
  return { messages: [] };
}

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
    const message = createBaseRestartResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Restart.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<RestartResponse>, I>>(
    object: I
  ): RestartResponse {
    const message = createBaseRestartResponse();
    message.messages =
      object.messages?.map((e) => Restart.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStatsRequest(): StatsRequest {
  return { namespace: "", driver: 0 };
}

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
    const message = createBaseStatsRequest();
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
    return {
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      driver: isSet(object.driver) ? containerDriverFromJSON(object.driver) : 0,
    };
  },

  toJSON(message: StatsRequest): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.driver !== undefined &&
      (obj.driver = containerDriverToJSON(message.driver));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatsRequest>, I>>(
    object: I
  ): StatsRequest {
    const message = createBaseStatsRequest();
    message.namespace = object.namespace ?? "";
    message.driver = object.driver ?? 0;
    return message;
  },
};

function createBaseStats(): Stats {
  return { metadata: undefined, stats: [] };
}

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
    const message = createBaseStats();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      stats: Array.isArray(object?.stats)
        ? object.stats.map((e: any) => Stat.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<Stats>, I>>(object: I): Stats {
    const message = createBaseStats();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.stats = object.stats?.map((e) => Stat.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStatsResponse(): StatsResponse {
  return { messages: [] };
}

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
    const message = createBaseStatsResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Stats.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<StatsResponse>, I>>(
    object: I
  ): StatsResponse {
    const message = createBaseStatsResponse();
    message.messages = object.messages?.map((e) => Stats.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStat(): Stat {
  return {
    namespace: "",
    id: "",
    memory_usage: 0,
    cpu_usage: 0,
    pod_id: "",
    name: "",
  };
}

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
    const message = createBaseStat();
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
    return {
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      id: isSet(object.id) ? String(object.id) : "",
      memory_usage: isSet(object.memory_usage)
        ? Number(object.memory_usage)
        : 0,
      cpu_usage: isSet(object.cpu_usage) ? Number(object.cpu_usage) : 0,
      pod_id: isSet(object.pod_id) ? String(object.pod_id) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: Stat): unknown {
    const obj: any = {};
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.id !== undefined && (obj.id = message.id);
    message.memory_usage !== undefined &&
      (obj.memory_usage = Math.round(message.memory_usage));
    message.cpu_usage !== undefined &&
      (obj.cpu_usage = Math.round(message.cpu_usage));
    message.pod_id !== undefined && (obj.pod_id = message.pod_id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Stat>, I>>(object: I): Stat {
    const message = createBaseStat();
    message.namespace = object.namespace ?? "";
    message.id = object.id ?? "";
    message.memory_usage = object.memory_usage ?? 0;
    message.cpu_usage = object.cpu_usage ?? 0;
    message.pod_id = object.pod_id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseMemory(): Memory {
  return { metadata: undefined, meminfo: undefined };
}

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
    const message = createBaseMemory();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      meminfo: isSet(object.meminfo)
        ? MemInfo.fromJSON(object.meminfo)
        : undefined,
    };
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

  fromPartial<I extends Exact<DeepPartial<Memory>, I>>(object: I): Memory {
    const message = createBaseMemory();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.meminfo =
      object.meminfo !== undefined && object.meminfo !== null
        ? MemInfo.fromPartial(object.meminfo)
        : undefined;
    return message;
  },
};

function createBaseMemoryResponse(): MemoryResponse {
  return { messages: [] };
}

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
    const message = createBaseMemoryResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Memory.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<MemoryResponse>, I>>(
    object: I
  ): MemoryResponse {
    const message = createBaseMemoryResponse();
    message.messages = object.messages?.map((e) => Memory.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMemInfo(): MemInfo {
  return {
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
}

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
    const message = createBaseMemInfo();
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
    return {
      memtotal: isSet(object.memtotal) ? Number(object.memtotal) : 0,
      memfree: isSet(object.memfree) ? Number(object.memfree) : 0,
      memavailable: isSet(object.memavailable)
        ? Number(object.memavailable)
        : 0,
      buffers: isSet(object.buffers) ? Number(object.buffers) : 0,
      cached: isSet(object.cached) ? Number(object.cached) : 0,
      swapcached: isSet(object.swapcached) ? Number(object.swapcached) : 0,
      active: isSet(object.active) ? Number(object.active) : 0,
      inactive: isSet(object.inactive) ? Number(object.inactive) : 0,
      activeanon: isSet(object.activeanon) ? Number(object.activeanon) : 0,
      inactiveanon: isSet(object.inactiveanon)
        ? Number(object.inactiveanon)
        : 0,
      activefile: isSet(object.activefile) ? Number(object.activefile) : 0,
      inactivefile: isSet(object.inactivefile)
        ? Number(object.inactivefile)
        : 0,
      unevictable: isSet(object.unevictable) ? Number(object.unevictable) : 0,
      mlocked: isSet(object.mlocked) ? Number(object.mlocked) : 0,
      swaptotal: isSet(object.swaptotal) ? Number(object.swaptotal) : 0,
      swapfree: isSet(object.swapfree) ? Number(object.swapfree) : 0,
      dirty: isSet(object.dirty) ? Number(object.dirty) : 0,
      writeback: isSet(object.writeback) ? Number(object.writeback) : 0,
      anonpages: isSet(object.anonpages) ? Number(object.anonpages) : 0,
      mapped: isSet(object.mapped) ? Number(object.mapped) : 0,
      shmem: isSet(object.shmem) ? Number(object.shmem) : 0,
      slab: isSet(object.slab) ? Number(object.slab) : 0,
      sreclaimable: isSet(object.sreclaimable)
        ? Number(object.sreclaimable)
        : 0,
      sunreclaim: isSet(object.sunreclaim) ? Number(object.sunreclaim) : 0,
      kernelstack: isSet(object.kernelstack) ? Number(object.kernelstack) : 0,
      pagetables: isSet(object.pagetables) ? Number(object.pagetables) : 0,
      nfsunstable: isSet(object.nfsunstable) ? Number(object.nfsunstable) : 0,
      bounce: isSet(object.bounce) ? Number(object.bounce) : 0,
      writebacktmp: isSet(object.writebacktmp)
        ? Number(object.writebacktmp)
        : 0,
      commitlimit: isSet(object.commitlimit) ? Number(object.commitlimit) : 0,
      committedas: isSet(object.committedas) ? Number(object.committedas) : 0,
      vmalloctotal: isSet(object.vmalloctotal)
        ? Number(object.vmalloctotal)
        : 0,
      vmallocused: isSet(object.vmallocused) ? Number(object.vmallocused) : 0,
      vmallocchunk: isSet(object.vmallocchunk)
        ? Number(object.vmallocchunk)
        : 0,
      hardwarecorrupted: isSet(object.hardwarecorrupted)
        ? Number(object.hardwarecorrupted)
        : 0,
      anonhugepages: isSet(object.anonhugepages)
        ? Number(object.anonhugepages)
        : 0,
      shmemhugepages: isSet(object.shmemhugepages)
        ? Number(object.shmemhugepages)
        : 0,
      shmempmdmapped: isSet(object.shmempmdmapped)
        ? Number(object.shmempmdmapped)
        : 0,
      cmatotal: isSet(object.cmatotal) ? Number(object.cmatotal) : 0,
      cmafree: isSet(object.cmafree) ? Number(object.cmafree) : 0,
      hugepagestotal: isSet(object.hugepagestotal)
        ? Number(object.hugepagestotal)
        : 0,
      hugepagesfree: isSet(object.hugepagesfree)
        ? Number(object.hugepagesfree)
        : 0,
      hugepagesrsvd: isSet(object.hugepagesrsvd)
        ? Number(object.hugepagesrsvd)
        : 0,
      hugepagessurp: isSet(object.hugepagessurp)
        ? Number(object.hugepagessurp)
        : 0,
      hugepagesize: isSet(object.hugepagesize)
        ? Number(object.hugepagesize)
        : 0,
      directmap4k: isSet(object.directmap4k) ? Number(object.directmap4k) : 0,
      directmap2m: isSet(object.directmap2m) ? Number(object.directmap2m) : 0,
      directmap1g: isSet(object.directmap1g) ? Number(object.directmap1g) : 0,
    };
  },

  toJSON(message: MemInfo): unknown {
    const obj: any = {};
    message.memtotal !== undefined &&
      (obj.memtotal = Math.round(message.memtotal));
    message.memfree !== undefined &&
      (obj.memfree = Math.round(message.memfree));
    message.memavailable !== undefined &&
      (obj.memavailable = Math.round(message.memavailable));
    message.buffers !== undefined &&
      (obj.buffers = Math.round(message.buffers));
    message.cached !== undefined && (obj.cached = Math.round(message.cached));
    message.swapcached !== undefined &&
      (obj.swapcached = Math.round(message.swapcached));
    message.active !== undefined && (obj.active = Math.round(message.active));
    message.inactive !== undefined &&
      (obj.inactive = Math.round(message.inactive));
    message.activeanon !== undefined &&
      (obj.activeanon = Math.round(message.activeanon));
    message.inactiveanon !== undefined &&
      (obj.inactiveanon = Math.round(message.inactiveanon));
    message.activefile !== undefined &&
      (obj.activefile = Math.round(message.activefile));
    message.inactivefile !== undefined &&
      (obj.inactivefile = Math.round(message.inactivefile));
    message.unevictable !== undefined &&
      (obj.unevictable = Math.round(message.unevictable));
    message.mlocked !== undefined &&
      (obj.mlocked = Math.round(message.mlocked));
    message.swaptotal !== undefined &&
      (obj.swaptotal = Math.round(message.swaptotal));
    message.swapfree !== undefined &&
      (obj.swapfree = Math.round(message.swapfree));
    message.dirty !== undefined && (obj.dirty = Math.round(message.dirty));
    message.writeback !== undefined &&
      (obj.writeback = Math.round(message.writeback));
    message.anonpages !== undefined &&
      (obj.anonpages = Math.round(message.anonpages));
    message.mapped !== undefined && (obj.mapped = Math.round(message.mapped));
    message.shmem !== undefined && (obj.shmem = Math.round(message.shmem));
    message.slab !== undefined && (obj.slab = Math.round(message.slab));
    message.sreclaimable !== undefined &&
      (obj.sreclaimable = Math.round(message.sreclaimable));
    message.sunreclaim !== undefined &&
      (obj.sunreclaim = Math.round(message.sunreclaim));
    message.kernelstack !== undefined &&
      (obj.kernelstack = Math.round(message.kernelstack));
    message.pagetables !== undefined &&
      (obj.pagetables = Math.round(message.pagetables));
    message.nfsunstable !== undefined &&
      (obj.nfsunstable = Math.round(message.nfsunstable));
    message.bounce !== undefined && (obj.bounce = Math.round(message.bounce));
    message.writebacktmp !== undefined &&
      (obj.writebacktmp = Math.round(message.writebacktmp));
    message.commitlimit !== undefined &&
      (obj.commitlimit = Math.round(message.commitlimit));
    message.committedas !== undefined &&
      (obj.committedas = Math.round(message.committedas));
    message.vmalloctotal !== undefined &&
      (obj.vmalloctotal = Math.round(message.vmalloctotal));
    message.vmallocused !== undefined &&
      (obj.vmallocused = Math.round(message.vmallocused));
    message.vmallocchunk !== undefined &&
      (obj.vmallocchunk = Math.round(message.vmallocchunk));
    message.hardwarecorrupted !== undefined &&
      (obj.hardwarecorrupted = Math.round(message.hardwarecorrupted));
    message.anonhugepages !== undefined &&
      (obj.anonhugepages = Math.round(message.anonhugepages));
    message.shmemhugepages !== undefined &&
      (obj.shmemhugepages = Math.round(message.shmemhugepages));
    message.shmempmdmapped !== undefined &&
      (obj.shmempmdmapped = Math.round(message.shmempmdmapped));
    message.cmatotal !== undefined &&
      (obj.cmatotal = Math.round(message.cmatotal));
    message.cmafree !== undefined &&
      (obj.cmafree = Math.round(message.cmafree));
    message.hugepagestotal !== undefined &&
      (obj.hugepagestotal = Math.round(message.hugepagestotal));
    message.hugepagesfree !== undefined &&
      (obj.hugepagesfree = Math.round(message.hugepagesfree));
    message.hugepagesrsvd !== undefined &&
      (obj.hugepagesrsvd = Math.round(message.hugepagesrsvd));
    message.hugepagessurp !== undefined &&
      (obj.hugepagessurp = Math.round(message.hugepagessurp));
    message.hugepagesize !== undefined &&
      (obj.hugepagesize = Math.round(message.hugepagesize));
    message.directmap4k !== undefined &&
      (obj.directmap4k = Math.round(message.directmap4k));
    message.directmap2m !== undefined &&
      (obj.directmap2m = Math.round(message.directmap2m));
    message.directmap1g !== undefined &&
      (obj.directmap1g = Math.round(message.directmap1g));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MemInfo>, I>>(object: I): MemInfo {
    const message = createBaseMemInfo();
    message.memtotal = object.memtotal ?? 0;
    message.memfree = object.memfree ?? 0;
    message.memavailable = object.memavailable ?? 0;
    message.buffers = object.buffers ?? 0;
    message.cached = object.cached ?? 0;
    message.swapcached = object.swapcached ?? 0;
    message.active = object.active ?? 0;
    message.inactive = object.inactive ?? 0;
    message.activeanon = object.activeanon ?? 0;
    message.inactiveanon = object.inactiveanon ?? 0;
    message.activefile = object.activefile ?? 0;
    message.inactivefile = object.inactivefile ?? 0;
    message.unevictable = object.unevictable ?? 0;
    message.mlocked = object.mlocked ?? 0;
    message.swaptotal = object.swaptotal ?? 0;
    message.swapfree = object.swapfree ?? 0;
    message.dirty = object.dirty ?? 0;
    message.writeback = object.writeback ?? 0;
    message.anonpages = object.anonpages ?? 0;
    message.mapped = object.mapped ?? 0;
    message.shmem = object.shmem ?? 0;
    message.slab = object.slab ?? 0;
    message.sreclaimable = object.sreclaimable ?? 0;
    message.sunreclaim = object.sunreclaim ?? 0;
    message.kernelstack = object.kernelstack ?? 0;
    message.pagetables = object.pagetables ?? 0;
    message.nfsunstable = object.nfsunstable ?? 0;
    message.bounce = object.bounce ?? 0;
    message.writebacktmp = object.writebacktmp ?? 0;
    message.commitlimit = object.commitlimit ?? 0;
    message.committedas = object.committedas ?? 0;
    message.vmalloctotal = object.vmalloctotal ?? 0;
    message.vmallocused = object.vmallocused ?? 0;
    message.vmallocchunk = object.vmallocchunk ?? 0;
    message.hardwarecorrupted = object.hardwarecorrupted ?? 0;
    message.anonhugepages = object.anonhugepages ?? 0;
    message.shmemhugepages = object.shmemhugepages ?? 0;
    message.shmempmdmapped = object.shmempmdmapped ?? 0;
    message.cmatotal = object.cmatotal ?? 0;
    message.cmafree = object.cmafree ?? 0;
    message.hugepagestotal = object.hugepagestotal ?? 0;
    message.hugepagesfree = object.hugepagesfree ?? 0;
    message.hugepagesrsvd = object.hugepagesrsvd ?? 0;
    message.hugepagessurp = object.hugepagessurp ?? 0;
    message.hugepagesize = object.hugepagesize ?? 0;
    message.directmap4k = object.directmap4k ?? 0;
    message.directmap2m = object.directmap2m ?? 0;
    message.directmap1g = object.directmap1g ?? 0;
    return message;
  },
};

function createBaseHostnameResponse(): HostnameResponse {
  return { messages: [] };
}

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
    const message = createBaseHostnameResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Hostname.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<HostnameResponse>, I>>(
    object: I
  ): HostnameResponse {
    const message = createBaseHostnameResponse();
    message.messages =
      object.messages?.map((e) => Hostname.fromPartial(e)) || [];
    return message;
  },
};

function createBaseHostname(): Hostname {
  return { metadata: undefined, hostname: "" };
}

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
    const message = createBaseHostname();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      hostname: isSet(object.hostname) ? String(object.hostname) : "",
    };
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

  fromPartial<I extends Exact<DeepPartial<Hostname>, I>>(object: I): Hostname {
    const message = createBaseHostname();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.hostname = object.hostname ?? "";
    return message;
  },
};

function createBaseLoadAvgResponse(): LoadAvgResponse {
  return { messages: [] };
}

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
    const message = createBaseLoadAvgResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => LoadAvg.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<LoadAvgResponse>, I>>(
    object: I
  ): LoadAvgResponse {
    const message = createBaseLoadAvgResponse();
    message.messages =
      object.messages?.map((e) => LoadAvg.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLoadAvg(): LoadAvg {
  return { metadata: undefined, load1: 0, load5: 0, load15: 0 };
}

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
    const message = createBaseLoadAvg();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      load1: isSet(object.load1) ? Number(object.load1) : 0,
      load5: isSet(object.load5) ? Number(object.load5) : 0,
      load15: isSet(object.load15) ? Number(object.load15) : 0,
    };
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

  fromPartial<I extends Exact<DeepPartial<LoadAvg>, I>>(object: I): LoadAvg {
    const message = createBaseLoadAvg();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.load1 = object.load1 ?? 0;
    message.load5 = object.load5 ?? 0;
    message.load15 = object.load15 ?? 0;
    return message;
  },
};

function createBaseSystemStatResponse(): SystemStatResponse {
  return { messages: [] };
}

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
    const message = createBaseSystemStatResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => SystemStat.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<SystemStatResponse>, I>>(
    object: I
  ): SystemStatResponse {
    const message = createBaseSystemStatResponse();
    message.messages =
      object.messages?.map((e) => SystemStat.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSystemStat(): SystemStat {
  return {
    metadata: undefined,
    boot_time: 0,
    cpu_total: undefined,
    cpu: [],
    irq_total: 0,
    irq: [],
    context_switches: 0,
    process_created: 0,
    process_running: 0,
    process_blocked: 0,
    soft_irq_total: 0,
    soft_irq: undefined,
  };
}

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
    const message = createBaseSystemStat();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      boot_time: isSet(object.boot_time) ? Number(object.boot_time) : 0,
      cpu_total: isSet(object.cpu_total)
        ? CPUStat.fromJSON(object.cpu_total)
        : undefined,
      cpu: Array.isArray(object?.cpu)
        ? object.cpu.map((e: any) => CPUStat.fromJSON(e))
        : [],
      irq_total: isSet(object.irq_total) ? Number(object.irq_total) : 0,
      irq: Array.isArray(object?.irq)
        ? object.irq.map((e: any) => Number(e))
        : [],
      context_switches: isSet(object.context_switches)
        ? Number(object.context_switches)
        : 0,
      process_created: isSet(object.process_created)
        ? Number(object.process_created)
        : 0,
      process_running: isSet(object.process_running)
        ? Number(object.process_running)
        : 0,
      process_blocked: isSet(object.process_blocked)
        ? Number(object.process_blocked)
        : 0,
      soft_irq_total: isSet(object.soft_irq_total)
        ? Number(object.soft_irq_total)
        : 0,
      soft_irq: isSet(object.soft_irq)
        ? SoftIRQStat.fromJSON(object.soft_irq)
        : undefined,
    };
  },

  toJSON(message: SystemStat): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.boot_time !== undefined &&
      (obj.boot_time = Math.round(message.boot_time));
    message.cpu_total !== undefined &&
      (obj.cpu_total = message.cpu_total
        ? CPUStat.toJSON(message.cpu_total)
        : undefined);
    if (message.cpu) {
      obj.cpu = message.cpu.map((e) => (e ? CPUStat.toJSON(e) : undefined));
    } else {
      obj.cpu = [];
    }
    message.irq_total !== undefined &&
      (obj.irq_total = Math.round(message.irq_total));
    if (message.irq) {
      obj.irq = message.irq.map((e) => Math.round(e));
    } else {
      obj.irq = [];
    }
    message.context_switches !== undefined &&
      (obj.context_switches = Math.round(message.context_switches));
    message.process_created !== undefined &&
      (obj.process_created = Math.round(message.process_created));
    message.process_running !== undefined &&
      (obj.process_running = Math.round(message.process_running));
    message.process_blocked !== undefined &&
      (obj.process_blocked = Math.round(message.process_blocked));
    message.soft_irq_total !== undefined &&
      (obj.soft_irq_total = Math.round(message.soft_irq_total));
    message.soft_irq !== undefined &&
      (obj.soft_irq = message.soft_irq
        ? SoftIRQStat.toJSON(message.soft_irq)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SystemStat>, I>>(
    object: I
  ): SystemStat {
    const message = createBaseSystemStat();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.boot_time = object.boot_time ?? 0;
    message.cpu_total =
      object.cpu_total !== undefined && object.cpu_total !== null
        ? CPUStat.fromPartial(object.cpu_total)
        : undefined;
    message.cpu = object.cpu?.map((e) => CPUStat.fromPartial(e)) || [];
    message.irq_total = object.irq_total ?? 0;
    message.irq = object.irq?.map((e) => e) || [];
    message.context_switches = object.context_switches ?? 0;
    message.process_created = object.process_created ?? 0;
    message.process_running = object.process_running ?? 0;
    message.process_blocked = object.process_blocked ?? 0;
    message.soft_irq_total = object.soft_irq_total ?? 0;
    message.soft_irq =
      object.soft_irq !== undefined && object.soft_irq !== null
        ? SoftIRQStat.fromPartial(object.soft_irq)
        : undefined;
    return message;
  },
};

function createBaseCPUStat(): CPUStat {
  return {
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
}

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
    const message = createBaseCPUStat();
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
    return {
      user: isSet(object.user) ? Number(object.user) : 0,
      nice: isSet(object.nice) ? Number(object.nice) : 0,
      system: isSet(object.system) ? Number(object.system) : 0,
      idle: isSet(object.idle) ? Number(object.idle) : 0,
      iowait: isSet(object.iowait) ? Number(object.iowait) : 0,
      irq: isSet(object.irq) ? Number(object.irq) : 0,
      soft_irq: isSet(object.soft_irq) ? Number(object.soft_irq) : 0,
      steal: isSet(object.steal) ? Number(object.steal) : 0,
      guest: isSet(object.guest) ? Number(object.guest) : 0,
      guest_nice: isSet(object.guest_nice) ? Number(object.guest_nice) : 0,
    };
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

  fromPartial<I extends Exact<DeepPartial<CPUStat>, I>>(object: I): CPUStat {
    const message = createBaseCPUStat();
    message.user = object.user ?? 0;
    message.nice = object.nice ?? 0;
    message.system = object.system ?? 0;
    message.idle = object.idle ?? 0;
    message.iowait = object.iowait ?? 0;
    message.irq = object.irq ?? 0;
    message.soft_irq = object.soft_irq ?? 0;
    message.steal = object.steal ?? 0;
    message.guest = object.guest ?? 0;
    message.guest_nice = object.guest_nice ?? 0;
    return message;
  },
};

function createBaseSoftIRQStat(): SoftIRQStat {
  return {
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
}

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
    const message = createBaseSoftIRQStat();
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
    return {
      hi: isSet(object.hi) ? Number(object.hi) : 0,
      timer: isSet(object.timer) ? Number(object.timer) : 0,
      net_tx: isSet(object.net_tx) ? Number(object.net_tx) : 0,
      net_rx: isSet(object.net_rx) ? Number(object.net_rx) : 0,
      block: isSet(object.block) ? Number(object.block) : 0,
      block_io_poll: isSet(object.block_io_poll)
        ? Number(object.block_io_poll)
        : 0,
      tasklet: isSet(object.tasklet) ? Number(object.tasklet) : 0,
      sched: isSet(object.sched) ? Number(object.sched) : 0,
      hrtimer: isSet(object.hrtimer) ? Number(object.hrtimer) : 0,
      rcu: isSet(object.rcu) ? Number(object.rcu) : 0,
    };
  },

  toJSON(message: SoftIRQStat): unknown {
    const obj: any = {};
    message.hi !== undefined && (obj.hi = Math.round(message.hi));
    message.timer !== undefined && (obj.timer = Math.round(message.timer));
    message.net_tx !== undefined && (obj.net_tx = Math.round(message.net_tx));
    message.net_rx !== undefined && (obj.net_rx = Math.round(message.net_rx));
    message.block !== undefined && (obj.block = Math.round(message.block));
    message.block_io_poll !== undefined &&
      (obj.block_io_poll = Math.round(message.block_io_poll));
    message.tasklet !== undefined &&
      (obj.tasklet = Math.round(message.tasklet));
    message.sched !== undefined && (obj.sched = Math.round(message.sched));
    message.hrtimer !== undefined &&
      (obj.hrtimer = Math.round(message.hrtimer));
    message.rcu !== undefined && (obj.rcu = Math.round(message.rcu));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SoftIRQStat>, I>>(
    object: I
  ): SoftIRQStat {
    const message = createBaseSoftIRQStat();
    message.hi = object.hi ?? 0;
    message.timer = object.timer ?? 0;
    message.net_tx = object.net_tx ?? 0;
    message.net_rx = object.net_rx ?? 0;
    message.block = object.block ?? 0;
    message.block_io_poll = object.block_io_poll ?? 0;
    message.tasklet = object.tasklet ?? 0;
    message.sched = object.sched ?? 0;
    message.hrtimer = object.hrtimer ?? 0;
    message.rcu = object.rcu ?? 0;
    return message;
  },
};

function createBaseCPUInfoResponse(): CPUInfoResponse {
  return { messages: [] };
}

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
    const message = createBaseCPUInfoResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => CPUsInfo.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<CPUInfoResponse>, I>>(
    object: I
  ): CPUInfoResponse {
    const message = createBaseCPUInfoResponse();
    message.messages =
      object.messages?.map((e) => CPUsInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCPUsInfo(): CPUsInfo {
  return { metadata: undefined, cpu_info: [] };
}

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
    const message = createBaseCPUsInfo();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      cpu_info: Array.isArray(object?.cpu_info)
        ? object.cpu_info.map((e: any) => CPUInfo.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<CPUsInfo>, I>>(object: I): CPUsInfo {
    const message = createBaseCPUsInfo();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.cpu_info =
      object.cpu_info?.map((e) => CPUInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCPUInfo(): CPUInfo {
  return {
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
    flags: [],
    bugs: [],
    bogo_mips: 0,
    cl_flush_size: 0,
    cache_alignment: 0,
    address_sizes: "",
    power_management: "",
  };
}

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
    const message = createBaseCPUInfo();
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
    return {
      processor: isSet(object.processor) ? Number(object.processor) : 0,
      vendor_id: isSet(object.vendor_id) ? String(object.vendor_id) : "",
      cpu_family: isSet(object.cpu_family) ? String(object.cpu_family) : "",
      model: isSet(object.model) ? String(object.model) : "",
      model_name: isSet(object.model_name) ? String(object.model_name) : "",
      stepping: isSet(object.stepping) ? String(object.stepping) : "",
      microcode: isSet(object.microcode) ? String(object.microcode) : "",
      cpu_mhz: isSet(object.cpu_mhz) ? Number(object.cpu_mhz) : 0,
      cache_size: isSet(object.cache_size) ? String(object.cache_size) : "",
      physical_id: isSet(object.physical_id) ? String(object.physical_id) : "",
      siblings: isSet(object.siblings) ? Number(object.siblings) : 0,
      core_id: isSet(object.core_id) ? String(object.core_id) : "",
      cpu_cores: isSet(object.cpu_cores) ? Number(object.cpu_cores) : 0,
      apic_id: isSet(object.apic_id) ? String(object.apic_id) : "",
      initial_apic_id: isSet(object.initial_apic_id)
        ? String(object.initial_apic_id)
        : "",
      fpu: isSet(object.fpu) ? String(object.fpu) : "",
      fpu_exception: isSet(object.fpu_exception)
        ? String(object.fpu_exception)
        : "",
      cpu_id_level: isSet(object.cpu_id_level)
        ? Number(object.cpu_id_level)
        : 0,
      wp: isSet(object.wp) ? String(object.wp) : "",
      flags: Array.isArray(object?.flags)
        ? object.flags.map((e: any) => String(e))
        : [],
      bugs: Array.isArray(object?.bugs)
        ? object.bugs.map((e: any) => String(e))
        : [],
      bogo_mips: isSet(object.bogo_mips) ? Number(object.bogo_mips) : 0,
      cl_flush_size: isSet(object.cl_flush_size)
        ? Number(object.cl_flush_size)
        : 0,
      cache_alignment: isSet(object.cache_alignment)
        ? Number(object.cache_alignment)
        : 0,
      address_sizes: isSet(object.address_sizes)
        ? String(object.address_sizes)
        : "",
      power_management: isSet(object.power_management)
        ? String(object.power_management)
        : "",
    };
  },

  toJSON(message: CPUInfo): unknown {
    const obj: any = {};
    message.processor !== undefined &&
      (obj.processor = Math.round(message.processor));
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
    message.siblings !== undefined &&
      (obj.siblings = Math.round(message.siblings));
    message.core_id !== undefined && (obj.core_id = message.core_id);
    message.cpu_cores !== undefined &&
      (obj.cpu_cores = Math.round(message.cpu_cores));
    message.apic_id !== undefined && (obj.apic_id = message.apic_id);
    message.initial_apic_id !== undefined &&
      (obj.initial_apic_id = message.initial_apic_id);
    message.fpu !== undefined && (obj.fpu = message.fpu);
    message.fpu_exception !== undefined &&
      (obj.fpu_exception = message.fpu_exception);
    message.cpu_id_level !== undefined &&
      (obj.cpu_id_level = Math.round(message.cpu_id_level));
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
      (obj.cl_flush_size = Math.round(message.cl_flush_size));
    message.cache_alignment !== undefined &&
      (obj.cache_alignment = Math.round(message.cache_alignment));
    message.address_sizes !== undefined &&
      (obj.address_sizes = message.address_sizes);
    message.power_management !== undefined &&
      (obj.power_management = message.power_management);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CPUInfo>, I>>(object: I): CPUInfo {
    const message = createBaseCPUInfo();
    message.processor = object.processor ?? 0;
    message.vendor_id = object.vendor_id ?? "";
    message.cpu_family = object.cpu_family ?? "";
    message.model = object.model ?? "";
    message.model_name = object.model_name ?? "";
    message.stepping = object.stepping ?? "";
    message.microcode = object.microcode ?? "";
    message.cpu_mhz = object.cpu_mhz ?? 0;
    message.cache_size = object.cache_size ?? "";
    message.physical_id = object.physical_id ?? "";
    message.siblings = object.siblings ?? 0;
    message.core_id = object.core_id ?? "";
    message.cpu_cores = object.cpu_cores ?? 0;
    message.apic_id = object.apic_id ?? "";
    message.initial_apic_id = object.initial_apic_id ?? "";
    message.fpu = object.fpu ?? "";
    message.fpu_exception = object.fpu_exception ?? "";
    message.cpu_id_level = object.cpu_id_level ?? 0;
    message.wp = object.wp ?? "";
    message.flags = object.flags?.map((e) => e) || [];
    message.bugs = object.bugs?.map((e) => e) || [];
    message.bogo_mips = object.bogo_mips ?? 0;
    message.cl_flush_size = object.cl_flush_size ?? 0;
    message.cache_alignment = object.cache_alignment ?? 0;
    message.address_sizes = object.address_sizes ?? "";
    message.power_management = object.power_management ?? "";
    return message;
  },
};

function createBaseNetworkDeviceStatsResponse(): NetworkDeviceStatsResponse {
  return { messages: [] };
}

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
    const message = createBaseNetworkDeviceStatsResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => NetworkDeviceStats.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<NetworkDeviceStatsResponse>, I>>(
    object: I
  ): NetworkDeviceStatsResponse {
    const message = createBaseNetworkDeviceStatsResponse();
    message.messages =
      object.messages?.map((e) => NetworkDeviceStats.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNetworkDeviceStats(): NetworkDeviceStats {
  return { metadata: undefined, total: undefined, devices: [] };
}

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
    const message = createBaseNetworkDeviceStats();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      total: isSet(object.total) ? NetDev.fromJSON(object.total) : undefined,
      devices: Array.isArray(object?.devices)
        ? object.devices.map((e: any) => NetDev.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<NetworkDeviceStats>, I>>(
    object: I
  ): NetworkDeviceStats {
    const message = createBaseNetworkDeviceStats();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.total =
      object.total !== undefined && object.total !== null
        ? NetDev.fromPartial(object.total)
        : undefined;
    message.devices = object.devices?.map((e) => NetDev.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNetDev(): NetDev {
  return {
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
}

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
    const message = createBaseNetDev();
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
    return {
      name: isSet(object.name) ? String(object.name) : "",
      rx_bytes: isSet(object.rx_bytes) ? Number(object.rx_bytes) : 0,
      rx_packets: isSet(object.rx_packets) ? Number(object.rx_packets) : 0,
      rx_errors: isSet(object.rx_errors) ? Number(object.rx_errors) : 0,
      rx_dropped: isSet(object.rx_dropped) ? Number(object.rx_dropped) : 0,
      rx_fifo: isSet(object.rx_fifo) ? Number(object.rx_fifo) : 0,
      rx_frame: isSet(object.rx_frame) ? Number(object.rx_frame) : 0,
      rx_compressed: isSet(object.rx_compressed)
        ? Number(object.rx_compressed)
        : 0,
      rx_multicast: isSet(object.rx_multicast)
        ? Number(object.rx_multicast)
        : 0,
      tx_bytes: isSet(object.tx_bytes) ? Number(object.tx_bytes) : 0,
      tx_packets: isSet(object.tx_packets) ? Number(object.tx_packets) : 0,
      tx_errors: isSet(object.tx_errors) ? Number(object.tx_errors) : 0,
      tx_dropped: isSet(object.tx_dropped) ? Number(object.tx_dropped) : 0,
      tx_fifo: isSet(object.tx_fifo) ? Number(object.tx_fifo) : 0,
      tx_collisions: isSet(object.tx_collisions)
        ? Number(object.tx_collisions)
        : 0,
      tx_carrier: isSet(object.tx_carrier) ? Number(object.tx_carrier) : 0,
      tx_compressed: isSet(object.tx_compressed)
        ? Number(object.tx_compressed)
        : 0,
    };
  },

  toJSON(message: NetDev): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.rx_bytes !== undefined &&
      (obj.rx_bytes = Math.round(message.rx_bytes));
    message.rx_packets !== undefined &&
      (obj.rx_packets = Math.round(message.rx_packets));
    message.rx_errors !== undefined &&
      (obj.rx_errors = Math.round(message.rx_errors));
    message.rx_dropped !== undefined &&
      (obj.rx_dropped = Math.round(message.rx_dropped));
    message.rx_fifo !== undefined &&
      (obj.rx_fifo = Math.round(message.rx_fifo));
    message.rx_frame !== undefined &&
      (obj.rx_frame = Math.round(message.rx_frame));
    message.rx_compressed !== undefined &&
      (obj.rx_compressed = Math.round(message.rx_compressed));
    message.rx_multicast !== undefined &&
      (obj.rx_multicast = Math.round(message.rx_multicast));
    message.tx_bytes !== undefined &&
      (obj.tx_bytes = Math.round(message.tx_bytes));
    message.tx_packets !== undefined &&
      (obj.tx_packets = Math.round(message.tx_packets));
    message.tx_errors !== undefined &&
      (obj.tx_errors = Math.round(message.tx_errors));
    message.tx_dropped !== undefined &&
      (obj.tx_dropped = Math.round(message.tx_dropped));
    message.tx_fifo !== undefined &&
      (obj.tx_fifo = Math.round(message.tx_fifo));
    message.tx_collisions !== undefined &&
      (obj.tx_collisions = Math.round(message.tx_collisions));
    message.tx_carrier !== undefined &&
      (obj.tx_carrier = Math.round(message.tx_carrier));
    message.tx_compressed !== undefined &&
      (obj.tx_compressed = Math.round(message.tx_compressed));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NetDev>, I>>(object: I): NetDev {
    const message = createBaseNetDev();
    message.name = object.name ?? "";
    message.rx_bytes = object.rx_bytes ?? 0;
    message.rx_packets = object.rx_packets ?? 0;
    message.rx_errors = object.rx_errors ?? 0;
    message.rx_dropped = object.rx_dropped ?? 0;
    message.rx_fifo = object.rx_fifo ?? 0;
    message.rx_frame = object.rx_frame ?? 0;
    message.rx_compressed = object.rx_compressed ?? 0;
    message.rx_multicast = object.rx_multicast ?? 0;
    message.tx_bytes = object.tx_bytes ?? 0;
    message.tx_packets = object.tx_packets ?? 0;
    message.tx_errors = object.tx_errors ?? 0;
    message.tx_dropped = object.tx_dropped ?? 0;
    message.tx_fifo = object.tx_fifo ?? 0;
    message.tx_collisions = object.tx_collisions ?? 0;
    message.tx_carrier = object.tx_carrier ?? 0;
    message.tx_compressed = object.tx_compressed ?? 0;
    return message;
  },
};

function createBaseDiskStatsResponse(): DiskStatsResponse {
  return { messages: [] };
}

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
    const message = createBaseDiskStatsResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => DiskStats.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<DiskStatsResponse>, I>>(
    object: I
  ): DiskStatsResponse {
    const message = createBaseDiskStatsResponse();
    message.messages =
      object.messages?.map((e) => DiskStats.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDiskStats(): DiskStats {
  return { metadata: undefined, total: undefined, devices: [] };
}

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
    const message = createBaseDiskStats();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      total: isSet(object.total) ? DiskStat.fromJSON(object.total) : undefined,
      devices: Array.isArray(object?.devices)
        ? object.devices.map((e: any) => DiskStat.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<DiskStats>, I>>(
    object: I
  ): DiskStats {
    const message = createBaseDiskStats();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.total =
      object.total !== undefined && object.total !== null
        ? DiskStat.fromPartial(object.total)
        : undefined;
    message.devices = object.devices?.map((e) => DiskStat.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDiskStat(): DiskStat {
  return {
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
}

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
    const message = createBaseDiskStat();
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
    return {
      name: isSet(object.name) ? String(object.name) : "",
      read_completed: isSet(object.read_completed)
        ? Number(object.read_completed)
        : 0,
      read_merged: isSet(object.read_merged) ? Number(object.read_merged) : 0,
      read_sectors: isSet(object.read_sectors)
        ? Number(object.read_sectors)
        : 0,
      read_time_ms: isSet(object.read_time_ms)
        ? Number(object.read_time_ms)
        : 0,
      write_completed: isSet(object.write_completed)
        ? Number(object.write_completed)
        : 0,
      write_merged: isSet(object.write_merged)
        ? Number(object.write_merged)
        : 0,
      write_sectors: isSet(object.write_sectors)
        ? Number(object.write_sectors)
        : 0,
      write_time_ms: isSet(object.write_time_ms)
        ? Number(object.write_time_ms)
        : 0,
      io_in_progress: isSet(object.io_in_progress)
        ? Number(object.io_in_progress)
        : 0,
      io_time_ms: isSet(object.io_time_ms) ? Number(object.io_time_ms) : 0,
      io_time_weighted_ms: isSet(object.io_time_weighted_ms)
        ? Number(object.io_time_weighted_ms)
        : 0,
      discard_completed: isSet(object.discard_completed)
        ? Number(object.discard_completed)
        : 0,
      discard_merged: isSet(object.discard_merged)
        ? Number(object.discard_merged)
        : 0,
      discard_sectors: isSet(object.discard_sectors)
        ? Number(object.discard_sectors)
        : 0,
      discard_time_ms: isSet(object.discard_time_ms)
        ? Number(object.discard_time_ms)
        : 0,
    };
  },

  toJSON(message: DiskStat): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.read_completed !== undefined &&
      (obj.read_completed = Math.round(message.read_completed));
    message.read_merged !== undefined &&
      (obj.read_merged = Math.round(message.read_merged));
    message.read_sectors !== undefined &&
      (obj.read_sectors = Math.round(message.read_sectors));
    message.read_time_ms !== undefined &&
      (obj.read_time_ms = Math.round(message.read_time_ms));
    message.write_completed !== undefined &&
      (obj.write_completed = Math.round(message.write_completed));
    message.write_merged !== undefined &&
      (obj.write_merged = Math.round(message.write_merged));
    message.write_sectors !== undefined &&
      (obj.write_sectors = Math.round(message.write_sectors));
    message.write_time_ms !== undefined &&
      (obj.write_time_ms = Math.round(message.write_time_ms));
    message.io_in_progress !== undefined &&
      (obj.io_in_progress = Math.round(message.io_in_progress));
    message.io_time_ms !== undefined &&
      (obj.io_time_ms = Math.round(message.io_time_ms));
    message.io_time_weighted_ms !== undefined &&
      (obj.io_time_weighted_ms = Math.round(message.io_time_weighted_ms));
    message.discard_completed !== undefined &&
      (obj.discard_completed = Math.round(message.discard_completed));
    message.discard_merged !== undefined &&
      (obj.discard_merged = Math.round(message.discard_merged));
    message.discard_sectors !== undefined &&
      (obj.discard_sectors = Math.round(message.discard_sectors));
    message.discard_time_ms !== undefined &&
      (obj.discard_time_ms = Math.round(message.discard_time_ms));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DiskStat>, I>>(object: I): DiskStat {
    const message = createBaseDiskStat();
    message.name = object.name ?? "";
    message.read_completed = object.read_completed ?? 0;
    message.read_merged = object.read_merged ?? 0;
    message.read_sectors = object.read_sectors ?? 0;
    message.read_time_ms = object.read_time_ms ?? 0;
    message.write_completed = object.write_completed ?? 0;
    message.write_merged = object.write_merged ?? 0;
    message.write_sectors = object.write_sectors ?? 0;
    message.write_time_ms = object.write_time_ms ?? 0;
    message.io_in_progress = object.io_in_progress ?? 0;
    message.io_time_ms = object.io_time_ms ?? 0;
    message.io_time_weighted_ms = object.io_time_weighted_ms ?? 0;
    message.discard_completed = object.discard_completed ?? 0;
    message.discard_merged = object.discard_merged ?? 0;
    message.discard_sectors = object.discard_sectors ?? 0;
    message.discard_time_ms = object.discard_time_ms ?? 0;
    return message;
  },
};

function createBaseEtcdLeaveClusterRequest(): EtcdLeaveClusterRequest {
  return {};
}

export const EtcdLeaveClusterRequest = {
  encode(_: EtcdLeaveClusterRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdLeaveClusterRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEtcdLeaveClusterRequest();
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
    return {};
  },

  toJSON(_: EtcdLeaveClusterRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EtcdLeaveClusterRequest>, I>>(
    _: I
  ): EtcdLeaveClusterRequest {
    const message = createBaseEtcdLeaveClusterRequest();
    return message;
  },
};

function createBaseEtcdLeaveCluster(): EtcdLeaveCluster {
  return { metadata: undefined };
}

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
    const message = createBaseEtcdLeaveCluster();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: EtcdLeaveCluster): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EtcdLeaveCluster>, I>>(
    object: I
  ): EtcdLeaveCluster {
    const message = createBaseEtcdLeaveCluster();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseEtcdLeaveClusterResponse(): EtcdLeaveClusterResponse {
  return { messages: [] };
}

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
    const message = createBaseEtcdLeaveClusterResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => EtcdLeaveCluster.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<EtcdLeaveClusterResponse>, I>>(
    object: I
  ): EtcdLeaveClusterResponse {
    const message = createBaseEtcdLeaveClusterResponse();
    message.messages =
      object.messages?.map((e) => EtcdLeaveCluster.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEtcdRemoveMemberRequest(): EtcdRemoveMemberRequest {
  return { member: "" };
}

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
    const message = createBaseEtcdRemoveMemberRequest();
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
    return {
      member: isSet(object.member) ? String(object.member) : "",
    };
  },

  toJSON(message: EtcdRemoveMemberRequest): unknown {
    const obj: any = {};
    message.member !== undefined && (obj.member = message.member);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EtcdRemoveMemberRequest>, I>>(
    object: I
  ): EtcdRemoveMemberRequest {
    const message = createBaseEtcdRemoveMemberRequest();
    message.member = object.member ?? "";
    return message;
  },
};

function createBaseEtcdRemoveMember(): EtcdRemoveMember {
  return { metadata: undefined };
}

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
    const message = createBaseEtcdRemoveMember();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: EtcdRemoveMember): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EtcdRemoveMember>, I>>(
    object: I
  ): EtcdRemoveMember {
    const message = createBaseEtcdRemoveMember();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseEtcdRemoveMemberResponse(): EtcdRemoveMemberResponse {
  return { messages: [] };
}

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
    const message = createBaseEtcdRemoveMemberResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => EtcdRemoveMember.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<EtcdRemoveMemberResponse>, I>>(
    object: I
  ): EtcdRemoveMemberResponse {
    const message = createBaseEtcdRemoveMemberResponse();
    message.messages =
      object.messages?.map((e) => EtcdRemoveMember.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEtcdForfeitLeadershipRequest(): EtcdForfeitLeadershipRequest {
  return {};
}

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
    const message = createBaseEtcdForfeitLeadershipRequest();
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
    return {};
  },

  toJSON(_: EtcdForfeitLeadershipRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EtcdForfeitLeadershipRequest>, I>>(
    _: I
  ): EtcdForfeitLeadershipRequest {
    const message = createBaseEtcdForfeitLeadershipRequest();
    return message;
  },
};

function createBaseEtcdForfeitLeadership(): EtcdForfeitLeadership {
  return { metadata: undefined, member: "" };
}

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
    const message = createBaseEtcdForfeitLeadership();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      member: isSet(object.member) ? String(object.member) : "",
    };
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

  fromPartial<I extends Exact<DeepPartial<EtcdForfeitLeadership>, I>>(
    object: I
  ): EtcdForfeitLeadership {
    const message = createBaseEtcdForfeitLeadership();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.member = object.member ?? "";
    return message;
  },
};

function createBaseEtcdForfeitLeadershipResponse(): EtcdForfeitLeadershipResponse {
  return { messages: [] };
}

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
    const message = createBaseEtcdForfeitLeadershipResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => EtcdForfeitLeadership.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<EtcdForfeitLeadershipResponse>, I>>(
    object: I
  ): EtcdForfeitLeadershipResponse {
    const message = createBaseEtcdForfeitLeadershipResponse();
    message.messages =
      object.messages?.map((e) => EtcdForfeitLeadership.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEtcdMemberListRequest(): EtcdMemberListRequest {
  return { query_local: false };
}

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
    const message = createBaseEtcdMemberListRequest();
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
    return {
      query_local: isSet(object.query_local)
        ? Boolean(object.query_local)
        : false,
    };
  },

  toJSON(message: EtcdMemberListRequest): unknown {
    const obj: any = {};
    message.query_local !== undefined &&
      (obj.query_local = message.query_local);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EtcdMemberListRequest>, I>>(
    object: I
  ): EtcdMemberListRequest {
    const message = createBaseEtcdMemberListRequest();
    message.query_local = object.query_local ?? false;
    return message;
  },
};

function createBaseEtcdMember(): EtcdMember {
  return {
    id: 0,
    hostname: "",
    peer_urls: [],
    client_urls: [],
    is_learner: false,
  };
}

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
    if (message.is_learner === true) {
      writer.uint32(48).bool(message.is_learner);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdMember {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEtcdMember();
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
        case 6:
          message.is_learner = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EtcdMember {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      hostname: isSet(object.hostname) ? String(object.hostname) : "",
      peer_urls: Array.isArray(object?.peer_urls)
        ? object.peer_urls.map((e: any) => String(e))
        : [],
      client_urls: Array.isArray(object?.client_urls)
        ? object.client_urls.map((e: any) => String(e))
        : [],
      is_learner: isSet(object.is_learner) ? Boolean(object.is_learner) : false,
    };
  },

  toJSON(message: EtcdMember): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
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
    message.is_learner !== undefined && (obj.is_learner = message.is_learner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EtcdMember>, I>>(
    object: I
  ): EtcdMember {
    const message = createBaseEtcdMember();
    message.id = object.id ?? 0;
    message.hostname = object.hostname ?? "";
    message.peer_urls = object.peer_urls?.map((e) => e) || [];
    message.client_urls = object.client_urls?.map((e) => e) || [];
    message.is_learner = object.is_learner ?? false;
    return message;
  },
};

function createBaseEtcdMembers(): EtcdMembers {
  return { metadata: undefined, legacy_members: [], members: [] };
}

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
    const message = createBaseEtcdMembers();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      legacy_members: Array.isArray(object?.legacy_members)
        ? object.legacy_members.map((e: any) => String(e))
        : [],
      members: Array.isArray(object?.members)
        ? object.members.map((e: any) => EtcdMember.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<EtcdMembers>, I>>(
    object: I
  ): EtcdMembers {
    const message = createBaseEtcdMembers();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.legacy_members = object.legacy_members?.map((e) => e) || [];
    message.members =
      object.members?.map((e) => EtcdMember.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEtcdMemberListResponse(): EtcdMemberListResponse {
  return { messages: [] };
}

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
    const message = createBaseEtcdMemberListResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => EtcdMembers.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<EtcdMemberListResponse>, I>>(
    object: I
  ): EtcdMemberListResponse {
    const message = createBaseEtcdMemberListResponse();
    message.messages =
      object.messages?.map((e) => EtcdMembers.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEtcdSnapshotRequest(): EtcdSnapshotRequest {
  return {};
}

export const EtcdSnapshotRequest = {
  encode(_: EtcdSnapshotRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EtcdSnapshotRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEtcdSnapshotRequest();
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
    return {};
  },

  toJSON(_: EtcdSnapshotRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EtcdSnapshotRequest>, I>>(
    _: I
  ): EtcdSnapshotRequest {
    const message = createBaseEtcdSnapshotRequest();
    return message;
  },
};

function createBaseEtcdRecover(): EtcdRecover {
  return { metadata: undefined };
}

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
    const message = createBaseEtcdRecover();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: EtcdRecover): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EtcdRecover>, I>>(
    object: I
  ): EtcdRecover {
    const message = createBaseEtcdRecover();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseEtcdRecoverResponse(): EtcdRecoverResponse {
  return { messages: [] };
}

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
    const message = createBaseEtcdRecoverResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => EtcdRecover.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<EtcdRecoverResponse>, I>>(
    object: I
  ): EtcdRecoverResponse {
    const message = createBaseEtcdRecoverResponse();
    message.messages =
      object.messages?.map((e) => EtcdRecover.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRouteConfig(): RouteConfig {
  return { network: "", gateway: "", metric: 0 };
}

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
    const message = createBaseRouteConfig();
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
    return {
      network: isSet(object.network) ? String(object.network) : "",
      gateway: isSet(object.gateway) ? String(object.gateway) : "",
      metric: isSet(object.metric) ? Number(object.metric) : 0,
    };
  },

  toJSON(message: RouteConfig): unknown {
    const obj: any = {};
    message.network !== undefined && (obj.network = message.network);
    message.gateway !== undefined && (obj.gateway = message.gateway);
    message.metric !== undefined && (obj.metric = Math.round(message.metric));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RouteConfig>, I>>(
    object: I
  ): RouteConfig {
    const message = createBaseRouteConfig();
    message.network = object.network ?? "";
    message.gateway = object.gateway ?? "";
    message.metric = object.metric ?? 0;
    return message;
  },
};

function createBaseDHCPOptionsConfig(): DHCPOptionsConfig {
  return { route_metric: 0 };
}

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
    const message = createBaseDHCPOptionsConfig();
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
    return {
      route_metric: isSet(object.route_metric)
        ? Number(object.route_metric)
        : 0,
    };
  },

  toJSON(message: DHCPOptionsConfig): unknown {
    const obj: any = {};
    message.route_metric !== undefined &&
      (obj.route_metric = Math.round(message.route_metric));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DHCPOptionsConfig>, I>>(
    object: I
  ): DHCPOptionsConfig {
    const message = createBaseDHCPOptionsConfig();
    message.route_metric = object.route_metric ?? 0;
    return message;
  },
};

function createBaseNetworkDeviceConfig(): NetworkDeviceConfig {
  return {
    interface: "",
    cidr: "",
    mtu: 0,
    dhcp: false,
    ignore: false,
    dhcp_options: undefined,
    routes: [],
  };
}

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
    const message = createBaseNetworkDeviceConfig();
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
    return {
      interface: isSet(object.interface) ? String(object.interface) : "",
      cidr: isSet(object.cidr) ? String(object.cidr) : "",
      mtu: isSet(object.mtu) ? Number(object.mtu) : 0,
      dhcp: isSet(object.dhcp) ? Boolean(object.dhcp) : false,
      ignore: isSet(object.ignore) ? Boolean(object.ignore) : false,
      dhcp_options: isSet(object.dhcp_options)
        ? DHCPOptionsConfig.fromJSON(object.dhcp_options)
        : undefined,
      routes: Array.isArray(object?.routes)
        ? object.routes.map((e: any) => RouteConfig.fromJSON(e))
        : [],
    };
  },

  toJSON(message: NetworkDeviceConfig): unknown {
    const obj: any = {};
    message.interface !== undefined && (obj.interface = message.interface);
    message.cidr !== undefined && (obj.cidr = message.cidr);
    message.mtu !== undefined && (obj.mtu = Math.round(message.mtu));
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

  fromPartial<I extends Exact<DeepPartial<NetworkDeviceConfig>, I>>(
    object: I
  ): NetworkDeviceConfig {
    const message = createBaseNetworkDeviceConfig();
    message.interface = object.interface ?? "";
    message.cidr = object.cidr ?? "";
    message.mtu = object.mtu ?? 0;
    message.dhcp = object.dhcp ?? false;
    message.ignore = object.ignore ?? false;
    message.dhcp_options =
      object.dhcp_options !== undefined && object.dhcp_options !== null
        ? DHCPOptionsConfig.fromPartial(object.dhcp_options)
        : undefined;
    message.routes =
      object.routes?.map((e) => RouteConfig.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNetworkConfig(): NetworkConfig {
  return { hostname: "", interfaces: [] };
}

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
    const message = createBaseNetworkConfig();
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
    return {
      hostname: isSet(object.hostname) ? String(object.hostname) : "",
      interfaces: Array.isArray(object?.interfaces)
        ? object.interfaces.map((e: any) => NetworkDeviceConfig.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<NetworkConfig>, I>>(
    object: I
  ): NetworkConfig {
    const message = createBaseNetworkConfig();
    message.hostname = object.hostname ?? "";
    message.interfaces =
      object.interfaces?.map((e) => NetworkDeviceConfig.fromPartial(e)) || [];
    return message;
  },
};

function createBaseInstallConfig(): InstallConfig {
  return { install_disk: "", install_image: "" };
}

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
    const message = createBaseInstallConfig();
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
    return {
      install_disk: isSet(object.install_disk)
        ? String(object.install_disk)
        : "",
      install_image: isSet(object.install_image)
        ? String(object.install_image)
        : "",
    };
  },

  toJSON(message: InstallConfig): unknown {
    const obj: any = {};
    message.install_disk !== undefined &&
      (obj.install_disk = message.install_disk);
    message.install_image !== undefined &&
      (obj.install_image = message.install_image);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InstallConfig>, I>>(
    object: I
  ): InstallConfig {
    const message = createBaseInstallConfig();
    message.install_disk = object.install_disk ?? "";
    message.install_image = object.install_image ?? "";
    return message;
  },
};

function createBaseMachineConfig(): MachineConfig {
  return {
    type: 0,
    install_config: undefined,
    network_config: undefined,
    kubernetes_version: "",
  };
}

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
    const message = createBaseMachineConfig();
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
    return {
      type: isSet(object.type)
        ? machineConfig_MachineTypeFromJSON(object.type)
        : 0,
      install_config: isSet(object.install_config)
        ? InstallConfig.fromJSON(object.install_config)
        : undefined,
      network_config: isSet(object.network_config)
        ? NetworkConfig.fromJSON(object.network_config)
        : undefined,
      kubernetes_version: isSet(object.kubernetes_version)
        ? String(object.kubernetes_version)
        : "",
    };
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

  fromPartial<I extends Exact<DeepPartial<MachineConfig>, I>>(
    object: I
  ): MachineConfig {
    const message = createBaseMachineConfig();
    message.type = object.type ?? 0;
    message.install_config =
      object.install_config !== undefined && object.install_config !== null
        ? InstallConfig.fromPartial(object.install_config)
        : undefined;
    message.network_config =
      object.network_config !== undefined && object.network_config !== null
        ? NetworkConfig.fromPartial(object.network_config)
        : undefined;
    message.kubernetes_version = object.kubernetes_version ?? "";
    return message;
  },
};

function createBaseControlPlaneConfig(): ControlPlaneConfig {
  return { endpoint: "" };
}

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
    const message = createBaseControlPlaneConfig();
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
    return {
      endpoint: isSet(object.endpoint) ? String(object.endpoint) : "",
    };
  },

  toJSON(message: ControlPlaneConfig): unknown {
    const obj: any = {};
    message.endpoint !== undefined && (obj.endpoint = message.endpoint);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ControlPlaneConfig>, I>>(
    object: I
  ): ControlPlaneConfig {
    const message = createBaseControlPlaneConfig();
    message.endpoint = object.endpoint ?? "";
    return message;
  },
};

function createBaseCNIConfig(): CNIConfig {
  return { name: "", urls: [] };
}

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
    const message = createBaseCNIConfig();
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
    return {
      name: isSet(object.name) ? String(object.name) : "",
      urls: Array.isArray(object?.urls)
        ? object.urls.map((e: any) => String(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<CNIConfig>, I>>(
    object: I
  ): CNIConfig {
    const message = createBaseCNIConfig();
    message.name = object.name ?? "";
    message.urls = object.urls?.map((e) => e) || [];
    return message;
  },
};

function createBaseClusterNetworkConfig(): ClusterNetworkConfig {
  return { dns_domain: "", cni_config: undefined };
}

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
    const message = createBaseClusterNetworkConfig();
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
    return {
      dns_domain: isSet(object.dns_domain) ? String(object.dns_domain) : "",
      cni_config: isSet(object.cni_config)
        ? CNIConfig.fromJSON(object.cni_config)
        : undefined,
    };
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

  fromPartial<I extends Exact<DeepPartial<ClusterNetworkConfig>, I>>(
    object: I
  ): ClusterNetworkConfig {
    const message = createBaseClusterNetworkConfig();
    message.dns_domain = object.dns_domain ?? "";
    message.cni_config =
      object.cni_config !== undefined && object.cni_config !== null
        ? CNIConfig.fromPartial(object.cni_config)
        : undefined;
    return message;
  },
};

function createBaseClusterConfig(): ClusterConfig {
  return {
    name: "",
    control_plane: undefined,
    cluster_network: undefined,
    allow_scheduling_on_masters: false,
  };
}

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
    const message = createBaseClusterConfig();
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
    return {
      name: isSet(object.name) ? String(object.name) : "",
      control_plane: isSet(object.control_plane)
        ? ControlPlaneConfig.fromJSON(object.control_plane)
        : undefined,
      cluster_network: isSet(object.cluster_network)
        ? ClusterNetworkConfig.fromJSON(object.cluster_network)
        : undefined,
      allow_scheduling_on_masters: isSet(object.allow_scheduling_on_masters)
        ? Boolean(object.allow_scheduling_on_masters)
        : false,
    };
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

  fromPartial<I extends Exact<DeepPartial<ClusterConfig>, I>>(
    object: I
  ): ClusterConfig {
    const message = createBaseClusterConfig();
    message.name = object.name ?? "";
    message.control_plane =
      object.control_plane !== undefined && object.control_plane !== null
        ? ControlPlaneConfig.fromPartial(object.control_plane)
        : undefined;
    message.cluster_network =
      object.cluster_network !== undefined && object.cluster_network !== null
        ? ClusterNetworkConfig.fromPartial(object.cluster_network)
        : undefined;
    message.allow_scheduling_on_masters =
      object.allow_scheduling_on_masters ?? false;
    return message;
  },
};

function createBaseGenerateConfigurationRequest(): GenerateConfigurationRequest {
  return {
    config_version: "",
    cluster_config: undefined,
    machine_config: undefined,
    override_time: undefined,
  };
}

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
    const message = createBaseGenerateConfigurationRequest();
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
    return {
      config_version: isSet(object.config_version)
        ? String(object.config_version)
        : "",
      cluster_config: isSet(object.cluster_config)
        ? ClusterConfig.fromJSON(object.cluster_config)
        : undefined,
      machine_config: isSet(object.machine_config)
        ? MachineConfig.fromJSON(object.machine_config)
        : undefined,
      override_time: isSet(object.override_time)
        ? fromJsonTimestamp(object.override_time)
        : undefined,
    };
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

  fromPartial<I extends Exact<DeepPartial<GenerateConfigurationRequest>, I>>(
    object: I
  ): GenerateConfigurationRequest {
    const message = createBaseGenerateConfigurationRequest();
    message.config_version = object.config_version ?? "";
    message.cluster_config =
      object.cluster_config !== undefined && object.cluster_config !== null
        ? ClusterConfig.fromPartial(object.cluster_config)
        : undefined;
    message.machine_config =
      object.machine_config !== undefined && object.machine_config !== null
        ? MachineConfig.fromPartial(object.machine_config)
        : undefined;
    message.override_time = object.override_time ?? undefined;
    return message;
  },
};

function createBaseGenerateConfiguration(): GenerateConfiguration {
  return { metadata: undefined, data: [], talosconfig: new Uint8Array() };
}

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
    const message = createBaseGenerateConfiguration();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      data: Array.isArray(object?.data)
        ? object.data.map((e: any) => bytesFromBase64(e))
        : [],
      talosconfig: isSet(object.talosconfig)
        ? bytesFromBase64(object.talosconfig)
        : new Uint8Array(),
    };
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

  fromPartial<I extends Exact<DeepPartial<GenerateConfiguration>, I>>(
    object: I
  ): GenerateConfiguration {
    const message = createBaseGenerateConfiguration();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.data = object.data?.map((e) => e) || [];
    message.talosconfig = object.talosconfig ?? new Uint8Array();
    return message;
  },
};

function createBaseGenerateConfigurationResponse(): GenerateConfigurationResponse {
  return { messages: [] };
}

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
    const message = createBaseGenerateConfigurationResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => GenerateConfiguration.fromJSON(e))
        : [],
    };
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

  fromPartial<I extends Exact<DeepPartial<GenerateConfigurationResponse>, I>>(
    object: I
  ): GenerateConfigurationResponse {
    const message = createBaseGenerateConfigurationResponse();
    message.messages =
      object.messages?.map((e) => GenerateConfiguration.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGenerateClientConfigurationRequest(): GenerateClientConfigurationRequest {
  return { roles: [], crt_ttl: undefined };
}

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
    const message = createBaseGenerateClientConfigurationRequest();
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
    return {
      roles: Array.isArray(object?.roles)
        ? object.roles.map((e: any) => String(e))
        : [],
      crt_ttl: isSet(object.crt_ttl)
        ? Duration.fromJSON(object.crt_ttl)
        : undefined,
    };
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

  fromPartial<
    I extends Exact<DeepPartial<GenerateClientConfigurationRequest>, I>
  >(object: I): GenerateClientConfigurationRequest {
    const message = createBaseGenerateClientConfigurationRequest();
    message.roles = object.roles?.map((e) => e) || [];
    message.crt_ttl =
      object.crt_ttl !== undefined && object.crt_ttl !== null
        ? Duration.fromPartial(object.crt_ttl)
        : undefined;
    return message;
  },
};

function createBaseGenerateClientConfiguration(): GenerateClientConfiguration {
  return {
    metadata: undefined,
    ca: new Uint8Array(),
    crt: new Uint8Array(),
    key: new Uint8Array(),
    talosconfig: new Uint8Array(),
  };
}

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
    const message = createBaseGenerateClientConfiguration();
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
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      ca: isSet(object.ca) ? bytesFromBase64(object.ca) : new Uint8Array(),
      crt: isSet(object.crt) ? bytesFromBase64(object.crt) : new Uint8Array(),
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
      talosconfig: isSet(object.talosconfig)
        ? bytesFromBase64(object.talosconfig)
        : new Uint8Array(),
    };
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

  fromPartial<I extends Exact<DeepPartial<GenerateClientConfiguration>, I>>(
    object: I
  ): GenerateClientConfiguration {
    const message = createBaseGenerateClientConfiguration();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.ca = object.ca ?? new Uint8Array();
    message.crt = object.crt ?? new Uint8Array();
    message.key = object.key ?? new Uint8Array();
    message.talosconfig = object.talosconfig ?? new Uint8Array();
    return message;
  },
};

function createBaseGenerateClientConfigurationResponse(): GenerateClientConfigurationResponse {
  return { messages: [] };
}

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
    const message = createBaseGenerateClientConfigurationResponse();
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
    return {
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) =>
            GenerateClientConfiguration.fromJSON(e)
          )
        : [],
    };
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

  fromPartial<
    I extends Exact<DeepPartial<GenerateClientConfigurationResponse>, I>
  >(object: I): GenerateClientConfigurationResponse {
    const message = createBaseGenerateClientConfigurationResponse();
    message.messages =
      object.messages?.map((e) => GenerateClientConfiguration.fromPartial(e)) ||
      [];
    return message;
  },
};

/** The machine service definition. */
export interface MachineService {
  ApplyConfiguration(
    request: ApplyConfigurationRequest
  ): Promise<ApplyConfigurationResponse>;
  /**
   * Bootstrap method makes control plane node enter etcd bootstrap mode.
   *
   * Node aborts etcd join sequence and creates single-node etcd cluster.
   *
   * If recover_etcd argument is specified, etcd is recovered from a snapshot
   * uploaded with EtcdRecover.
   */
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
  Reboot(request: RebootRequest): Promise<RebootResponse>;
  Restart(request: RestartRequest): Promise<RestartResponse>;
  Rollback(request: RollbackRequest): Promise<RollbackResponse>;
  Reset(request: ResetRequest): Promise<ResetResponse>;
  ServiceList(request: Empty): Promise<ServiceListResponse>;
  ServiceRestart(
    request: ServiceRestartRequest
  ): Promise<ServiceRestartResponse>;
  ServiceStart(request: ServiceStartRequest): Promise<ServiceStartResponse>;
  ServiceStop(request: ServiceStopRequest): Promise<ServiceStopResponse>;
  Shutdown(request: ShutdownRequest): Promise<ShutdownResponse>;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
