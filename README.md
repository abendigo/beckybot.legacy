[![Build and Test](https://github.com/abendigo/beckybot/actions/workflows/test.yml/badge.svg)](https://github.com/abendigo/beckybot/actions/workflows/test.yml)

## To get started

    npm install

## To Run Locally

    docker compose up

This will start mysql, redis, and db-admin. Browse to http://localhost:8080
to access db-admin, and explore the database. It will also run db-init,
which should run any pending database migrations.

    npm run dev --workspace=frontend
    npm run dev --workspace=backend

## To Build Locally

    docker build -f Dockerfile.backend .
    docker build -f Dockerfile.db-init .
    docker build -f Dockerfile.frontend .

    docker run --rm --network="beckybot_backend" \
      006cab83a5bf1bf0e0ad8bc2437387d08dfe1cd7c74621b475652aa4dac25661 \
      sh -c './wait-for.sh db:3306 -t 240 -- npx knex --knexfile db-init/knexfile.js migrate:latest'
