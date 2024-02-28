package config

var (
	ClickHouseAddr         = "localhost:9000"
	ClickHouseStacksTable  = "flamedb.samples"
	ClickHouseMetricsTable = "flamedb.metrics"
	UseTLS                 = true
	CertFilePath           = ""
	KeyFilePath            = ""
	Credentials            = "user:password"
)
