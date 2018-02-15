#!/bin/sh
#
# Description: Generates a Production Docker container,
#   then copies the o3dv container build files to ./public_build
#   then pushes newest instaproxy image to Heroku
#   then commits newest public_build folder to GitHub on master branch
#     which then triggers a Heroku build of the master branch
#   then returns to the original branch
#

docker-compose -f docker-compose.prod.yml down

date=`date +'%y.%m.%d %H:%M:%S'`

docker-compose -f docker-compose.prod.yml up --build -d

docker cp o3dv:/build/. ./public_build/

docker-compose -f docker-compose.prod.yml down

heroku container:login

docker tag instaproxy registry.heroku.com/igdata/web
docker push registry.heroku.com/igdata/web

original_branch=`git branch | grep \*`

git checkout master

git pull origin master

git rm public_build/*

git add public_build/*

git commit -m "Production Release at $date" ./public_build ./docker-compose.prod.yml 

git push origin master

git checkout $original_branch

exit 0


