import 'querystring';
import knex from 'knex';
import redis from 'redis';

// import { request } from "https";

async function postMessage({ token, channel, text }) {
  console.log("postMessage", { token, channel, text });

  JSON.stringify({
    channel,
    text,
  });

  const response = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    body: JSON.stringify({ channel, text }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      // 'Content-Length': data.length
    },
  });

  console.log("---------------------------------------------------");
  console.log(response);
  console.log("---------------------------------------------------");

  const json = await response.json();
  console.log(json);
  console.log("---------------------------------------------------");

  /*
  const req = request(options, (response) => {
    console.log(`statusCode: ${response.statusCode}`);
    let data = "";

    response.on("data", (chunk) => {
      process.stdout.write(chunk);
      data += chunk;
    });

    response.on("end", () => {
      console.log(JSON.parse(data));
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
*/
}

/*

curl -F code=2774084983.4396853513697.6a1649023231db69e0960ba1473a54ec9c0cfa6b7300f1344e4deb7ef81b2577 \
  -F client_id=2774084983.1867696398775 \
  -F client_secret=<<secret>> \
  https://slack.com/api/oauth.v2.access








json {
  json: {
    ok: true,
    app_id: 'A01RHLGBQNT',
    authed_user: { id: 'U02NS2GV5' },
    scope: 'chat:write,channels:read,app_mentions:read,channels:history',
    token_type: 'bot',
    access_token: '<<token>>',
    bot_user_id: 'U01S4JX0A20',
    team: { id: 'T02NS2GUX', name: 'Oosterveld Family' },
    enterprise: null,
    is_enterprise_install: false
  }
}
*/

const config = {
  client: 'mysql',
  connection: {
    host: 'db',
    user: 'beckybot',
    password: 'FooBarIsDead',
    database: 'beckybot'
  },
  migrations: {
    directory: './migrations'
  },
  seeds: './seeds/development'
};

console.log({config});

const db = knex(config);

const hostname = "redis";

function subscribe(topic, callback) {
  const subscriber = redis.createClient({ url: `redis://${hostname}:6379` });

  subscriber.on("message", function (channel, message) {
    callback(channel, JSON.parse(message));
  });
  subscriber.subscribe(topic);

  return () => {
    console.log("unsubscribe", topic);
    subscriber.unsubscribe(topic);
    subscriber.quit();
  };
}

let teams;
const triggers = [
  // {regex: { match: '^Happy F(ri|ir)day*', flags: 'i' }, daysOfWeek: [4], timeout: 15 * 60, responses: []},
  {
    trigger: { match: "^Happy F(ri|ir|ry)day*", flags: "i" },
    daysOfWeek: [5],
    timeout: 15 * 60,
    responses: [
      "And a Happy Friday to you too! Enjoy the original video, the one that started it all! https://www.youtube.com/watch?v=kfVsfOSbJY0",
      "Looking forward to that weekend! Here's one with Lyrics: https://www.youtube.com/watch?v=DPVTl9K0lqc",
      "Thanks! Celebrate with the new remix! https://www.youtube.com/watch?v=iCFOcqsnc9Y",
      "You too! Here's a cover by Katy Perry. https://www.youtube.com/watch?v=sM51ANnSgsU",
      "For all the metal fans. https://www.youtube.com/watch?v=9mHDAYutrC0",
      "It's Death Metal Friday! https://www.youtube.com/watch?v=pi00ykRg_5c",
      "Something a little different this time. Annoying Orange! https://www.youtube.com/watch?v=akT0wxv9ON8",
      "Did you know Rebecca Black has some other songs too? Here's Girlfriend: https://www.youtube.com/watch?v=pEy5x-vTH4g",
    ],
    state: { next: 0 },
  },
  {
    trigger: { match: "^Happy Humpday*", flags: "i" },
    daysOfWeek: [0, 3],
    timeout: 15 * 60,
    responses: [
      "https://i.pinimg.com/originals/20/03/15/2003156de252c06c15b90103f2c3d45b.gif",
    ],
    state: { next: 0 },
  },
  {
    trigger: { match: "^Happy Monday*", flags: "i" },
    daysOfWeek: [1],
    timeout: 15 * 60,
    responses: [
      "https://i.pinimg.com/564x/f8/db/41/f8db4198bf89824b36744d3332687f2f.jpg",
    ],
    state: { next: 0 },
  },
];

async function processMessage(message) {
  //  console.log('processMessage', { topic, message });

  const { event } = message;
  const { channel, subtype, team, text, type, user } = event;

  if (teams === undefined) {
    try {
      console.log("selecting teams");
      // const db = knex(config);
      teams = await (
        await db.from("teams")
      ).reduce((map, { id, config }) => {
        console.log("== id, config", { id, config });
        map[id] = JSON.parse(config);
        return map;
      }, {});
    } catch (error) {
      console.log("error", error);
    }
  }
  console.log({ teams });

  if (type === "app_mention") {
    console.log({ team, teams });
    const token = teams[team].access_token;
    console.log({ token });

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
      console.log({ text });
      for (let next of triggers) {
        // console.log(next);
        if (next.regex === undefined) {
          next.regex = new RegExp(next.trigger.match, next.trigger.flags);
        }
        console.log(next.trigger);
        if (next.regex.test(text)) {
          console.log("match found");

          if (next.daysOfWeek?.length) {
            const dayOfWeek = new Date().getDay();
            console.log(next.daysOfWeek, { dayOfWeek });
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

// const teamManager = createTeamManager(db);
// const triggerManager = createTriggerManager(db);

// const { processMessage } = createMessageConsumer({ db, messageProducer });

// Nodemon sends SIGUSR2 before it restarts.
process.once("SIGUSR2", function () {
  console.log("shutting down");
  unsubscribe();

  process.kill(process.pid, "SIGUSR2");
});

const unsubscribe = subscribe("EVENTS", function (channel, message) {
  try {
    console.log("subscribe", channel);
    processMessage(message, postMessage);
  } catch (error) {
    console.log("XXXX ERROR XXXX", error);
  }
});
