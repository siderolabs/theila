/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as CommonCommon from "../../common/common.pb"
import * as fm from "../../fetch.pb"
import * as GoogleProtobufAny from "../../google/protobuf/any.pb"
import * as GoogleProtobufDuration from "../../google/protobuf/duration.pb"
import * as GoogleProtobufEmpty from "../../google/protobuf/empty.pb"
import * as GoogleProtobufTimestamp from "../../google/protobuf/timestamp.pb"

export enum ApplyConfigurationRequestMode {
  REBOOT = "REBOOT",
  AUTO = "AUTO",
  NO_REBOOT = "NO_REBOOT",
  STAGED = "STAGED",
}

export enum RebootRequestMode {
  DEFAULT = "DEFAULT",
  POWERCYCLE = "POWERCYCLE",
}

export enum SequenceEventAction {
  NOOP = "NOOP",
  START = "START",
  STOP = "STOP",
}

export enum PhaseEventAction {
  START = "START",
  STOP = "STOP",
}

export enum TaskEventAction {
  START = "START",
  STOP = "STOP",
}

export enum ServiceStateEventAction {
  INITIALIZED = "INITIALIZED",
  PREPARING = "PREPARING",
  WAITING = "WAITING",
  RUNNING = "RUNNING",
  STOPPING = "STOPPING",
  FINISHED = "FINISHED",
  FAILED = "FAILED",
  SKIPPED = "SKIPPED",
}

export enum ListRequestType {
  REGULAR = "REGULAR",
  DIRECTORY = "DIRECTORY",
  SYMLINK = "SYMLINK",
}

export enum MachineConfigMachineType {
  TYPE_UNKNOWN = "TYPE_UNKNOWN",
  TYPE_INIT = "TYPE_INIT",
  TYPE_CONTROL_PLANE = "TYPE_CONTROL_PLANE",
  TYPE_WORKER = "TYPE_WORKER",
}

export type ApplyConfigurationRequest = {
  data?: Uint8Array
  onReboot?: boolean
  immediate?: boolean
  mode?: ApplyConfigurationRequestMode
}

export type ApplyConfiguration = {
  metadata?: CommonCommon.Metadata
  warnings?: string[]
  mode?: ApplyConfigurationRequestMode
  modeDetails?: string
}

export type ApplyConfigurationResponse = {
  messages?: ApplyConfiguration[]
}

export type RebootRequest = {
  mode?: RebootRequestMode
}

export type Reboot = {
  metadata?: CommonCommon.Metadata
}

export type RebootResponse = {
  messages?: Reboot[]
}

export type BootstrapRequest = {
  recoverEtcd?: boolean
  recoverSkipHashCheck?: boolean
}

export type Bootstrap = {
  metadata?: CommonCommon.Metadata
}

export type BootstrapResponse = {
  messages?: Bootstrap[]
}

export type SequenceEvent = {
  sequence?: string
  action?: SequenceEventAction
  error?: CommonCommon.Error
}

export type PhaseEvent = {
  phase?: string
  action?: PhaseEventAction
}

export type TaskEvent = {
  task?: string
  action?: TaskEventAction
}

export type ServiceStateEvent = {
  service?: string
  action?: ServiceStateEventAction
  message?: string
  health?: ServiceHealth
}

export type RestartEvent = {
  cmd?: string
}

export type ConfigLoadErrorEvent = {
  error?: string
}

export type ConfigValidationErrorEvent = {
  error?: string
}

export type AddressEvent = {
  hostname?: string
  addresses?: string[]
}

export type EventsRequest = {
  tailEvents?: number
  tailId?: string
  tailSeconds?: number
}

export type Event = {
  metadata?: CommonCommon.Metadata
  data?: GoogleProtobufAny.Any
  id?: string
}

export type ResetPartitionSpec = {
  label?: string
  wipe?: boolean
}

export type ResetRequest = {
  graceful?: boolean
  reboot?: boolean
  systemPartitionsToWipe?: ResetPartitionSpec[]
}

export type Reset = {
  metadata?: CommonCommon.Metadata
}

export type ResetResponse = {
  messages?: Reset[]
}

export type Shutdown = {
  metadata?: CommonCommon.Metadata
}

export type ShutdownResponse = {
  messages?: Shutdown[]
}

export type UpgradeRequest = {
  image?: string
  preserve?: boolean
  stage?: boolean
  force?: boolean
}

export type Upgrade = {
  metadata?: CommonCommon.Metadata
  ack?: string
}

