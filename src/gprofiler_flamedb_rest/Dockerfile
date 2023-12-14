FROM golang:1.18 as build

ENV GO111MODULE on

WORKDIR /go

COPY . /go/src/

WORKDIR /go/src

RUN go get -d -v ./...
RUN go install -v ./...

RUN go build -v -o app


FROM debian:10.9-slim

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates curl iputils-ping

RUN mkdir -p /data

COPY --from=build /go/src/app /usr/local/bin/app
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/app"]
