import type { RequestHandler } from './$types';
import { getContainer } from '@beckybot/lib/ioc';
import type { PubSubHandler } from '@beckybot/lib/pubsub';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const { type, challenge } = body;

	if (type === 'url_verification') {
		return new Response(challenge);
	}

	if (type === 'event_callback') {
		const { resolve } = getContainer();
		const { publish } = resolve<PubSubHandler>('pubsub');

		publish('EVENTS', JSON.stringify(body));
	}

	return new Response();
};

/*
https://beckybot.oosterveld.org/slack/events
https://beckybot.oosterveld.org/slack/events



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

curl -v http://localhost:5173/slack/events \
-H 'Content-Type: application/json' \
-d '{ "token": "OF28yWOyUjIicRGftxbXt75A", "team_id": "T01625HJP6W", "api_app_id": "A01RHLGBQNT", "event": { "client_msg_id": "a3db4bdb-05a0-43d5-a269-bae1929700bf", "type": "message", "text": "Happy Friday", "user": "U015VN7G0QN", "ts": "1668863631.085569", "team": "T01625HJP6W", "channel": "C01RWT0PPL6", "event_ts": "1668863631.085569", "channel_type": "channel" }, "type": "event_callback", "event_id": "Ev04BM0WASLD", "event_time": 1668863631, "authorizations": [ { "enterprise_id": null, "team_id": "T01625HJP6W", "user_id": "U01SXHPTNHW", "is_bot": true, "is_enterprise_install": false } ], "is_ext_shared_channel": false, "event_context": "4-eyJldCI6Im1lc3NhZ2UiLCJ0aWQiOiJUMDE2MjVISlA2VyIsImFpZCI6IkEwMVJITEdCUU5UIiwiY2lkIjoiQzAxNjBQVDVVOUsifQ" }'

curl -v http://localhost:5173/slack/events \
-H 'Content-Type: application/json' \
-d '{ "team_id": "T01625HJP6W", "event": { "type": "message", "text": "Happy Friday", "team": "T01625HJP6W", "channel": "C01RWT0PPL6" }, "type": "event_callback" }'


events.post {
beckybot-main-beckybot-1  |   token: 'OF28yWOyUjIicRGftxbXt75A',
beckybot-main-beckybot-1  |   team_id: 'T02NS2GUX',
beckybot-main-beckybot-1  |   api_app_id: 'A01RHLGBQNT',
beckybot-main-beckybot-1  |   event: {
beckybot-main-beckybot-1  |     client_msg_id: '0e5ec3fb-889a-461d-a526-a9f98d51ba87',
beckybot-main-beckybot-1  |     type: 'message',
beckybot-main-beckybot-1  |     text: '<@U01S4JX0A20> hello becky',
beckybot-main-beckybot-1  |     user: 'U02NS2GV5',
beckybot-main-beckybot-1  |     ts: '1668730190.840589',
beckybot-main-beckybot-1  |     blocks: [ [Object] ],
beckybot-main-beckybot-1  |     team: 'T02NS2GUX',
beckybot-main-beckybot-1  |     channel: 'C01RZ0ZKTL2',
beckybot-main-beckybot-1  |     event_ts: '1668730190.840589',
beckybot-main-beckybot-1  |     channel_type: 'channel'
beckybot-main-beckybot-1  |   },
beckybot-main-beckybot-1  |   type: 'event_callback',
beckybot-main-beckybot-1  |   event_id: 'Ev04BH24RM7D',
beckybot-main-beckybot-1  |   event_time: 1668730190,
beckybot-main-beckybot-1  |   authorizations: [
beckybot-main-beckybot-1  |     {
beckybot-main-beckybot-1  |       enterprise_id: null,
beckybot-main-beckybot-1  |       team_id: 'T02NS2GUX',
beckybot-main-beckybot-1  |       user_id: 'U01S4JX0A20',
beckybot-main-beckybot-1  |       is_bot: true,
beckybot-main-beckybot-1  |       is_enterprise_install: false
beckybot-main-beckybot-1  |     }
beckybot-main-beckybot-1  |   ],
beckybot-main-beckybot-1  |   is_ext_shared_channel: false,
beckybot-main-beckybot-1  |   event_context: '4-eyJldCI6Im1lc3NhZ2UiLCJ0aWQiOiJUMDJOUzJHVVgiLCJhaWQiOiJBMDFSSExHQlFOVCIsImNpZCI6IkMwMVJaMFpLVEwyIn0'
beckybot-main-beckybot-1  | }
*/
