FROM node:alpine

ARG build_type
ENV BUILD_TYPE=$build_type

RUN echo $BUILD_TYPE

COPY ./entrypoint /usr/local/bin
COPY ./app.js /
COPY ./package.json /
COPY ./app.json /

RUN apk update && \
    apk --no-cache add \
    bash && \
    cd / && \
    npm install 

CMD node /app.js NODE_ENV=production --bind 0.0.0.0:$PORT

WORKDIR /

EXPOSE 3000
EXPOSE 80