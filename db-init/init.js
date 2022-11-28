import knex from "knex";

const db = knex({
  client: "mysql",
  connection: {
    host: "db",
    user: "beckybot",
    password: "FooBarIsDead",
    database: "beckybot",
  },
});
await db.migrate.latest({ directory: "./db-init/migrations" });
db.destroy();
