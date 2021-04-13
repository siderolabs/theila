// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Package message defines websocket message protobuf type.
package message

import (
	"encoding/json"
	"fmt"
	reflect "reflect"
)

var kinds = map[Kind]interface{}{
	Kind_Watch:       &WatchSpec{},
	Kind_Unsubscribe: &UnsubscribeSpec{},
	Kind_Subscribed:  &SubscribedSpec{},
	Kind_Error:       &ErrorSpec{},
}

// UnmarshalSpec decode spec into a go struct.
func (x *Message) UnmarshalSpec(dest interface{}) error {
	if k, ok := kinds[x.Kind]; ok {
		val := reflect.ValueOf(dest)
		if val.Kind() == reflect.Ptr {
			val = val.Elem()
		}

		if reflect.TypeOf(k) != val.Type() && val.Kind() != reflect.Map {
			return fmt.Errorf("can't unmarshal kind %s into %s", x.Kind, val.Type().String())
		}
	}

	return json.Unmarshal([]byte(x.Spec), &dest)
}
