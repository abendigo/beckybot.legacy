// import mysql from "mysql2/promise.js";
import knex from "knex";

import { config } from "./knexfile.js";

// const con = await mysql.createConnection({
//   host: config.connection.host,
//   user: "root",
//   password: "root",
// });

// await con.connect((err) => {
//   console.log("connected", err);
// });
/*
const commands = [
  "create database if not exists beckybot;",
  "create user if not exists 'beckybot'@'172.0.0.0/255.0.0.0' identified WITH mysql_native_password by 'FooBarIsDead';",
  "create user if not exists 'beckybot'@'192.168.0.0/255.255.0.0' identified WITH mysql_native_password by 'FooBarIsDead';",
  "grant all privileges on beckybot.* to 'beckybot'@'172.0.0.0/255.0.0.0';",
  "grant all privileges on beckybot.* to 'beckybot'@'192.168.0.0/255.255.0.0';"
];

await con.query("create database if not exists beckybot;");
await con.query(
  "create user if not exists 'beckybot'@'172.0.0.0/255.0.0.0' identified WITH mysql_native_password by 'FooBarIsDead';"
);
await con.query(
  "create user if not exists 'beckybot'@'192.168.0.0/255.255.0.0' identified WITH mysql_native_password by 'FooBarIsDead';"
);
await con.query(
  "grant all privileges on beckybot.* to 'beckybot'@'172.0.0.0/255.0.0.0';"
);
await con.query(
  "grant all privileges on beckybot.* to 'beckybot'@'192.168.0.0/255.255.0.0';"
);
// con.query("FLUSH PRIVILEGES;");
await con.end();
*/
const db = knex(config);
await db.migrate.latest(config.migrations);
db.destroy();
