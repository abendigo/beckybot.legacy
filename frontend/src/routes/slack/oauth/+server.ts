// import { getAccessToken } from './_api';
import type { RequestHandler } from './$types';
import { getAccessToken } from '../../../../../lib/_api';
import { createDatabaseConnection } from '../../../../../lib/db.js';
import { DB_HOST } from '$env/static/private';

let db;

// import { SLACK_CLIENT_SECRET } from '$env/static/private';
const SLACK_CLIENT_SECRET = '4e7b3970e0fc002b3a1742274e8d58a2';

// const { SLACK_CLIENT_SECRET: client_secret } = process.env;
const client_id = '2774084983.1867696398775';

export const GET: RequestHandler = async ({ url }) => {
	// console.log('oauth.get', request);
	// console.log('oauth.get', request.query);
	// const code = request.query.get('code');
	const code = url.searchParams.get('code');

	// console.log({ code, client_id, SLACK_CLIENT_SECRET });

	const json = await getAccessToken({ code, client_id, SLACK_CLIENT_SECRET });
	console.log('============================================');
	console.log(json);
	console.log('============================================');

	if (json.ok) {
		if (!db) db = createDatabaseConnection(DB_HOST);

		const xxx = await db('teams').insert({ id: json.team.id, config: JSON.stringify(json) });
		console.log({ xxx });
	}

	// return new Response();
};