export type UpgradeResponse = {
  messages?: Upgrade[]
}

export type ServiceList = {
  metadata?: CommonCommon.Metadata
  services?: ServiceInfo[]
}

export type ServiceListResponse = {
  messages?: ServiceList[]
}

export type ServiceInfo = {
  id?: string
  state?: string
  events?: ServiceEvents
  health?: ServiceHealth
}

export type ServiceEvents = {
  events?: ServiceEvent[]
}

export type ServiceEvent = {
  msg?: string
  state?: string
  ts?: GoogleProtobufTimestamp.Timestamp
}

export type ServiceHealth = {
  unknown?: boolean
  healthy?: boolean
  lastMessage?: string
  lastChange?: GoogleProtobufTimestamp.Timestamp
}

export type ServiceStartRequest = {
  id?: string
}

export type ServiceStart = {
  metadata?: CommonCommon.Metadata
  resp?: string
}

export type ServiceStartResponse = {
  messages?: ServiceStart[]
}

export type ServiceStopRequest = {
  id?: string
}

export type ServiceStop = {
  metadata?: CommonCommon.Metadata
  resp?: string
}

export type ServiceStopResponse = {
  messages?: ServiceStop[]
}

export type ServiceRestartRequest = {
  id?: string
}

export type ServiceRestart = {
  metadata?: CommonCommon.Metadata
  resp?: string
}

export type ServiceRestartResponse = {
  messages?: ServiceRestart[]
}

export type CopyRequest = {
  rootPath?: string
}

export type ListRequest = {
  root?: string
  recurse?: boolean
  recursionDepth?: number
  types?: ListRequestType[]
}

export type DiskUsageRequest = {
  recursionDepth?: number
  all?: boolean
  threshold?: string
  paths?: string[]
}

export type FileInfo = {
  metadata?: CommonCommon.Metadata
  name?: string
  size?: string
  mode?: number
  modified?: string
  isDir?: boolean
  error?: string
  link?: string
  relativeName?: string
  uid?: number
  gid?: number
}

export type DiskUsageInfo = {
  metadata?: CommonCommon.Metadata
  name?: string
  size?: string
  error?: string
  relativeName?: string
}

export type Mounts = {
  metadata?: CommonCommon.Metadata
  stats?: MountStat[]
}

export type MountsResponse = {
  messages?: Mounts[]
}

export type MountStat = {
  filesystem?: string
  size?: string
  available?: string
  mountedOn?: string
}

export type Version = {
  metadata?: CommonCommon.Metadata
  version?: VersionInfo
  platform?: PlatformInfo
  features?: FeaturesInfo
}

export type VersionResponse = {
  messages?: Version[]
}

export type VersionInfo = {
  tag?: string
  sha?: string
  built?: string
  goVersion?: string
  os?: string
  arch?: string
}

export type PlatformInfo = {
  name?: string
  mode?: string
}

export type FeaturesInfo = {
  rbac?: boolean
}

export type LogsRequest = {
  namespace?: string
  id?: string
  driver?: CommonCommon.ContainerDriver
  follow?: boolean
  tailLines?: number
}

export type ReadRequest = {
  path?: string
}

export type RollbackRequest = {
}

export type Rollback = {
  metadata?: CommonCommon.Metadata
}

export type RollbackResponse = {
  messages?: Rollback[]
}

export type ContainersRequest = {
  namespace?: string
  driver?: CommonCommon.ContainerDriver
}

export type ContainerInfo = {
  namespace?: string
  id?: string
  image?: string
  pid?: number
  status?: string
  podId?: string
  name?: string
}

export type Container = {
  metadata?: CommonCommon.Metadata
  containers?: ContainerInfo[]
}

export type ContainersResponse = {
  messages?: Container[]
}

export type DmesgRequest = {
  follow?: boolean
  tail?: boolean
}

export type ProcessesResponse = {
  messages?: Process[]
}

export type Process = {
  metadata?: CommonCommon.Metadata
  processes?: ProcessInfo[]
}

export type ProcessInfo = {
  pid?: number
  ppid?: number
  state?: string
  threads?: number
  cpuTime?: number
  virtualMemory?: string
  residentMemory?: string
  command?: string
  executable?: string
  args?: string
}

export type RestartRequest = {
  namespace?: string
  id?: string
  driver?: CommonCommon.ContainerDriver
}

export type Restart = {
  metadata?: CommonCommon.Metadata
}

export type RestartResponse = {
  messages?: Restart[]
}

