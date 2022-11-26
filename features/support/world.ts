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
  container.register(
    "date",
    (function () {
      let mockDate;
      return {
        setDate: (date: string) => {
          mockDate = date;
        },
        now: () => new Date(mockDate) || new Date()
      }
    })()
  );
  container.register(
    "db",
    (function () {
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
      ];

      return {
        getTeams: () => {
          return {
            T01625HJP6W: { access_token: "token" },
          };
        },
        getTriggers: async () => triggers,
        addTrigger: async (trigger) => triggers.push(trigger),
      };
    })()
  );
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
