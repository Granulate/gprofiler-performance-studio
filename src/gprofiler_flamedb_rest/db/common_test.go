// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package db

import (
	"testing"
)

func TestGetTruncatedNameAndSuffix(t *testing.T) {
	tests := []struct {
		arg    string
		lang   string
		output []string
	}{
		{arg: "test_func_[j]", output: []string{"test_func","_[j]"}, lang: Java},
		{arg: "test_func_[j]_[s]", output: []string{"test_func","_[j]_[s]"}, lang: Java},
		{arg: "test_func_[i]", output: []string{"test_func","_[i]"}, lang: Java},
		{arg: "test_func_[i]_[s]", output: []string{"test_func", "_[i]_[s]"}, lang: Java},
		{arg: "test_func_[0]", output: []string{"test_func","_[0]"}, lang: Java},
		{arg: "test_func_[0]_[s]", output: []string{"test_func","_[0]_[s]"}, lang: Java},
		{arg: "test_func_[1]", output: []string{"test_func","_[1]"}, lang: Java},
		{arg: "test_func_[1]_[s]", output: []string{"test_func","_[1]_[s]"}, lang: Java},
		{arg: "test_func_[p]", output: []string{"test_func", "_[p]"}, lang: Java},
		{arg: "test_func_[pe]", output: []string{"test_func","_[pe]"}, lang: Java},
		{arg: "test_func_[k]", output: []string{"test_func","_[k]"}, lang: Java},
		{arg: "test_func_[php]", output: []string{"test_func","_[php]"}, lang: Java},
		{arg: "test_func_[pn]", output: []string{"test_func","_[pn]"}, lang: Java},
		{arg: "test_func_[rb]", output: []string{"test_func","_[rb]"}, lang: Java},
		{arg: "test_func_[net]", output: []string{"test_func","_[net]"}, lang: Java},
		{arg: "test_func_[rb]", output: []string{"test_func_[rb]", ""}, lang: Cpp},
		{arg: "test_func_[rb]", output: []string{"test_func_[rb]", ""}, lang: Go},
		{arg: "test_func_[rb]", output: []string{"test_func_[rb]", ""}, lang: NodeJS},
		{arg: "test_func", output: []string{"test_func", ""}, lang: Java},
		{arg: "test_func_", output: []string{"test_func_", ""}, lang: Java},
		{arg: "test_func_[test]", output: []string{"test_func_[test]",""}, lang: Java},
	}
	for _, test := range tests {
		f := Frame{Name: test.arg, Lang: test.lang}
		nameRes, suffixRes := f.getTruncatedNameAndSuffix()
		if nameRes != test.output[0] {
			t.Errorf("%v != %v", nameRes, test.output)
		}
		if suffixRes != test.output[1] {
			t.Errorf("%v != %v", suffixRes, test.output)
		}
	}
}
