// import { postMessage } from '@abendigo/beckybot/_api.js';
// import { db } from '@abendigo/beckybot/db.js';

/*
const triggers = [
  // {regex: { match: '^Happy F(ri|ir)day*', flags: 'i' }, daysOfWeek: [4], timeout: 15 * 60, responses: []},
  {trigger: { match: '^Happy F(ri|ir)day*', flags: 'i' }, daysOfWeek: [5, 6], timeout: 15 * 60, responses: [
    'And a Happy Friday to you too! Enjoy the original video, the one that started it all! https://www.youtube.com/watch?v=kfVsfOSbJY0',
    'Looking forward to that weekend! Here\'s one with Lyrics: https://www.youtube.com/watch?v=DPVTl9K0lqc',
    'Thanks! Celebrate with the new remix! https://www.youtube.com/watch?v=iCFOcqsnc9Y',
    'You too! Here\'s a cover by Katy Perry. https://www.youtube.com/watch?v=sM51ANnSgsU',
    'For all the metal fans. https://www.youtube.com/watch?v=9mHDAYutrC0',
    'It\'s Death Metal Friday! https://www.youtube.com/watch?v=pi00ykRg_5c',
    'Something a little different this time. Annoying Orange! https://www.youtube.com/watch?v=akT0wxv9ON8',
    'Did you know Rebecca Black has some other songs too? Here\'s Girlfriend: https://www.youtube.com/watch?v=pEy5x-vTH4g'
  ], state: { next: 0 }},
  {trigger: { match: '^Happy Humpday*', flags: 'i' }, daysOfWeek: [6, 3], timeout: 15 * 60, responses: [
    'https://i.pinimg.com/originals/20/03/15/2003156de252c06c15b90103f2c3d45b.gif'
  ], state: { next: 0 }}
];
*/
import { createTeamManager } from "./teams.js";
import { createTriggerManager } from "./triggers.js";
// Local dependencies only... (maybe)

export function createMessageConsumer({ db, messageProducer }) {
  const teamManager = createTeamManager(db);
  const triggerManager = createTriggerManager(db);

  return createMessageConsumerWithDependencies({
    messageProducer,
    teamManager,
    triggerManager,
  });
}

export function createMessageConsumerWithDependencies({
  messageProducer: { postMessage },
  teamManager: { getTeam },
  triggerManager: { getAllTriggers },
}) {
  return {
    processMessage: async function processMessage(message) {
      // console.log('processMessage', { message });

      const { event } = message;
      const { channel, subtype, team, text, type, user } = event;

      if (type === "app_mention") {
        const { access_token: token } = await getTeam(team);

        postMessage({ token, channel, text: `Hi <@${user}>` });
      }

      if (type === "message") {
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
          const triggers = await getAllTriggers();
          for (let next of triggers) {
            if (next.regex.test(text)) {
              if (next.daysOfWeek?.length) {
                const dayOfWeek = new Date().getDay();
                if (!next.daysOfWeek.includes(dayOfWeek)) {
                  continue;
                }

                const { access_token: token } = getTeam(team);
                const message = next.responses[next.state.next];
                next.state.next = (next.state.next + 1) % next.responses.length;

                postMessage({ token, channel, text: message });
              } else {
                const { access_token: token } = getTeam(team);
                const message = next.responses[next.state.next];
                next.state.next = (next.state.next + 1) % next.responses.length;

                postMessage({ token, channel, text: message });
              }
            }
          }
        }
      }
    },
  };
}
