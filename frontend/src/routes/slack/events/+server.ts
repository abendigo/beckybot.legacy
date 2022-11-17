import type { RequestHandler } from './$types';
import { publish } from '@beckybot/lib/pubsub';

export const POST: RequestHandler = async ({ request }) => {
	// console.log('event', { event });
	// const { request } = event;
	// const {
	// 	body,
	// 	body: { type, challenge }
	// } = request;
	const body = await request.json();
	console.log('events.post', body);

	const { type, challenge } = body;

	if (type === 'url_verification') {
		return new Response(challenge);
	}

	if (type === 'event_callback') {
		publish('EVENTS', body);
	}

	return new Response();
};

/*

 {
  token: 'OF28yWOyUjIicRGftxbXt75A',
  challenge: 'kduHJ6WkwWvuFXa0P6xQz0ZNkdk5AiTUe1EE6oW4GgGkSSWcof2E',
  type: 'url_verification'
}


curl -v https://oosterveld.ngrok.io/slack/events \
  -H 'Content-Type: application/json' \
  -d '{"token":"OF28yWOyUjIicRGftxbXt75A","challenge":"kduHJ6WkwWvuFXa0P6xQz0ZNkdk5AiTUe1EE6oW4GgGkSSWcof2E","type":"url_verification"}'


curl -v https://oosterveld.ngrok.io/slack/events \
  -H 'Content-Type: application/json' \
  -d '{"token":"OF28yWOyUjIicRGftxbXt75A","challenge":"kduHJ6WkwWvuFXa0P6xQz0ZNkdk5AiTUe1EE6oW4GgGkSSWcof2E","type":"event_callback"}'
*/
