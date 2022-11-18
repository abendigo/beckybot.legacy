FROM node:18-alpine AS build

WORKDIR /src

copy package.json .

RUN npm install

COPY . .

# RUN npm run lint
# RUN npm run test

# Bundle app source
# RUN npm run build

# get rid of any development dependencies as they are no longer needed past this point.
# RUN npm prune --production

# Thats it for the build side. Now, the deployable parts

FROM node:18-alpine

WORKDIR /usr/src/service

COPY --from=build /src .

