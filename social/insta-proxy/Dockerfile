FROM jonmcquade/alpine-nginx-nodejs

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
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

# Package installation
RUN apk update && \
    apk --no-cache add \
    openrc \
    sed \
    bash && \
    cd / && \
    npm install && \
    npm install pm2 -g && \
    rm -rf ./etc/nginx/sites-available 

RUN sed -i "s/PORT/$PORT/g" /etc/nginx/nginx.conf

CMD pm2-runtime /app.js -i max

WORKDIR /

EXPOSE 3000
EXPOSE 80
EXPOSE 443