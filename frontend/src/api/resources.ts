// This Runtime Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  UpgradeK8sSpec,
  TaskStatusSpec,
  TaskLogSpec,
  KubernetesVersionSpec,
} from './rpc/management';

import {
  KubernetesResourceSpec,
} from './rpc/resource';

// Manual definitions for COSI resource types.
// Would be nice to somehow generate them both for Go and TS, but that's not clear how to do as of now.
export const UpgradeTaskType = "UpgradeTasks.theila.sidero.dev";
export const TaskStatusType = "TaskStatuses.theila.sidero.dev";
export const TaskLogType = "TaskLogs.theila.sidero.dev";
export const KubernetesVersionType = "KubernetesVersions.theila.sidero.dev";
export const KubernetesResourceType = "KubernetesResources.theila.sidero.dev";

export const DefaultNamespace = "default";

const registeredTypes = {
  [UpgradeTaskType]: UpgradeK8sSpec,
  [TaskStatusType]: TaskStatusSpec,
  [TaskLogType]: TaskLogSpec,
  [KubernetesVersionType]: KubernetesVersionSpec,
  [KubernetesResourceType]: {
    encode: KubernetesResourceSpec.encode,
    fromPartial: KubernetesResourceSpec.fromPartial,
    preprocess: (spec) => {
      const data = JSON.stringify(spec);

      return {
        spec: data,
      };
    }
  }
};

const camelToSnakeCaseKey = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
const camelToSnakeCase = object => {
  for(const key in object) {
    const snake = camelToSnakeCaseKey(key);
    if(snake !== key) {
      object[snake] = object[key];
      delete(object[key]);
    }

    if(typeof object[key] === "object")
      camelToSnakeCase(object.key);
  }
};

export const encodeProtobuf = (type?: string, spec?: any) => {
  if(!type)
    throw new Error("Resource type is not defined");

  const res = registeredTypes[type];
  if(!res)
    throw new Error(`Resource ${type} encoder is not registered. Please modify ./src/api/resources.ts to add it`);

  if(res.preprocess)
    spec = res.preprocess(spec)

  camelToSnakeCase(spec);

  return res.encode(res.fromPartial(spec)).finish();
}
