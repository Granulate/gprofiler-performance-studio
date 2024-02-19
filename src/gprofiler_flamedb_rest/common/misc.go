// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package common

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/OneOfOne/xxhash"
)

const (
	ServiceName    = "rest-flamedb"
	BackRewindTime = time.Second * 300
	UTCTimeFormat  = "2006-01-02T15:04:05Z"
	TimeFormat     = "2006-01-02T15:04:05"
)

var (
	ZeroTime = time.Time{}
)

type lookupEnvConstraint interface {
	int | string | bool
}

func LookupEnvOrDefault[V lookupEnvConstraint](key string, defaultValue V) V {
	var ret any
	if val, ok := os.LookupEnv(key); ok {
		switch any(defaultValue).(type) {
		case string:
			ret = val
		case int:
			i, _ := strconv.ParseInt(val, 10, 64)
			ret = int(i)
		case bool:
			ret = !(strings.EqualFold(val, "false") || strings.EqualFold(val, "0"))
		}
	} else {
		ret = defaultValue
	}
	return ret.(V)
}

func ParseCredentials(credentials string) (gin.Accounts, error) {
	if credentials == "" {
		return nil, errors.New("no credentials provided")
	}

	accounts := gin.Accounts{}
	pairs := strings.Split(credentials, ",")
	for _, pair := range pairs {
		parts := strings.Split(pair, ":")
		if len(parts) != 2 {
			return nil, fmt.Errorf("invalid credential format for '%s', expected format 'username:password'", pair)
		}
		if parts[0] == "" || parts[1] == "" {
			return nil, fmt.Errorf("username or password is empty for '%s'", pair)
		}
		accounts[parts[0]] = parts[1]
	}
	return accounts, nil
}

func GetHash32AsInt(input string) uint32 {
	h := xxhash.New32()
	r := strings.NewReader(input)
	io.Copy(h, r)
	return h.Sum32()
}

func GetHash64AsInt(input string) uint64 {
	h := xxhash.New64()
	r := strings.NewReader(input)
	io.Copy(h, r)
	return h.Sum64()
}

func FormatTime(t time.Time) string {
	return t.Format(TimeFormat)
}

func MapGetWithDefault[K comparable, V any](m map[K]V, key K, defaultValue V) V {
	if val, ok := m[key]; ok {
		return val
	}
	return defaultValue
}
