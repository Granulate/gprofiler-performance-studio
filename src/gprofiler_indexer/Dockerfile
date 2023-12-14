FROM golang:1.18.10 as build

ENV GO111MODULE on

WORKDIR /go

COPY go.* src/
COPY *.go src/
COPY conf src/conf

WORKDIR /go/src

RUN go get -d -v ./...
RUN go install -v ./...
RUN go build -v

FROM debian:10.9-slim

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates

RUN mkdir -p /data

COPY --from=build /go/src/main /indexer
COPY conf /conf

ENTRYPOINT ["/indexer"]
