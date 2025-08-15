# Check out https://hub.docker.com/_/node to select a new base image
FROM node:22-alpine

# Install node compile native
# RUN apk add g++ make python

RUN mkdir -p /home/app

WORKDIR /home/app

# Enable pnpm
RUN corepack enable

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

# Bundle app source code
COPY . .

RUN pnpm build

RUN pnpm add -g serve

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s CMD node healthcheck.js

# expose default port of serve command
EXPOSE 5000

CMD [ "serve", "-s", "build" ]
