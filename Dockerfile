FROM node:alpine

ARG build_type
ARG node_env
ENV BUILD_TYPE=$build_type
ENV NODE_ENV=$node_env
ENV CLIENT=true

COPY ./entrypoint /usr/local/bin/
COPY ./server.js /
COPY ./package.json /
COPY ./webpack.config.js /
COPY ./webpack.production.config.js /
COPY ./src/ /src/
COPY ./.babelrc /
COPY ./.eslintrc /

RUN  apk add --no-cache --virtual \
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
        mkdir /public && \
        mkdir /build && \
        npm install

RUN if [ "$BUILD_TYPE" = "production" ]; then \
        node /node_modules/webpack/bin/webpack.js -p --config /webpack.production.config.js && \
        node /node_modules/react-scripts/scripts/build.js && \
        rm -rf /node_modules && \
        rm /package.json /package-lock.json && \
        cd / && npm install --save express path cross-env && \
        ls -l; \
    fi

RUN if [ "$BUILD_TYPE" = "development" ]; then \
        ls -l; \
    fi

CMD NODE_ENV=$NODE_ENV node /server.js --bind 0.0.0.0:$PORT
ENTRYPOINT ["entrypoint"]

WORKDIR /

EXPOSE $PORT
EXPOSE 80
EXPOSE 8080
EXPOSE 3001
EXPOSE 3002

