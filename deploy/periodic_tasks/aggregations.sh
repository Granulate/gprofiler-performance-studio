#!/bin/sh



echo "aggregation started"
psql -h $PGHOST -p $PGPORT -U $PGUSER -d $PGDATABASE -c "CALL update_profiler_service_hourly_usages()"