export type StatsRequest = {
  namespace?: string
  driver?: CommonCommon.ContainerDriver
}

export type Stats = {
  metadata?: CommonCommon.Metadata
  stats?: Stat[]
}

export type StatsResponse = {
  messages?: Stats[]
}

export type Stat = {
  namespace?: string
  id?: string
  memoryUsage?: string
  cpuUsage?: string
  podId?: string
  name?: string
}

export type Memory = {
  metadata?: CommonCommon.Metadata
  meminfo?: MemInfo
}

export type MemoryResponse = {
  messages?: Memory[]
}

export type MemInfo = {
  memtotal?: string
  memfree?: string
  memavailable?: string
  buffers?: string
  cached?: string
  swapcached?: string
  active?: string
  inactive?: string
  activeanon?: string
  inactiveanon?: string
  activefile?: string
  inactivefile?: string
  unevictable?: string
  mlocked?: string
  swaptotal?: string
  swapfree?: string
  dirty?: string
  writeback?: string
  anonpages?: string
  mapped?: string
  shmem?: string
  slab?: string
  sreclaimable?: string
  sunreclaim?: string
  kernelstack?: string
  pagetables?: string
  nfsunstable?: string
  bounce?: string
  writebacktmp?: string
  commitlimit?: string
  committedas?: string
  vmalloctotal?: string
  vmallocused?: string
  vmallocchunk?: string
  hardwarecorrupted?: string
  anonhugepages?: string
  shmemhugepages?: string
  shmempmdmapped?: string
  cmatotal?: string
  cmafree?: string
  hugepagestotal?: string
  hugepagesfree?: string
  hugepagesrsvd?: string
  hugepagessurp?: string
  hugepagesize?: string
  directmap4K?: string
  directmap2M?: string
  directmap1G?: string
}

export type HostnameResponse = {
  messages?: Hostname[]
}

export type Hostname = {
  metadata?: CommonCommon.Metadata
  hostname?: string
}

export type LoadAvgResponse = {
  messages?: LoadAvg[]
}

export type LoadAvg = {
  metadata?: CommonCommon.Metadata
  load1?: number
  load5?: number
  load15?: number
}

export type SystemStatResponse = {
  messages?: SystemStat[]
}

export type SystemStat = {
  metadata?: CommonCommon.Metadata
  bootTime?: string
  cpuTotal?: CPUStat
  cpu?: CPUStat[]
  irqTotal?: string
  irq?: string[]
  contextSwitches?: string
  processCreated?: string
  processRunning?: string
  processBlocked?: string
  softIrqTotal?: string
  softIrq?: SoftIRQStat
}

export type CPUStat = {
  user?: number
  nice?: number
  system?: number
  idle?: number
  iowait?: number
  irq?: number
  softIrq?: number
  steal?: number
  guest?: number
  guestNice?: number
}

export type SoftIRQStat = {
  hi?: string
  timer?: string
  netTx?: string
  netRx?: string
  block?: string
  blockIoPoll?: string
  tasklet?: string
  sched?: string
  hrtimer?: string
  rcu?: string
}

export type CPUInfoResponse = {
  messages?: CPUsInfo[]
}

export type CPUsInfo = {
  metadata?: CommonCommon.Metadata
  cpuInfo?: CPUInfo[]
}

export type CPUInfo = {
  processor?: number
  vendorId?: string
  cpuFamily?: string
  model?: string
  modelName?: string
  stepping?: string
  microcode?: string
  cpuMhz?: number
  cacheSize?: string
  physicalId?: string
  siblings?: number
  coreId?: string
  cpuCores?: number
  apicId?: string
  initialApicId?: string
  fpu?: string
  fpuException?: string
  cpuIdLevel?: number
  wp?: string
  flags?: string[]
  bugs?: string[]
  bogoMips?: number
  clFlushSize?: number
  cacheAlignment?: number
  addressSizes?: string
  powerManagement?: string
}

export type NetworkDeviceStatsResponse = {
  messages?: NetworkDeviceStats[]
}

export type NetworkDeviceStats = {
  metadata?: CommonCommon.Metadata
  total?: NetDev
  devices?: NetDev[]
}

export type NetDev = {
  name?: string
  rxBytes?: string
  rxPackets?: string
  rxErrors?: string
  rxDropped?: string
  rxFifo?: string
  rxFrame?: string
  rxCompressed?: string
  rxMulticast?: string
  txBytes?: string
  txPackets?: string
  txErrors?: string
  txDropped?: string
  txFifo?: string
  txCollisions?: string
  txCarrier?: string
  txCompressed?: string
}

