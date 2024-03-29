import { getContainer } from '@beckybot/lib/ioc';
import type { DataHandler } from '@beckybot/lib/db';
import type { SlackHandler } from '@beckybot/lib/slack';

import type { RequestHandler } from './$types';

// import { SLACK_CLIENT_SECRET } from '$env/static/private';
// const { SLACK_CLIENT_SECRET: client_secret } = process.env;
const SLACK_CLIENT_SECRET = '4e7b3970e0fc002b3a1742274e8d58a2';

const client_id = '2774084983.1867696398775';

export const GET: RequestHandler = async ({ url }) => {
	const container = getContainer();
	const { getAccessToken } = container.resolve<SlackHandler>('slack');
	const { addTeam } = container.resolve<DataHandler>('db');
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
		await addTeam({ id: json.team.id, config: JSON.stringify(json) });
		// if (!db) db = createDatabaseConnection(DB_HOST);
		// const xxx = await db('teams').insert({ id: json.team.id, config: JSON.stringify(json) });
		// console.log({ xxx });
	}

	// return new Response();
};
