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
