package db

import (
	"fmt"
	"strings"
)

const (
	Appid           = "Appid"
	Java            = "Java"
	JavaInl         = "Java (inl)"
	JavaC1          = "Java (C1)"
	JavaInterpreted = "Java (interpreted)"
	Python          = "Python"
	Cpp             = "C++"
	Go              = "Go"
	MayBeGo         = "Go?"
	NodeJS          = "Node"
	PHP             = "PHP"
	Ruby            = "Ruby"
	Kernel          = "Kernel"
	Net             = ".NET"
	Other           = "Other"
)

type SrvResp struct {
	ServiceId  uint32 `json:"service_id"`
	Deployment string `json:"deployment"`
}

func joinIntSlice(data []int, separator string) string {
	return strings.Trim(strings.Join(strings.Fields(fmt.Sprint(data)), separator), "[]")
}
