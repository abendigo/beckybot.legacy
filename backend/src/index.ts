import redis from "redis";

import { createHandler } from "./handler";

import { createContainer } from "@beckybot/lib/ioc";
// import { postMessage } from "@beckybot/lib/slack";

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
// container.register(
//   "pubsub",
//   (function () {
//     const client = redis.createClient({
//       url: `redis://${process.env.REDIS_HOST || "localhost"}:6379`,
//     });

//     return {
//       // publish: (topic, message) => {
//       //   client.publish(topic, message);
//       // },
//       subscribe: (topic, callback) => {
//         client.on("message", function (topic, message) {
//           callback(topic, JSON.parse(message));
//         });
//         client.subscribe(topic);

//         return () => {
//           console.log("unsubscribe", topic);
//           client.unsubscribe(topic);
//           client.quit();
//         };
//       },
//     };
//   })()
// );
// container.register(
//   "slack",
//   (function () {
//     return {
//       postMessage: postMessage,
//     };
//   })()
// );

const handler = createHandler();

// Nodemon sends SIGUSR2 before it restarts.
process.once("SIGUSR2", function () {
  console.log("shutting down");
  handler.close();

  process.kill(process.pid, "SIGUSR2");
});
