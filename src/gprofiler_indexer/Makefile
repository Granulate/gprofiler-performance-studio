BINARY_NAME=indexer
DOCKER_IMAGE_NAME=indexer

build:
	@echo "Building..."
	go build -o ${BINARY_NAME}

docker-build:
	@echo "Building Docker image..."
	docker build -t ${DOCKER_IMAGE_NAME} .

clean:
	@echo "Cleaning up..."
	rm -f ${BINARY_NAME}

.PHONY: build docker-build clean
