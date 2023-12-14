// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package main

import (
	"fmt"
	"github.com/OneOfOne/xxhash"
	"gopkg.in/yaml.v3"
	"io"
	"io/ioutil"
	"math/big"
	"os"
	"regexp"
	"strconv"
	"strings"
)

type Test struct {
	Input          string
	Output         string
	ShouldNotMatch bool `yaml:"should_not_match"`
}

type Rule struct {
	Regexp         string
	Replace        string
	CompiledRegexp *regexp.Regexp
	Tags           []string
	Tests          []Test
}

type Rules struct {
	Rules []Rule
}

// Words from the nltk corpus that use only the letters a-f and are six chars or longer.
var base16RealWords = map[string]bool{
	"accede":   true,
	"bacaba":   true,
	"baccae":   true,
	"beaded":   true,
	"bedded":   true,
	"bedead":   true,
	"bedeaf":   true,
	"decade":   true,
	"deedeed":  true,
	"deface":   true,
	"efface":   true,
	"fabaceae": true,
	"facade":   true,
}

func LookupEnvOrString(key string, defaultVal string) string {
	if val, ok := os.LookupEnv(key); ok {
		return val
	}
	return defaultVal
}

func LookupEnvOrBool(key string, defaultVal bool) bool {
	if val, ok := os.LookupEnv(key); ok {
		v, err := strconv.ParseBool(val)
		if err != nil {
			logger.Fatalf("LookupEnvOrBool[%s]: %v", key, err)
		}
		return v
	}
	return defaultVal
}

func LookupEnvOrInt(key string, defaultVal int) int {
	if val, ok := os.LookupEnv(key); ok {
		v, err := strconv.Atoi(val)
		if err != nil {
			logger.Fatalf("LookupEnvOrInt[%s]: %v", key, err)
		}
		return v
	}
	return defaultVal
}

func GetHash(input string) string {
	h := xxhash.New64()
	r := strings.NewReader(input)
	io.Copy(h, r)
	return fmt.Sprintf("%x", h.Sum64())
}

func isBase(input string, base int) bool {
	v := new(big.Int)
	v, _ = v.SetString(input, base)
	return v != nil
}

func shouldStrip(component string) bool {
	if isBase(component, 10) {
		return true
	}
	return len(component) >= 6 && isBase(component, 16) && !base16RealWords[strings.ToLower(component)]
}

func stripPodName(name string) string {
	var knownPrefixes = [2]string{"flink", "kube-proxy"}
	for _, prefix := range knownPrefixes {
		if strings.HasPrefix(name, prefix) {
			return prefix
		}
	}
	components := strings.Split(name, "-")
	if len(components) < 2 {
		return name
	}
	newComponents := make([]string, 0)
	for _, component := range components {
		if shouldStrip(component) {
			if len(newComponents) == 0 {
				// Nothing semantically meaningful yet. The raw subservice name starts with a uniqueness
				// marker. Strip it and continue.
				continue
			} else {
				// We have semantically meaningful components and now we see a uniqueness marker -- assume
				// the rest is a marker.
				break
			}
		}
		newComponents = append(newComponents, component)
	}
	// If nothing was trimmed, at least remove the last part, most probably garbage
	// (In fact, pod names tend to end with a 5 char hash using the whole alphabet)
	if len(newComponents) == len(components) {
		newComponents = newComponents[:len(newComponents)-1]
	}
	if len(newComponents) == 0 {
		// nothing left, I give up
		return name
	}
	return strings.Join(newComponents, "-")
}

func ContainerAndK8sName(rawContainer string) (string, string, string) {
	if strings.HasPrefix(rawContainer, "k8s_") {
		parts := strings.Split(rawContainer, "_")
		if len(parts) != 6 {
			return rawContainer, "", ""
		}
		stripped := stripPodName(parts[2])
		if strings.HasPrefix(stripped, "kube-proxy-") {
			stripped = "kube-proxy"
		}
		//part[3] is the namespace. We concatenate it to the Container and to the K8sName
		return fmt.Sprintf("%s_%s_%s", parts[1], stripped, parts[3]), fmt.Sprintf("%s_%s", stripped, parts[3]), "k8s"
	}
	if strings.HasPrefix(rawContainer, "ecs-") {

		// strip the "ecs-" and "-hash"
		splittedContainer := strings.Split(rawContainer, "-")
		if len(splittedContainer) == 2 {
			return rawContainer, splittedContainer[1], "ecs"
		}
		splittedContainer = splittedContainer[1 : len(splittedContainer)-1]
		// we strip the revision number (equivalent to stripping the replicaset hash)
		lastIndex := 0
		for index, containerPart := range splittedContainer {
			_, err := strconv.Atoi(containerPart)
			if err == nil {
				lastIndex = index
				break
			}
		}
		taskFamily := strings.Join(splittedContainer[:lastIndex], "-")
		name := strings.Join(splittedContainer[lastIndex+1:], "-") // what's left is the name
		return fmt.Sprintf("%s_%s", name, taskFamily), taskFamily, "ecs"
	}
    return rawContainer, "", ""
}

func ReadRegexps(filename string) (*Rules, error) {
	var rules Rules
	byteValue, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil, err
	}
	err = yaml.Unmarshal(byteValue, &rules)
	if err != nil {
		return nil, err
	}
	for idx, rule := range rules.Rules {
		rule.CompiledRegexp, err = regexp.Compile(rule.Regexp)
		rules.Rules[idx] = rule
		if err != nil {
			return &rules, err
		}
	}
	return &rules, nil
}
