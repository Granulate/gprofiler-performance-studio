// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

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
