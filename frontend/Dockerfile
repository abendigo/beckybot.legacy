# Largely copied from https://hackernoon.com/a-tale-of-two-docker-multi-stage-build-layers-85348a409c84
# and https://nodejs.org/de/docs/guides/nodejs-docker-webapp/
FROM node:18-alpine AS build

# because we are using alpine and it does not come with many build tools,
# we should install the node-gyp collection of tools.
# RUN apk add --update --no-cache python make g++

# Get the new npm with workspace support
# RUN npm install -g npm@7

ARG NPM_TOKEN
WORKDIR /src

# Note that, rather than copying the entire working directory, we are only copying
# the package*.json file(s). This allows us to take advantage of cached Docker layers.
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./

copy .npmrc.docker .npmrc
copy package.json .

# npm ci works similarly to npm i, but skips the expensive dependency resolution step,
# and instead just installs the exact dependencies specified in your package-lock.json file.
# It’s basically a faster npm i for use in CI environments.
# RUN npm ci
RUN npm install
# RUN npm ci

COPY . .

# RUN npm run lint
# RUN npm run test

# Bundle app source
RUN npm run build

# get rid of any development dependencies as they are no longer needed past this point.
RUN npm prune --production

# Thats it for the build side. Now, the deployable parts

FROM node:18-alpine

ENV PORT=3000
EXPOSE $PORT
WORKDIR /usr/src/service

COPY --from=build /src/frontend/package.json package.json
COPY --from=build /src/node_modules node_modules
COPY --from=build /src/frontend/build build

USER node
CMD ["node", "build"]
