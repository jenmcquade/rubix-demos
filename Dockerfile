FROM node:8.9.4-alpine

ARG build_type
ARG node_env
ARG build_ver
ARG search_default_value
ARG search_default_type
ENV BUILD_TYPE=$build_type
ENV BUILD_VER=$build_ver
ENV NODE_ENV=$node_env
ENV SEARCH_DEFAULT_VALUE=$search_default_value
ENV SEARCH_DEFAULT_TYPE=$search_default_type
ENV CLIENT=true

COPY ./entrypoint /usr/local/bin/
COPY ./server.js /
COPY ./package.json /
COPY ./package.prod.json /
COPY ./webpack.config.js /
COPY ./webpack.production.config.js /
COPY ./src/ /src/
COPY ./.babelrc /
COPY ./.eslintrc /

RUN  apk add --no-cache \
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
        npm install 

RUN if [ "$BUILD_TYPE" = "development" ]; then \
        echo "Building ./public folder for fallback to static files ..." && \
        node /node_modules/webpack/bin/webpack.js && \
        cd /public; ls -l; \
    else \
        echo "Building ./build folder for serving static files ..." && \
        export BUILD_TIME=`date +'%y.%m.%d %H:%M:%S'` && \
        BUILD_VER=$BUILD_VER BUILD_TIME=$BUILD_TIME node /node_modules/webpack/bin/webpack.js -p --config /webpack.production.config.js && \
        node /node_modules/react-scripts/scripts/build.js && \
        rm -rf /node_modules && \
        rm /package.json /package-lock.json && \
        sed -i.bak s/[[BUILD_VER]]/${BUILD_VER}/g package.prod.json && \
        mv /package.prod.json /package.json && \
        npm install --save cross-env compression express express-history-api-fallback && \
        cd /build && ls -l; \
    fi

RUN apk del \
  libpng-dev \ 
  automake \
  autoconf \
  libtool \
  gettext-dev \
  g++ \
  file \
  nasm \
  make

CMD node /server.js --bind 0.0.0.0:$PORT
ENTRYPOINT BUILD_TIME=`date +'%y.%m.%d %H:%M:%S'` BUILD_VER=$BUILD_VER entrypoint

WORKDIR /

EXPOSE 80
EXPOSE 8080
EXPOSE 3001
EXPOSE 3002

