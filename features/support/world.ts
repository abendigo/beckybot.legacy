import {
  defineParameterType,
  setWorldConstructor,
  Before,
  After,
} from "@cucumber/cucumber";
import { ActorWorld, ActorParameterType } from "@cucumber/screenplay";
import type { IActorWorldOptions } from "@cucumber/screenplay";
import type { Server } from "http";
import polka from "polka";

import type { SendChatMessage } from "./tasks/types";
import { handler } from "../../frontend/build/handler";
import { createHandler } from "../../backend/src/handler";

import { createContainer, getContainer } from "../../lib/ioc";
import { processMessage } from "../../backend/src/lib/processMessage";

// Define an {actor} parameter type that creates Actor objects
defineParameterType({
  ...ActorParameterType,
  regexp: /BeckyBot|ChannelUser|A-Z][a-z]+/,
});

// Define your own World class that extends from ActorWorld
export default class BeckysWorld extends ActorWorld {
  frontend: Server;
  backend: any;

  // Tasks
  public sendChatMessage: SendChatMessage;

  constructor(props: IActorWorldOptions) {
    console.log("WORLD", props);
    super({ ...props, packageType: "module" });
  }
}
setWorldConstructor(BeckysWorld);

Before(async function (this: BeckysWorld) {
  console.log("Before", this);
  if (this.promise) await this.promise;

  // global.foo = "BAR";
  // process.env.foo = "BAR";
  // console.log("env", process.env);

  // getContainer().register("foo");
  const container = createContainer();
  container.register("db", {
    getTeams: () => {
      return {
        T01625HJP6W: { access_token: "token" },
      };
    },
  });
  container.register(
    "pubsub",
    (function () {
      const subscriptions = {};
      return {
        publish: (topic, message) => {
          console.log(">>>> publish", topic, message);
          subscriptions[topic]?.(topic, JSON.parse(message));
          // processMessage(JSON.parse(message), { getDayOfWeek: () => 5 });
        },
        subscribe: (topic, callback) => {
          console.log(">>>> subscribe", topic);
          subscriptions[topic] = callback;

          return () => {
            delete subscriptions[topic];
          };
        },
      };
    })()
  );
  container.register(
    "slack",
    (function () {
      const history = [];
      return {
        getMessages: () => {
          return history;
        },
        postMessage: (message) => {
          console.log("POST MESSAGE", message);
          history.push(message);
        },
      };
    })()
  );

  // if (this.parameters.dbSession == )
  // if (this.parameters.slackSession == )
  if (this.parameters.session === "HttpSessionHandler") {
    const { server } = polka()
      .use(handler)
      .listen(3001, () => {
        console.log("running");
      });

    this.frontend = server;

    this.backend = createHandler();
  }
});

After(async function (this: BeckysWorld) {
  if (this.frontend) {
    this.frontend.close();
  }
  if (this.backend) {
    this.backend.close();
  }
});
