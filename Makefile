# Sometimes non-interactive mode should be enabled (e.g. pre-push hooks)
ifeq (true, $(non-i))
  	NODE=docker-compose exec -T node
else
	NODE=docker-compose exec node
endif
##############################################################
# Application	                                             #
##############################################################


db-reinstall:
	$(NODE) yarn typeorm schema:drop
	$(NODE) yarn migration:run

db-test-install:
	$(NODE) yarn typeorm schema:drop -c=test
	$(NODE) yarn migration:run -c=test

##############################################################
# Docker compose                                             #
##############################################################

build:
	docker-compose build

run:
	docker-compose up

down:
	docker-compose down -v --rmi=all --remove-orphans

##############################################################
# Test                                                       #
##############################################################

test:
	$(NODE) yarn test

##############################################################
# Configuration                                           #
##############################################################

node:
	$(NODE) sh

##############################################################
# static analytic tools                                           #
##############################################################

lint-check:
	yarn run lint

lint-fix:
	yarn run lint --fix

analyse: lint-check

##############################################################
# Prerequisites Setup                                        #
##############################################################

setup:
	cp tools/hooks/pre-push .git/hooks/pre-push
