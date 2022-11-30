import type { Handle } from '@sveltejs/kit';
// import { DB_HOST, REDIS_HOST } from '$env/static/private';

import { createContainer, getContainer } from '@beckybot/lib/ioc';
import { createDataHandler } from '@beckybot/lib/db';
import { createDynamicEnvHandler, type DynamicEnvHandler } from '@beckybot/lib/env';
import { createPubSubHandler } from '@beckybot/lib/pubsub';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('>>>> hook.server.ts:handle', event.url.pathname);

	if (!getContainer()) {
		createContainer({
			env: createDynamicEnvHandler(process.env),

			// date: createDateHandler(),
			db: createDataHandler(process.env.DB_HOST),
			pubsub: createPubSubHandler(process.env.REDIS_HOST)
		});
		// SlackHandler requires DynamicEnvHandler
		// .register("slack", createSlackHandler(
		//   slackClientId, slackClientSecret
		// ))
	}

	if (event.url.pathname !== '/setup') {
		const { get } = getContainer().resolve<DynamicEnvHandler>('env');

		const slackClientID = get('SLACK_CLIENT_ID');
		const slackClientSecret = get('SLACK_CLIENT_SECRET');
		console.log('>>>> SLACK_CLIENT_ID:', slackClientID, 'SLACK_CLIENT_SECRET', slackClientSecret);

		if (!slackClientID || !slackClientSecret)
			return Response.redirect(`${event.url.origin}/setup`, 303);
	}

	return resolve(event);
};
