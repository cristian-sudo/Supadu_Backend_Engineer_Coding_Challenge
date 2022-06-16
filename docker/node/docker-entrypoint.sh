#!/bin/sh
set -e


if [ "$NODE_ENV" = 'dev' ]; then
  yarn install

  yarn run start:dev
else
  yarn run build

  yarn run start
fi