export type DiskStatsResponse = {
  messages?: DiskStats[]
}

export type DiskStats = {
  metadata?: CommonCommon.Metadata
  total?: DiskStat
  devices?: DiskStat[]
}

export type DiskStat = {
  name?: string
  readCompleted?: string
  readMerged?: string
  readSectors?: string
  readTimeMs?: string
  writeCompleted?: string
  writeMerged?: string
  writeSectors?: string
  writeTimeMs?: string
  ioInProgress?: string
  ioTimeMs?: string
  ioTimeWeightedMs?: string
  discardCompleted?: string
  discardMerged?: string
  discardSectors?: string
  discardTimeMs?: string
}

export type EtcdLeaveClusterRequest = {
}

export type EtcdLeaveCluster = {
  metadata?: CommonCommon.Metadata
}

export type EtcdLeaveClusterResponse = {
  messages?: EtcdLeaveCluster[]
}

export type EtcdRemoveMemberRequest = {
  member?: string
}

export type EtcdRemoveMember = {
  metadata?: CommonCommon.Metadata
}

export type EtcdRemoveMemberResponse = {
  messages?: EtcdRemoveMember[]
}

export type EtcdForfeitLeadershipRequest = {
}

export type EtcdForfeitLeadership = {
  metadata?: CommonCommon.Metadata
  member?: string
}

export type EtcdForfeitLeadershipResponse = {
  messages?: EtcdForfeitLeadership[]
}

export type EtcdMemberListRequest = {
  queryLocal?: boolean
}

export type EtcdMember = {
  id?: string
  hostname?: string
  peerUrls?: string[]
  clientUrls?: string[]
  isLearner?: boolean
}

export type EtcdMembers = {
  metadata?: CommonCommon.Metadata
  legacyMembers?: string[]
  members?: EtcdMember[]
}

export type EtcdMemberListResponse = {
  messages?: EtcdMembers[]
}

export type EtcdSnapshotRequest = {
}

export type EtcdRecover = {
  metadata?: CommonCommon.Metadata
}

export type EtcdRecoverResponse = {
  messages?: EtcdRecover[]
}

export type RouteConfig = {
  network?: string
  gateway?: string
  metric?: number
}

export type DHCPOptionsConfig = {
  routeMetric?: number
}

export type NetworkDeviceConfig = {
  interface?: string
  cidr?: string
  mtu?: number
  dhcp?: boolean
  ignore?: boolean
  dhcpOptions?: DHCPOptionsConfig
  routes?: RouteConfig[]
}

export type NetworkConfig = {
  hostname?: string
  interfaces?: NetworkDeviceConfig[]
}

export type InstallConfig = {
  installDisk?: string
  installImage?: string
}

export type MachineConfig = {
  type?: MachineConfigMachineType
  installConfig?: InstallConfig
  networkConfig?: NetworkConfig
  kubernetesVersion?: string
}

export type ControlPlaneConfig = {
  endpoint?: string
}

export type CNIConfig = {
  name?: string
  urls?: string[]
}

export type ClusterNetworkConfig = {
  dnsDomain?: string
  cniConfig?: CNIConfig
}

export type ClusterConfig = {
  name?: string
  controlPlane?: ControlPlaneConfig
  clusterNetwork?: ClusterNetworkConfig
  allowSchedulingOnMasters?: boolean
}

export type GenerateConfigurationRequest = {
  configVersion?: string
  clusterConfig?: ClusterConfig
  machineConfig?: MachineConfig
  overrideTime?: GoogleProtobufTimestamp.Timestamp
}

export type GenerateConfiguration = {
  metadata?: CommonCommon.Metadata
  data?: Uint8Array[]
  talosconfig?: Uint8Array
}

export type GenerateConfigurationResponse = {
  messages?: GenerateConfiguration[]
}

export type GenerateClientConfigurationRequest = {
  roles?: string[]
  crtTtl?: GoogleProtobufDuration.Duration
}

export type GenerateClientConfiguration = {
  metadata?: CommonCommon.Metadata
  ca?: Uint8Array
  crt?: Uint8Array
  key?: Uint8Array
  talosconfig?: Uint8Array
}

export type GenerateClientConfigurationResponse = {
  messages?: GenerateClientConfiguration[]
}

