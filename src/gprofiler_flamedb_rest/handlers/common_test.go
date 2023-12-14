// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package handlers

import (
	"github.com/a8m/rql"
	"testing"
)

func TestBuildQuery(t *testing.T) {
	tests := []struct {
		arg    string
		output string
		parser *rql.Parser
	}{
		{
			arg: `
				{
					  "filter": {
							"ContainerEnvName": {"$neq" : "order-router-ar"},
							"$or": [
								{"HostName": "i-052b60b314570ca6c"},
								{"HostName": "i-0dc8c3917b36b7bcb"},
								{"HostName": "i-000a551704de2f0ab"}
							]
					  }
				}
			`,
			parser: QueryParser,
			output: "AND ContainerEnvName <> 'order-router-ar' AND (HostName = 'i-052b60b314570ca6c' " +
				"OR HostName = 'i-0dc8c3917b36b7bcb' OR HostName = 'i-000a551704de2f0ab')",
		},
		{
			arg:    "{}",
			output: "",
			parser: QueryParser,
		},
	}
	for _, test := range tests {
		query, err := buildQuery(test.parser, []byte(test.arg))
		if err != nil {
			t.Errorf(err.Error())
		}
		if query != test.output {
			t.Errorf("%v != %v", query, test.output)
		}
	}
}
