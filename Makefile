.PHONY: help build copy-files deploy env-dev up up-dev

DC=docker-compose
DC_UP=$(DC) up -d
DC_BUILD=$(DC) build
DC_EXEC=$(DC) exec
BIN_CONSOLE=$(DC_EXEC) php bin/console
COMPOSER=$(DC_EXEC) php composer
COPY_FILES_CLIENT=cp ./client/tsconfig.bak ./client/tsconfig.json
PREPARE_BUILD=$(COPY_FILES_CLIENT) && docker-compose exec client yarn

help:
	@grep -E '(^[0-9a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-25s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

build: ## Build project
	$(MAKE) up
	source ~/.bash_aliases
	$(PREPARE_BUILD) build
	$(PREPARE_BUILD) server-build
	$(DC_BUILD) ssr
	$(MAKE) up

copy-files: ## Setup for build project
	cp .env.dist .env
	cp client/.env.dist client/.env
	cp docker-compose.yml.dist docker-compose.yml
	$(MAKE) up
	$(MAKE) build

deploy: ## Deploy project
	git pull
	$(COMPOSER) install
	$(COMPOSER) update
	$(BIN_CONSOLE) doctrine:schema:update --force
	$(BIN_CONSOLE) ca:cl

env-dev:
	cp .env.dev .env

up: ## Up container
	$(DC_UP)

up-dev: env-dev up