export class MachineService {
  static ApplyConfiguration(req: ApplyConfigurationRequest, initReq?: fm.InitReq): Promise<ApplyConfigurationResponse> {
    return fm.fetchReq<ApplyConfigurationRequest, ApplyConfigurationResponse>(`/machine.MachineService/ApplyConfiguration`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Bootstrap(req: BootstrapRequest, initReq?: fm.InitReq): Promise<BootstrapResponse> {
    return fm.fetchReq<BootstrapRequest, BootstrapResponse>(`/machine.MachineService/Bootstrap`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Containers(req: ContainersRequest, initReq?: fm.InitReq): Promise<ContainersResponse> {
    return fm.fetchReq<ContainersRequest, ContainersResponse>(`/machine.MachineService/Containers`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Copy(req: CopyRequest, entityNotifier?: fm.NotifyStreamEntityArrival<CommonCommon.Data>, initReq?: fm.InitReq): Promise<void> {
    return fm.fetchStreamingRequest<CopyRequest, CommonCommon.Data>(`/machine.MachineService/Copy`, entityNotifier, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static CPUInfo(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<CPUInfoResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, CPUInfoResponse>(`/machine.MachineService/CPUInfo`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static DiskStats(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<DiskStatsResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, DiskStatsResponse>(`/machine.MachineService/DiskStats`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Dmesg(req: DmesgRequest, entityNotifier?: fm.NotifyStreamEntityArrival<CommonCommon.Data>, initReq?: fm.InitReq): Promise<void> {
    return fm.fetchStreamingRequest<DmesgRequest, CommonCommon.Data>(`/machine.MachineService/Dmesg`, entityNotifier, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Events(req: EventsRequest, entityNotifier?: fm.NotifyStreamEntityArrival<Event>, initReq?: fm.InitReq): Promise<void> {
    return fm.fetchStreamingRequest<EventsRequest, Event>(`/machine.MachineService/Events`, entityNotifier, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static EtcdMemberList(req: EtcdMemberListRequest, initReq?: fm.InitReq): Promise<EtcdMemberListResponse> {
    return fm.fetchReq<EtcdMemberListRequest, EtcdMemberListResponse>(`/machine.MachineService/EtcdMemberList`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static EtcdRemoveMember(req: EtcdRemoveMemberRequest, initReq?: fm.InitReq): Promise<EtcdRemoveMemberResponse> {
    return fm.fetchReq<EtcdRemoveMemberRequest, EtcdRemoveMemberResponse>(`/machine.MachineService/EtcdRemoveMember`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static EtcdLeaveCluster(req: EtcdLeaveClusterRequest, initReq?: fm.InitReq): Promise<EtcdLeaveClusterResponse> {
    return fm.fetchReq<EtcdLeaveClusterRequest, EtcdLeaveClusterResponse>(`/machine.MachineService/EtcdLeaveCluster`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static EtcdForfeitLeadership(req: EtcdForfeitLeadershipRequest, initReq?: fm.InitReq): Promise<EtcdForfeitLeadershipResponse> {
    return fm.fetchReq<EtcdForfeitLeadershipRequest, EtcdForfeitLeadershipResponse>(`/machine.MachineService/EtcdForfeitLeadership`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static EtcdSnapshot(req: EtcdSnapshotRequest, entityNotifier?: fm.NotifyStreamEntityArrival<CommonCommon.Data>, initReq?: fm.InitReq): Promise<void> {
    return fm.fetchStreamingRequest<EtcdSnapshotRequest, CommonCommon.Data>(`/machine.MachineService/EtcdSnapshot`, entityNotifier, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static GenerateConfiguration(req: GenerateConfigurationRequest, initReq?: fm.InitReq): Promise<GenerateConfigurationResponse> {
    return fm.fetchReq<GenerateConfigurationRequest, GenerateConfigurationResponse>(`/machine.MachineService/GenerateConfiguration`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Hostname(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<HostnameResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, HostnameResponse>(`/machine.MachineService/Hostname`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Kubeconfig(req: GoogleProtobufEmpty.Empty, entityNotifier?: fm.NotifyStreamEntityArrival<CommonCommon.Data>, initReq?: fm.InitReq): Promise<void> {
    return fm.fetchStreamingRequest<GoogleProtobufEmpty.Empty, CommonCommon.Data>(`/machine.MachineService/Kubeconfig`, entityNotifier, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static List(req: ListRequest, entityNotifier?: fm.NotifyStreamEntityArrival<FileInfo>, initReq?: fm.InitReq): Promise<void> {
    return fm.fetchStreamingRequest<ListRequest, FileInfo>(`/machine.MachineService/List`, entityNotifier, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static DiskUsage(req: DiskUsageRequest, entityNotifier?: fm.NotifyStreamEntityArrival<DiskUsageInfo>, initReq?: fm.InitReq): Promise<void> {
    return fm.fetchStreamingRequest<DiskUsageRequest, DiskUsageInfo>(`/machine.MachineService/DiskUsage`, entityNotifier, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static LoadAvg(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<LoadAvgResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, LoadAvgResponse>(`/machine.MachineService/LoadAvg`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Logs(req: LogsRequest, entityNotifier?: fm.NotifyStreamEntityArrival<CommonCommon.Data>, initReq?: fm.InitReq): Promise<void> {
    return fm.fetchStreamingRequest<LogsRequest, CommonCommon.Data>(`/machine.MachineService/Logs`, entityNotifier, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Memory(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<MemoryResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, MemoryResponse>(`/machine.MachineService/Memory`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Mounts(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<MountsResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, MountsResponse>(`/machine.MachineService/Mounts`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static NetworkDeviceStats(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<NetworkDeviceStatsResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, NetworkDeviceStatsResponse>(`/machine.MachineService/NetworkDeviceStats`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Processes(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<ProcessesResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, ProcessesResponse>(`/machine.MachineService/Processes`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Read(req: ReadRequest, entityNotifier?: fm.NotifyStreamEntityArrival<CommonCommon.Data>, initReq?: fm.InitReq): Promise<void> {
    return fm.fetchStreamingRequest<ReadRequest, CommonCommon.Data>(`/machine.MachineService/Read`, entityNotifier, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Reboot(req: RebootRequest, initReq?: fm.InitReq): Promise<RebootResponse> {
    return fm.fetchReq<RebootRequest, RebootResponse>(`/machine.MachineService/Reboot`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Restart(req: RestartRequest, initReq?: fm.InitReq): Promise<RestartResponse> {
    return fm.fetchReq<RestartRequest, RestartResponse>(`/machine.MachineService/Restart`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Rollback(req: RollbackRequest, initReq?: fm.InitReq): Promise<RollbackResponse> {
    return fm.fetchReq<RollbackRequest, RollbackResponse>(`/machine.MachineService/Rollback`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Reset(req: ResetRequest, initReq?: fm.InitReq): Promise<ResetResponse> {
    return fm.fetchReq<ResetRequest, ResetResponse>(`/machine.MachineService/Reset`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static ServiceList(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<ServiceListResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, ServiceListResponse>(`/machine.MachineService/ServiceList`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static ServiceRestart(req: ServiceRestartRequest, initReq?: fm.InitReq): Promise<ServiceRestartResponse> {
    return fm.fetchReq<ServiceRestartRequest, ServiceRestartResponse>(`/machine.MachineService/ServiceRestart`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static ServiceStart(req: ServiceStartRequest, initReq?: fm.InitReq): Promise<ServiceStartResponse> {
    return fm.fetchReq<ServiceStartRequest, ServiceStartResponse>(`/machine.MachineService/ServiceStart`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static ServiceStop(req: ServiceStopRequest, initReq?: fm.InitReq): Promise<ServiceStopResponse> {
    return fm.fetchReq<ServiceStopRequest, ServiceStopResponse>(`/machine.MachineService/ServiceStop`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Shutdown(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<ShutdownResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, ShutdownResponse>(`/machine.MachineService/Shutdown`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Stats(req: StatsRequest, initReq?: fm.InitReq): Promise<StatsResponse> {
    return fm.fetchReq<StatsRequest, StatsResponse>(`/machine.MachineService/Stats`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static SystemStat(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<SystemStatResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, SystemStatResponse>(`/machine.MachineService/SystemStat`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Upgrade(req: UpgradeRequest, initReq?: fm.InitReq): Promise<UpgradeResponse> {
    return fm.fetchReq<UpgradeRequest, UpgradeResponse>(`/machine.MachineService/Upgrade`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static Version(req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<VersionResponse> {
    return fm.fetchReq<GoogleProtobufEmpty.Empty, VersionResponse>(`/machine.MachineService/Version`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
  static GenerateClientConfiguration(req: GenerateClientConfigurationRequest, initReq?: fm.InitReq): Promise<GenerateClientConfigurationResponse> {
    return fm.fetchReq<GenerateClientConfigurationRequest, GenerateClientConfigurationResponse>(`/machine.MachineService/GenerateClientConfiguration`, {...initReq, method: "POST", body: JSON.stringify(req)})
  }
}