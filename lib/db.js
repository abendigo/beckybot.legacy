import knex from 'knex';
import { config } from '../db/knexfile.js';

console.log({config});

export const db = knex(config);
