export const config = {
  client: 'mysql',
  connection: {
    host: 'db',
    user: 'beckybot',
    password: 'FooBarIsDead',
    database: 'beckybot'
  },
  migrations: {
    directory: './db/migrations'
  },
  seeds: './seeds/development'
};

export const { client, connection, migrations, seeds } = config;
