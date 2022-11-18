import knex from "knex";
import { config } from "./knexfile.js";

console.log({ config });

export const db = knex(config);
