import { createHandler } from "./handler";

import { createContainer } from "@beckybot/lib/ioc";

import { createDataHandler } from "@beckybot/lib/db";
import { createDateHandler } from "@beckybot/lib/date";
import { createPubSubHandler } from "@beckybot/lib/pubsub";
import { createSlackHandler } from "@beckybot/lib/slack";

// Inject Dependencies
createContainer({
  date: createDateHandler(),
  db: createDataHandler(process.env.DB_HOST),
  pubsub: createPubSubHandler(process.env.REDIS_HOST),
  slack: createSlackHandler(),
});

// Start the server
const handler = createHandler();

// Nodemon sends SIGUSR2 before it restarts.
process.once("SIGUSR2", function () {
  console.log("shutting down");
  handler.close();

  process.kill(process.pid, "SIGUSR2");
});
