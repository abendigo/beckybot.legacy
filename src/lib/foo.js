

export function processMessage(channel, message) {
  console.log('processMessage', { channel, message });

  // const { type, challenge } = JSON.parse(message);


  // if (type === 'url_verification') {
  //   return { body: challenge };
  // }

  // if (type === 'event_callback') {
  //   const { event } = request.body;

  //   if (event.type === 'app_mention') {
  //     const team = event.team;
  //     const token = teams[team].access_token;

  //     postMessage({ token, channel: event.channel, text: `Hi <@${event.user}>` })
  //   }

  //   if (event.type === 'message') {
  //     if (event.subtype === 'channel_join') {

  //     }

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
  //     if (!event.subtype && happyHumpday.test(event.text)) {
  //       const team = event.team;
  //       const token = teams[team].access_token;

  //       const now = Date.now();
  //       const dayOfWeek = new Date().getDay();
  //       console.log({dayOfWeek});

  //       if (dayOfWeek === 3) {
  //         await postMessage({ token, channel: event.channel, text: 'https://i.pinimg.com/originals/20/03/15/2003156de252c06c15b90103f2c3d45b.gif' });
  //       }
  //     }
  //   }
  // }
}
