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
