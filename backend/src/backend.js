import { postMessage } from "../../lib/_api.js";
import { subscribe } from "../../lib/pubsub.js";

import { createMessageConsumer } from "./lib/consumer.js";
// import { createTeamManager } from './lib/teams.js'
// import { createTriggerManager } from './lib/triggers.js'

import { processMessage } from "./lib/processMessage.js";

const messageProducer = { postMessage };
// const teamManager = createTeamManager(db);
// const triggerManager = createTriggerManager(db);

// const { processMessage } = createMessageConsumer({ db, messageProducer });

// Nodemon sends SIGUSR2 before it restarts.
process.once("SIGUSR2", function () {
  console.log("shutting down");
  unsubscribe();

  process.kill(process.pid, "SIGUSR2");
});

const unsubscribe = subscribe(
  process.env.REDIS_HOST || "localhost",
  "EVENTS",
  function (channel, message) {
    try {
      console.log("subscribe", channel);
      processMessage(message, postMessage);
    } catch (error) {
      console.log("XXXX ERROR XXXX", error);
    }
  }
);
