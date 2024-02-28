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
