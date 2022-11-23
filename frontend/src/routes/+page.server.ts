import type { PageServerLoad } from './$types';
// import { createDatabaseConnection } from '../../../lib/db'; // "../../../../lib/db.js";
import { DB_HOST } from '$env/static/private';

import knex from 'knex';

function createDatabaseConnection(hostname: string) {
	return knex({
		client: 'mysql',
		connection: {
			// host: 'localhost',
			host: hostname,
			user: 'beckybot',
			password: 'FooBarIsDead',
			database: 'beckybot'
		}
		// migrations: {
		//   directory: "./migrations",
		// },
		// seeds: "./seeds/development",
	});
}

console.log('DB_HOST', DB_HOST || 'localhost');
let db;

export const load: PageServerLoad = async (/* { params } */) => {
	if (!db) db = createDatabaseConnection(DB_HOST);

	const teams = (await db.from('teams')).reduce((map, { id, config }) => {
		map[id] = JSON.parse(config);
		return map;
	}, {});

	console.log({ teams });

	const data = Object.values(teams).map((next) => next.team);

	return {
		teams: data
	};
};
