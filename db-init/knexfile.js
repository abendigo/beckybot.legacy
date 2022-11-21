const common = {
  migrations: {
    directory: "./migrations",
  },
};

export const development = {
  ...common,
};

export const testing = {
  ...common,
  client: "better-sqlite3",
};

export const staging = {
  ...common,
  connection: {
    filename: ":memory:",
  },
};

export const production = {
  ...common,
  client: "mysql",
  connection: {
    host: "db",
    user: "beckybot",
    password: "FooBarIsDead",
    database: "beckybot",
  },
  seeds: "./seeds/development",
};

export const config = {
  ...common,
  client: "mysql",
  connection: {
    host: "db",
    user: "beckybot",
    password: "FooBarIsDead",
    database: "beckybot",
  },
  // migrations: {
  //   directory: "./migrations",
  // },
  seeds: "./seeds/development",
};

// export const { client, connection, migrations, seeds } = config;
