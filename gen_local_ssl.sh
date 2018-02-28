#!/bin/sh

apk add --no-cache openssl ca-certificates

update-ca-certificates
echo "[SAN]\nsubjectAltName=DNS:docker.localhost\\" >> /etc/ssl/openssl.cnf

openssl req \
    -newkey rsa:2048 \
    -x509 \
    -nodes \
    -keyout /docker.localhost.key \
    -new \
    -out /docker.localhost.crt \
    -subj /CN=docker.localhost \
    -reqexts SAN \
    -extensions SAN \
    -config /etc/ssl/openssl.cnf \
    -sha256 \
    -days 3650