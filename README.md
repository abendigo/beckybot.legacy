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
    docker build -f Dockerfile.db .
    docker build -f Dockerfile.frontend .
