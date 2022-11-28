// import mysql from "mysql2/promise.js";
import knex from "knex";

const db = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST || "localhost",
    user: "beckybot",
    password: "FooBarIsDead",
    database: "beckybot",
  },
});
await db.migrate.latest({ directory: "./db-init/migrations" });
db.destroy();
