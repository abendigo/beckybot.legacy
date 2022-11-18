    npm i --legacy-peer-deps

docker build db
docker build backend --target build
docker build --build-arg NPM_TOKEN=${NPM_TOKEN} frontend
