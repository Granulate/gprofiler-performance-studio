// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

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
