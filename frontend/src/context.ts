// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Client } from "./api/client";

// create a singleton.
export namespace context {
  export const api:Client = new Client();
}
