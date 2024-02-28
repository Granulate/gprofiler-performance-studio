package handlers

import (
	"fmt"
	"github.com/a8m/rql"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"reflect"
	"strconv"
	"strings"
	"time"
)

func StartTime() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("requestStartTime", time.Now())
		c.Next()
	}
}

func parseParams[T any](params T, parser *rql.Parser, c *gin.Context) (T, string, error) {
	var query string
	var err error
	if err = c.ShouldBindQuery(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return params, query, err
	}

	metaValue := reflect.ValueOf(&params).Elem()
	filter := metaValue.FieldByName("Filter")
	if filter.IsValid() {
		rawFilterData := []byte(filter.String())
		if len(rawFilterData) > 0 && parser != nil { // filter parameter was passed
			query, err = buildQuery(parser, rawFilterData)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return params, query, err
			}
		}
	}

	fn := reflect.ValueOf(&params).MethodByName("CheckTimeRange")
	if fn.IsValid() {
		fn.Call(nil)
	}

	return params, query, nil
}

func buildQuery(parser *rql.Parser, rawFilterData []byte) (string, error) {
	var query string
	var expressions []string
	var args []interface{}
	filters, err := parser.Parse(rawFilterData)
	if err != nil {
		return "", err
	}
	if filters != nil {
		expressions = strings.Split(filters.FilterExp, "?")
		args = filters.FilterArgs
	}
	for idx, expr := range expressions {
		v := ""
		if idx < len(args) {
			switch args[idx].(type) {
			case int:
				v = strconv.Itoa(args[idx].(int))
			case string:
				v = fmt.Sprintf(`'%s'`, args[idx].(string))
			default:
				log.Printf("Error: unable to cast and handle arg %v", args[idx])
				continue
			}
		}
		query += fmt.Sprintf("%s%s", expr, v)
	}
	// if query is nonempty add prefix AND for using inside SQL query after time range block
	if len(query) > 0 {
		query = "AND " + query
	}
	return query, nil
}
