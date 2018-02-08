FROM node:alpine

ARG build_type="production"
ENV BUILD_TYPE=$build_type

RUN echo $BUILD_TYPE

COPY ./entrypoint /usr/local/bin
COPY ./server.js /
COPY ./package.json /
COPY ./webpack.config.js /
COPY ./webpack.production.config.js /
COPY ./src /src
COPY ./.babelrc /
COPY ./.eslintrc /.eslintrc
COPY ./entrypoint /entrypoint

RUN apk update && \
    apk --no-cache add \
    bash \
    libpng-dev \
    automake \
    autoconf \
    libtool \
    gettext-dev \
    g++ \
    file \
    nasm \
    make && \
    npm install -g webpack cross-env && \
    cd / && \
    npm install && \
    webpack -p --config webpack.production.config.js && \
    node ./node_modules/react-scripts/scripts/build.js

ENTRYPOINT ["entrypoint"]

WORKDIR /

EXPOSE 80
EXPOSE 8080
EXPOSE 3001
EXPOSE 3002

