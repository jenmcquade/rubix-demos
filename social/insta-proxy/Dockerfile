FROM node:alpine

ARG build_type
ARG node_env
ARG port
ENV BUILD_TYPE=$build_type
ENV NODE_ENV=$node_env
ENV PORT=$port

RUN echo $BUILD_TYPE

COPY ./app.js /
COPY ./package.json /
COPY ./app.json /

RUN apk update && \
    apk --no-cache add \
    bash && \
    cd / && \
    npm install 

CMD node /app.js --bind 0.0.0.0:$PORT

WORKDIR /

EXPOSE 3000
EXPOSE 80