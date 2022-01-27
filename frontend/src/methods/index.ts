import { TNodesViewFilterOptions, TCommonStatuses } from "@/constants";
import { DateTime } from "luxon";

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