PROJECT = "Segment Debugger"

all: prod

install: ;@echo "Installing ${PROJECT}....."; \
	npm install

clean: ;@echo "Cleaning ${PROJECT}....."; \
	rm -rf node_modules

build: ;@echo "Building ${PROJECT}....."; \
	npm install

dev: ; @echo "Development ${PROJECT}....."; \
	docker-compose up -d

test: ;@echo "Test ${PROJECT}....."; \
	# make clean
	# make build
	# node config/config-test.js
	docker-compose -f docker-compose.test.yml build
	docker-compose -f docker-compose.test.yml up

stop:
	docker-compose -f docker-compose.test.yml down
	docker-compose -f docker-compose.prod.yml down

prod: ;@echo "Starting ${PROJECT}....."; \
	make build
	# node config/config.js
	make build
	docker-compose -f docker-compose.prod.yml build
	docker-compose -f docker-compose.prod.yml up