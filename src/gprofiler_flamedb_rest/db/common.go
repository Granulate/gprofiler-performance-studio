//
// Copyright (C) 2023 Intel Corporation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

package db

import (
	"fmt"
	"strings"
)

const (
	Appid           = "Appid"
	Java            = "Java"
	JavaInl         = "Java (inl)"
	JavaC1          = "Java (C1)"
	JavaInterpreted = "Java (interpreted)"
	Python          = "Python"
	Cpp             = "C++"
	Go              = "Go"
	MayBeGo         = "Go?"
	NodeJS          = "Node"
	PHP             = "PHP"
	Ruby            = "Ruby"
	Kernel          = "Kernel"
	Net             = ".NET"
	Other           = "Other"
)

type SrvResp struct {
	ServiceId  uint32 `json:"service_id"`
	Deployment string `json:"deployment"`
}

func joinIntSlice(data []int, separator string) string {
	return strings.Trim(strings.Join(strings.Fields(fmt.Sprint(data)), separator), "[]")
}
