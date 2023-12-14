// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package main

import (
	"github.com/pkg/errors"
	"regexp"
	"strings"
	"sync"
)

var regexpMutex sync.RWMutex

type FrameReplacer struct {
	mu                       sync.RWMutex
	compiledStackReplacement []*regexp.Regexp
	compiledRegexp           *regexp.Regexp
	stackReplacement         []string
}

func NewFrameReplacer() *FrameReplacer {
	return &FrameReplacer{
		compiledStackReplacement: make([]*regexp.Regexp, 0),
		stackReplacement:         make([]string, 0),
	}
}

func (r *FrameReplacer) InitRegexps(filename string) error {
	var rules *Rules
	var err error

	localCompiledStackReplacement := make([]*regexp.Regexp, 0)
	localStackReplacement := make([]string, 0)
	rules, err = ReadRegexps(filename)
	if err != nil {
		return err
	}
	rulesLen := len(rules.Rules)
	regexps := make([]string, 0, rulesLen)

	r.mu.Lock()
	defer r.mu.Unlock()

	for _, rule := range rules.Rules {
		localStackReplacement = append(localStackReplacement, rule.Replace)
		regexps = append(regexps, rule.Regexp)
		compiledRegexp, errCompile := regexp.Compile(rule.Regexp)
		if errCompile != nil {
			return errCompile
		}
		localCompiledStackReplacement = append(localCompiledStackReplacement, compiledRegexp)
		if len(rule.Tests) == 0 {
			return errors.Errorf("no tests found for rule: %v", r)
		}
		for _, test := range rule.Tests {
			if compiledRegexp.MatchString(test.Input) {
				output := compiledRegexp.ReplaceAllLiteralString(test.Input, rule.Replace)
				if output != test.Output {
					return errors.Errorf("%s != %s", output, test.Output)
				}
			} else {
				if test.ShouldNotMatch {
					continue
				}
				return errors.Errorf("String %s not matched", test.Input)
			}
		}
	}
	joinedRegexp := strings.Join(regexps, "|")
	localCompiledRegexp, err := regexp.Compile(joinedRegexp)
	if err != nil {
		return err
	}

	// only on success update global StackReplacement and compiledStackReplacement
	r.compiledRegexp = localCompiledRegexp
	r.stackReplacement = localStackReplacement
	r.compiledStackReplacement = localCompiledStackReplacement
	logger.Infof("successfully loaded %d regexp(s)", len(r.stackReplacement))
	return nil
}

func (r *FrameReplacer) NormalizeString(src string) string {
	regexpMutex.RLock()
	defer regexpMutex.RUnlock()
	for i, v := range r.stackReplacement {
		c := r.compiledStackReplacement[i]
		if c.MatchString(src) {
			src = c.ReplaceAllLiteralString(src, v)
		}
	}
	return src
}

func (r *FrameReplacer) ShouldNormalize(src string) bool {
	return r.compiledRegexp.MatchString(src)
}
