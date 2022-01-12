import { TNodesViewFilterOptions, TCommonStatuses } from "@/constants";

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
