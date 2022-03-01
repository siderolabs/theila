import { Code } from './../api/google/rpc/code';
import { ResourceService } from './../api/grpc';
import { ContextService } from "@/api/grpc";
import { TNodesViewFilterOptions, TCommonStatuses } from "@/constants";
import { getContext } from "@/context";
import { DateTime } from "luxon";
import { kubernetes } from '@/api/resources';

export const getStatus = (item) => {
  const conditions = item?.status?.conditions;
  if (!conditions) return TNodesViewFilterOptions.NOT_READY;

  for (const c of conditions) {
    if (c["type"] === TNodesViewFilterOptions.READY && c["status"] === "True")
      return TNodesViewFilterOptions.READY;
  }

  return TNodesViewFilterOptions.NOT_READY;
};

export const getServiceHealthStatus = (service) => {
  return service?.spec?.unknown
    ? TCommonStatuses.HEALTH_UNKNOWN
    : service?.spec?.healthy
    ? TCommonStatuses.READY
    : TCommonStatuses.UNHEALTHY;
};
export const isCreationTimeMatches = (items) => {
 return items.every((item, idx) => {
    if (items[idx - 1]) {
      item["metadata"]["creationTimestamp"] === items[idx - 1]["metadata"]["creationTimestamp"]
    }
    })
  
}
export  const sortServersByTimestamp = (items, status) => {
  return status
    ? items.sort((a: any, b: any): any => {
        return DateTime.fromISO(a["metadata"]["creationTimestamp"]).ts <
          DateTime.fromISO(b["metadata"]["creationTimestamp"]).ts
          ? 1
          : -1;
      })
    : items.sort((a: any, b: any): any => {
        return DateTime.fromISO(a["metadata"]["creationTimestamp"]).ts >
          DateTime.fromISO(b["metadata"]["creationTimestamp"]).ts
          ? 1
          : -1;
      });
};
export const sortServersByNames = (items,status) => {
  return status
    ? items.sort(function(a, b){
      if(a["metadata"]["uid"] < b["metadata"]["uid"]) { return -1; }
      if(a["metadata"]["uid"] > b["metadata"]["uid"]) { return 1; }
      return 0;
  })
    :  items.sort(function(a, b){
      if(a["metadata"]["uid"] > b["metadata"]["uid"]) { return -1; }
      if(a["metadata"]["uid"] < b["metadata"]["uid"]) { return 1; }
      return 0;
  })
};

export const getField = (item,...args) => {
  let res: any = item;
  for (const k of args) {
    if (!res[k]) return null;

    res = res[k];
  }

  return res;
};

export const cpuParser = (input)=> {
  const milliMatch = input.match(/^([0-9]+)m$/);
  if (milliMatch) {
    return milliMatch[1] / 1000;
  }

  return parseFloat(input);
}

const memoryMultipliers = {
  k: 1000,
  M: 1000 ** 2,
  G: 1000 ** 3,
  T: 1000 ** 4,
  P: 1000 ** 5,
  E: 1000 ** 6,
  Ki: 1024,
  Mi: 1024 ** 2,
  Gi: 1024 ** 3,
  Ti: 1024 ** 4,
  Pi: 1024 ** 5,
  Ei: 1024 ** 6,
};

export const memoryParser = (input) => {
  const unitMatch = input.match(/^([0-9]+)([A-Za-z]{1,2})$/);
  if (unitMatch) {
    return parseInt(unitMatch[1], 10) * memoryMultipliers[unitMatch[2]];
  }

  return parseInt(input, 10);
}

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const getUpgradeID = async () => {
  const ctx = getContext();
  const contextName = ctx.name;
  const response = ContextService.List();
  return  ctx.cluster
    ? ctx.cluster.uid
    : null || contextName || response?.currentContext;
}

export const checkIsSidero = async (context) => {
  
  const checkCRD = async (id: string) => {
    try {
      await ResourceService.Get({
        type: kubernetes.crd,
        id: id,
      }, {
        context:context
      });

      return true;
    } catch(e:any) {
      if(e.code !== Code.NOT_FOUND)
        throw e;

      return false;
    }
  }
  const sidero = checkCRD("servers.metal.sidero.dev");
  const hasSidero = await sidero;
  
  return hasSidero;
}