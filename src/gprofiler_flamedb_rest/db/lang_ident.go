package db

import (
	"regexp"
)

type LanguageRegexp struct {
	Lang          string
	specialType   string
	Regexp        *regexp.Regexp
	ControlRegexp *regexp.Regexp
}

var RuntimesRegexps = []LanguageRegexp{
	{Lang: Java, Regexp: regexp.MustCompile("_\\[j]$")},
	{Lang: Java, specialType: JavaInl, Regexp: regexp.MustCompile("_\\[i]$")},
	{Lang: Java, specialType: JavaC1, Regexp: regexp.MustCompile("_\\[1]$")},
	{Lang: Java, specialType: JavaInterpreted, Regexp: regexp.MustCompile("_\\[0]$")},
	{Lang: Python, Regexp: regexp.MustCompile("_\\[p]$|_\\[pe]$")},
	{Lang: Python, Regexp: regexp.MustCompile("\\.py\\)$|<decorator-gen-\\d+>")},
	{Lang: PHP, Regexp: regexp.MustCompile("_\\[php]$")},
	{Lang: Ruby, Regexp: regexp.MustCompile("_\\[rb]$")},
	{Lang: NodeJS, Regexp: regexp.MustCompile("^LazyCompile|^InterpretedFunction")},
	{Lang: Cpp, Regexp: regexp.MustCompile("::")},
	{Lang: Kernel, Regexp: regexp.MustCompile("_\\[k]$")},
	{Lang: Net, Regexp: regexp.MustCompile("_\\[net]$")},
	{Lang: Other, Regexp: regexp.MustCompile("_\\[pn]$")},
	{Lang: Other, Regexp: regexp.MustCompile("\\[.+\\.so]")},
	{Lang: Go, Regexp: regexp.MustCompile("\\w\\.(?:\\w|\\()"), ControlRegexp: regexp.MustCompile("^runtime(\\.|/).+")},
	{Lang: Other, specialType: Appid, Regexp: regexp.MustCompile("^appid:")},
}

func identFrameLangAndSpecialType(frameName string) (string, string) {
	for _, runtime := range RuntimesRegexps {
		found := runtime.Regexp.MatchString(frameName)
		if found {
			if runtime.Lang == Go {
				if runtime.ControlRegexp.MatchString(frameName) {
					return runtime.Lang, runtime.specialType
				} else {
					return MayBeGo, runtime.specialType
				}
			}
			return runtime.Lang, runtime.specialType
		}
	}
	return Other, ""
}
