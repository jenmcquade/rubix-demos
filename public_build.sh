#!/bin/sh
#
# Description: Generates a Production Docker container,
#   then copies the o3dv container build files to ./public_build
#

docker-compose -f docker-compose.prod.yml up --build -d

docker cp o3dv:/build/. ./public_build/

docker-compose -f docker-compose.prod.yml down

exit 0


