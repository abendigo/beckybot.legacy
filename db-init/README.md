To run the Knex migrations manually:

    docker run -it --rm --network="beckybot_backend" -v `pwd`:/src -w /src \
      node:18-alpine npx knex --knexfile db-init/knexfile.js migrate:list
