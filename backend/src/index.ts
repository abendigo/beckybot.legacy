import redis from "redis";
import knex from "knex";

import { createHandler } from "./handler.js";

import { createContainer } from "../../lib/ioc";
import { postMessage } from "../../lib/_api.js";

const container = createContainer();
container.register("date", {
  now: () => new Date(),
});
container.register(
  "db",
  (function () {
    const db = knex({
      client: "mysql",
      connection: {
        host: process.env.DB_HOST || "localhost",
        user: "beckybot",
        password: "FooBarIsDead",
        database: "beckybot",
      },
    });

    return {
      getTeams: async () => {
        console.log("db::getTeams");
        const teams = (await db.from("teams")).reduce((map, { id, config }) => {
          map[id] = JSON.parse(config);
          return map;
        }, {});
        return teams;
      },
      getTriggers: async () => [
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
          trigger: { match: "^Happy F(ri|ir|ry)day*", flags: "i" },
          daysOfWeek: [0, 1, 2, 3, 4, 6],
          timeout: 15 * 60,
          responses: ["Surely you can't be serious? It's {dayName}"],
          state: { next: 0 },
        },
        {
          trigger: { match: "^Happy Humpday*", flags: "i" },
          // daysOfWeek: [0, 3],
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
      ],
    };
  })()
);
container.register(
  "pubsub",
  (function () {
    const client = redis.createClient({
      url: `redis://${process.env.REDIS_HOST || "localhost"}:6379`,
    });

    return {
      // publish: (topic, message) => {
      //   client.publish(topic, message);
      // },
      subscribe: (topic, callback) => {
        client.on("message", function (topic, message) {
          callback(topic, JSON.parse(message));
        });
        client.subscribe(topic);

        return () => {
          console.log("unsubscribe", topic);
          client.unsubscribe(topic);
          client.quit();
        };
      },
    };
  })()
);
container.register(
  "slack",
  (function () {
    return {
      postMessage: postMessage,
    };
  })()
);

const handler = createHandler();

// Nodemon sends SIGUSR2 before it restarts.
process.once("SIGUSR2", function () {
  console.log("shutting down");
  handler.close();

  process.kill(process.pid, "SIGUSR2");
});
