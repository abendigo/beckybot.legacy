import { postMessage } from './_api';

export async function post(request, context) {
  const { SLACK_API_TOKEN: token } = process.env;
  const { type, challenge } = request.body;
  // console.log('POST', request);

  if (type === 'url_verification') {
      return { body: challenge };
  }

  if (type === 'event_callback') {
    const { event } = request.body;

    if (event.type === 'app_mention') {
      postMessage({ token, channel: event.channel, text: `Hi <@${event.user}>` })
    }

    if (event.type === 'message') {
      if (event.subtype === 'channel_join') {

      }

      if (!event.subtype && event.text.localeCompare('happy friday', 'en', { sensitivity: 'base' }) === 0) {
        const text = 'The Original! The one that started it all! https://www.youtube.com/watch?v=kfVsfOSbJY0';
        const next = 'The Remix! https://www.youtube.com/watch?v=iCFOcqsnc9Y';

        postMessage({ token, channel: event.channel, text })

      }
    }
  }

  return { body: {} };
}
