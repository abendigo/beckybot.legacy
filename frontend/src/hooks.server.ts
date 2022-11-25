console.log('>>>> hooks.server.ts');

import { createContainer, getContainer } from '../../lib/ioc';

import type { Handle } from '@sveltejs/kit';
import knex from 'knex';
import redis from 'redis';
import { DB_HOST, REDIS_HOST } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('>>>> hooks.server.ts:handle', event.url.pathname);

	if (!getContainer()) {
		const container = createContainer();
		container.register(
			'db',
			(function () {
				const db = knex({
					client: 'mysql',
					connection: {
						// host: 'localhost',
						host: DB_HOST || 'localhost',
						user: 'beckybot',
						password: 'FooBarIsDead',
						database: 'beckybot'
					}
				});

				return {
					getTeams: async () => {
						console.log('db::getTeams');
						const teams = (await db.from('teams')).reduce((map, { id, config }) => {
							map[id] = JSON.parse(config);
							return map;
						}, {});
						return teams;
					}
				};
			})()
		);
		container.register(
			'pubsub',
			(function () {
				const client = redis.createClient({ url: `redis://${REDIS_HOST || 'localhost'}:6379` });

				return {
					publish: (topic: string, message: string) => {
						client.publish(topic, message);
					}
					// subscribe: (topic, callback) => {
					// 	client.on('message', function (topic, message) {
					// 		callback(topic, JSON.parse(message));
					// 	});
					// 	client.subscribe(topic);

					// 	return () => {
					// 		console.log('unsubscribe', topic);
					// 		client.unsubscribe(topic);
					// 		client.quit();
					// 	};
					// }
				};
			})()
		);
	}
	// if (event.url.pathname.startsWith('/custom')) {
	//   return new Response('custom response');
	// }

	// const response = await resolve(event);
	// return response;

	return resolve(event);
};
