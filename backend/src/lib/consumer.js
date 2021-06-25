import { postMessage } from '@beckybot/lib/_api.js';
import { db } from '@beckybot/lib/db.js';

let timestamps = {};

let teams;

const triggers = [
  // {regex: { match: '^Happy F(ri|ir)day*', flags: 'i' }, daysOfWeek: [4], timeout: 15 * 60, responses: []},
  {trigger: { match: '^Happy F(ri|ir)day*', flags: 'i' }, daysOfWeek: [5], timeout: 15 * 60, responses: [
    'And a Happy Friday to you too! Enjoy the original video, the one that started it all! https://www.youtube.com/watch?v=kfVsfOSbJY0',
    'Looking forward to that weekend! Here\'s one with Lyrics: https://www.youtube.com/watch?v=DPVTl9K0lqc',
    'Thanks! Celebrate with the new remix! https://www.youtube.com/watch?v=iCFOcqsnc9Y',
    'You too! Here\'s a cover by Katy Perry. https://www.youtube.com/watch?v=sM51ANnSgsU',
    'For all the metal fans. https://www.youtube.com/watch?v=9mHDAYutrC0',
    'It\'s Death Metal Friday! https://www.youtube.com/watch?v=pi00ykRg_5c',
    'Something a little different this time. Annoying Orange! https://www.youtube.com/watch?v=akT0wxv9ON8',
    'Did you know Rebecca Black has some other songs too? Here\'s Girlfriend: https://www.youtube.com/watch?v=pEy5x-vTH4g'
  ], state: { next: 0 }},
  {trigger: { match: '^Happy Humpday*', flags: 'i' }, daysOfWeek: [0, 3], timeout: 15 * 60, responses: [
    'https://i.pinimg.com/originals/20/03/15/2003156de252c06c15b90103f2c3d45b.gif'
  ], state: { next: 0 }}
];


export async function processMessage(message) {
//  console.log('processMessage', { topic, message });

  const { event } = message;
  const { channel, subtype, team, text, type, user } = event;

  if (teams === undefined) {
    try {
      console.log('selecting teams')
      // const db = knex(config);
      teams = await (await db.from('teams')).reduce((map, {id, config}) => {
        map[id] = JSON.parse(config);
        return map;
      }, {});
    } catch (error) {
      console.log('error', error)
    }
  }
  // console.log({teams})

  if (type === 'app_mention') {
    const token = teams[team].access_token;

    postMessage({ token, channel, text: `Hi <@${user}>` });
  }

  if (type === 'message') {
    // if (subtype === 'channel_join') {

    // }
    // if (subtype === 'channel_leave') {

    // }

  //     if (!event.subtype && happyFriday.test(event.text)) {
  //       const team = event.team;
  //       const token = teams[team].access_token;

  //       if (timestamps[team] === undefined) {
  //         timestamps[team] = { time: 0, next: 0 };
  //       }

  //       const now = Date.now();
  //       const dayOfWeek = new Date().getDay();
  //       console.log({dayOfWeek});

  //       const delay = 15 * 60 * 1000;
  //       if (dayOfWeek === 5 && timestamps[team].time + delay < now) {
  //         timestamps[team].time = now;
  //         await postMessage({ token, channel: event.channel, text: videos[timestamps[team].next] });

  //         timestamps[team].next = (timestamps[team].next + 1) % videos.length;
  //       } else {
  //         console.log('==== waiting a while ===');
  //       }
  //     }
    if (!subtype) {
      console.log({text})
      for (let next of triggers) {
        // console.log(next);
        if (next.regex === undefined) {
          next.regex = new RegExp(next.trigger.match, next.trigger.flags);
        }
        console.log(next.trigger);
        if (next.regex.test(text)) {
          console.log('match found');

          if (next.daysOfWeek?.length) {
            const dayOfWeek = new Date().getDay();
            console.log(next.daysOfWeek, {dayOfWeek});
            if (!next.daysOfWeek.includes(dayOfWeek)) {
              continue;
            }

            const token = teams[team].access_token;
            const message = next.responses[next.state.next];
            next.state.next = (next.state.next + 1) % next.responses.length;

            postMessage({ token, channel, text: message });

          }
        }
      }
    }

    // if (!subtype && happyHumpday.test(text)) {
    //   const team = event.team;
    //   const token = teams[team].access_token;

    //   const now = Date.now();
    //   const dayOfWeek = new Date().getDay();
    //   console.log({dayOfWeek});

    //   if (dayOfWeek === 3) {
    //     await postMessage({ token, channel: event.channel, text: 'https://i.pinimg.com/originals/20/03/15/2003156de252c06c15b90103f2c3d45b.gif' });
    //   }
    // }
  //   }
  }
}
