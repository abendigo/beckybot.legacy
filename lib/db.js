import knex from "knex";

export function createDatabaseConnection(hostname) {
  return knex({
    client: "mysql",
    connection: {
      // host: 'localhost',
      host: hostname,
      user: "beckybot",
      password: "FooBarIsDead",
      database: "beckybot",
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: "./seeds/development",
  });
}
