import knex from "knex";

export function createDatabaseConnection(hostname: string) {
  return knex({
    client: "mysql",
    connection: {
      // host: 'localhost',
      host: hostname,
      user: "beckybot",
      password: "FooBarIsDead",
      database: "beckybot",
    },
    // migrations: {
    //   directory: "./migrations",
    // },
    // seeds: "./seeds/development",
  });
}
