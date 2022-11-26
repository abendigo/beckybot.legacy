// import mysql from "mysql2/promise.js";
import knex from "knex";

import { config } from "./knexfile.js";

const db = knex(config);
await db.migrate.latest(config.migrations);
db.destroy();
