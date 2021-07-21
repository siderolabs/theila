// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ref, Ref } from 'vue';
import { Client } from "./api/client";
import { ResourceService, RequestError } from './api/grpc';
import { Runtime } from './api/common/theila.pb';
import { Code } from './api/google/rpc/code';

export namespace context {
  // create a singleton for the api.
  export const api:Client = new Client();

  export const current:any = ref(localStorage.context ? JSON.parse(localStorage.context) : null);

  export const capabilities = {
    capi: ref(false),
    sidero: ref(false),
    packet: ref(false),
  };
}

export function changeContext(c: Object) {
  localStorage.context = JSON.stringify(c);

  context.current.value = c;
}

export function getContext(runtime: Runtime): string | null {
  if(context.current.value === null)
    return null;

  return runtime === Runtime.Talos ? context.current.value.cluster : context.current.value.name;
}

export async function detectCapabilities() {
  context.capabilities.capi.value = false;
  context.capabilities.sidero.value = false;
  context.capabilities.packet.value = false;
  const ctx = context.current.value;

  const checkCRD = async (id: string) => {
    try {
      await ResourceService.Get({
        type: "customresourcedefinitions.v1.apiextensions.k8s.io",
        id: id,
      });

      return true;
    } catch(e) {
      if(e.code !== Code.NOT_FOUND)
        throw e;

      return false;
    }
  }

  const capi = checkCRD("clusters.cluster.x-k8s.io");
  const sidero = checkCRD("servers.metal.sidero.dev");
  const packet = checkCRD("packetclusters.infrastructure.cluster.x-k8s.io");

  const hasCAPI = await capi;
  const hasSidero = await sidero;
  const hasPacket = await packet;

  if(ctx != context.current.value) {
    return;
  }

  context.capabilities.capi.value = hasCAPI;
  context.capabilities.sidero.value = hasSidero;
  context.capabilities.packet.value = hasPacket;
}
