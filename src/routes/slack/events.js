import { postMessage } from './_api';
import { teams } from './_teams';

let timestamps = {};

export async function post(request, context) {
  // const { SLACK_API_TOKEN: token } = process.env;
  const { type, challenge } = request.body;
  console.log('POST', request);

  if (type === 'url_verification') {
      return { body: challenge };
  }

  if (type === 'event_callback') {
    const { event } = request.body;

    if (event.type === 'app_mention') {
      const team = event.team;
      const token = teams[team].access_token;

      postMessage({ token, channel: event.channel, text: `Hi <@${event.user}>` })
    }

    if (event.type === 'message') {
      if (event.subtype === 'channel_join') {

      }

      if (!event.subtype && event.text.localeCompare('happy friday', 'en', { sensitivity: 'base' }) === 0) {
        const team = event.team;
        const token = teams[team].access_token;

        const text = 'The Original! The one that started it all! https://www.youtube.com/watch?v=kfVsfOSbJY0';
        const next = 'The Remix! https://www.youtube.com/watch?v=iCFOcqsnc9Y';

        if (timestamps[team] === undefined) {
          timestamps[team] = 0;
        }

        const now = Date.now();
        const delay = 15 * 60 * 1000;
        if (timestamps[team] + delay < now) {
          timestamps[team] = now;
          await postMessage({ token, channel: event.channel, text });
        } else {
          console.log('==== waiting a while ===');
        }
      }
    }
  }

  return { body: {} };
}
