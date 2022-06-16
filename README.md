Supadu Cristian Plop interview.
==================

This project is built on Nestjs

# Contents

* [Deploy Locally](#markdown-header-deploy-locally)
    * [Prerequisite](#markdown-header-prerequisite)
    * [Build app](#markdown-header-build-app)
    * [Create docker-compose.override.yml](#markdown-header-setup-locally-docker-compose-override)
    * [Run a project](#markdown-header-run-a-project)
    * [Check if it works](#markdown-header-check-if-it-works)
    * [Database installion](#markdown-header-database-installion)
* [Code Quality](#markdown-header-code-quality)
    * [Static Analysis tools and linters](#markdown-header-static-analysis-tools-and-linters)
        * [Tests](#markdown-header-tests)
        * [Usage](#markdown-header-tests-usage)

# Deploy Locally <a id="markdown-header-deploy-locally"></a>

## Prerequisite <a id="markdown-header-prerequisite"></a>

Project uses Docker, before continue, make sure Docker is installed on you host machine.

Once docker is installed please implement all
[post install steps](https://docs.docker.com/install/linux/linux-postinstall/)

## Build app <a id="markdown-header-build-app"></a>

Run the following command on your host machine in root directory to build the project:

```shell
make build
```

This command will download, build all the needed images and run containers, including:

* Node
* Database
* Test Database - only for dev needs, used during tests running instead of the original database.

## Create docker-compose.override.yml <a name="markdown-header-setup-locally-docker-compose-override"></a>

If you want to specify ports, please create docker-compose.override.yml e.g:

```yaml
version: '3.9'

services:
  db:
    ports:
      -   target: 3306
          published: 5333
          protocol: tcp
```

## Run a project <a id="markdown-header-run-a-project"></a>
Run the following command on your host machine:

```shell
make run
```

The command will start all services.

## Check if it works <a id="markdown-header-check-if-it-works"></a>
* [http://localhost:3000](http://localhost:3000)

## Database installation <a id="markdown-header-database-installion"></a>
Within the docker configuration two databases are setup, for a development and tests. 

### Development Database
Currently in this test is not required a app:install command that will create the database automaticly.

To install the database, run:

```
make db-reinstall
```

### Test Database
To reinstall the test database please run:
```
make db-test-install
```

# Code Quality <a id="markdown-header-code-quality"></a>

## Static Analysis tools and linters <a id="markdown-header-static-analysis-tools-and-linters"></a>

To run all code quality checkers and tests by one command, run

```bash
make analyse
```

To run all linters by one command, run

```bash
make lint-check
```

## Tests <a id="markdown-header-tests"></a>

### Usage <a id="markdown-header-tests-usage"></a>

First, you should create a test database with all tables (you can use this command to re-create test db as well):

```shell
make db-test-install
```

To run all tests, run

```shell
make tests
```
