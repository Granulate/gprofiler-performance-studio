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

package main

import (
	"regexp"
	"testing"
)

func TestMain(m *testing.M) {
	InitLogs()
	m.Run()
}

func TestFrameReplaceRegexes(t *testing.T) {
	args := NewCliArgs()
	regexps, err := ReadRegexps(args.FrameReplaceFileName)
	if err != nil {
		return
	}
	for _, rule := range regexps.Rules {
		for _, test := range rule.Tests {
			compileRegexp, compileErr := regexp.Compile(rule.Regexp)
			if compileErr != nil {
				t.Fatalf("unable to compile regexp %v", rule.Regexp)
			}
			output := compileRegexp.ReplaceAllLiteralString(test.Input, rule.Replace)
			if output != test.Output {
				t.Fatalf("regexp %v failed: %s != %s", rule.Regexp, output, test.Output)
			}

		}
	}
}
