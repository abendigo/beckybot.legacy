import { postMessage } from './_api';
import { teams } from './_teams';
import { videos } from './_videos';

let timestamps = {};
const happyFriday = new RegExp(/^Happy F(ri|ir)day*/, 'i');

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

      if (!event.subtype && happyFriday.test(event.text)) {
        const team = event.team;
        const token = teams[team].access_token;

        if (timestamps[team] === undefined) {
          timestamps[team] = { time: 0, next: 0 };
        }

        const now = Date.now();
        const dayOfWeek = new Date().getDay();
        console.log({dayOfWeek});

        const delay = 15 * 60 * 1000;
        if (dayOfWeek === 5 && timestamps[team].time + delay < now) {
          timestamps[team].time = now;
          await postMessage({ token, channel: event.channel, text: videos[timestamps[team].next] });

          timestamps[team].next = (timestamps[team].next + 1) % videos.length;
        } else {
          console.log('==== waiting a while ===');
        }
      }
    }
  }

  return { body: {} };
}
