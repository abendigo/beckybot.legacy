import { postMessage } from "../../lib/_api.js";
// import { subscribe } from "../../lib/pubsub.js";
import redis from "redis";
import knex from "knex";

import { createHandler } from "./handler.js";

import { createMessageConsumer } from "./lib/consumer.js";
// import { createTeamManager } from './lib/teams.js'
// import { createTriggerManager } from './lib/triggers.js'

import { processMessage } from "./lib/processMessage.js";
import { createContainer, getContainer } from "../../lib/ioc.js";

const messageProducer = { postMessage };
// const teamManager = createTeamManager(db);
// const triggerManager = createTriggerManager(db);

// const { processMessage } = createMessageConsumer({ db, messageProducer }
const container = createContainer();
container.register(
  "db",
  (function () {
    const db = knex({
      client: "mysql",
      connection: {
        // host: 'localhost',
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

// const { subscribe } = getContainer().resolve("pubsub");
const handler = createHandler();

// Nodemon sends SIGUSR2 before it restarts.
process.once("SIGUSR2", function () {
  console.log("shutting down");
  handler.close();

  process.kill(process.pid, "SIGUSR2");
});

// const unsubscribe = subscribe("EVENTS", function (channel, message) {
//   try {
//     console.log("subscribe", channel);
//     processMessage(message);
//   } catch (error) {
//     console.log("XXXX ERROR XXXX", error);
//   }
// });
