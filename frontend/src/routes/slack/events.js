import { publish } from '@beckybot/lib/pubsub';

export async function post(request) {
  const { body, body: { type, challenge } } = request;
  console.log('events.post', type)

  if (type === 'url_verification') {
      return { body: challenge };
  }

  if (type === 'event_callback') {
    publish('EVENTS', body);
  }

  return { body: {} };
}
