package handlers

import (
	"github.com/a8m/rql"
	"testing"
)

func TestBuildQuery(t *testing.T) {
	tests := []struct {
		arg    string
		output string
		parser *rql.Parser
	}{
		{
			arg: `
				{
					  "filter": {
							"ContainerEnvName": {"$neq" : "order-router-ar"},
							"$or": [
								{"HostName": "i-052b60b314570ca6c"},
								{"HostName": "i-0dc8c3917b36b7bcb"},
								{"HostName": "i-000a551704de2f0ab"}
							]
					  }
				}
			`,
			parser: QueryParser,
			output: "AND ContainerEnvName <> 'order-router-ar' AND (HostName = 'i-052b60b314570ca6c' " +
				"OR HostName = 'i-0dc8c3917b36b7bcb' OR HostName = 'i-000a551704de2f0ab')",
		},
		{
			arg:    "{}",
			output: "",
			parser: QueryParser,
		},
	}
	for _, test := range tests {
		query, err := buildQuery(test.parser, []byte(test.arg))
		if err != nil {
			t.Errorf(err.Error())
		}
		if query != test.output {
			t.Errorf("%v != %v", query, test.output)
		}
	}
}
