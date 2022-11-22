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

// Define an {actor} parameter type that creates Actor objects
defineParameterType({
  ...ActorParameterType,
  regexp: /BeckyBot|ChannelUser|A-Z][a-z]+/,
});

// Define your own World class that extends from ActorWorld
export default class BeckysWorld extends ActorWorld {
  server: Server;

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

  // if (this.parameters.dbSession == )
  // if (this.parameters.slackSession == )
  if (this.parameters.session === "HttpSessionHandler") {
    const { server } = polka()
      .use(handler)
      .listen(3001, () => {
        console.log("running");
      });

    this.server = server;
  }
});

After(async function (this: BeckysWorld) {
  if (this.server) {
    this.server.close();
  }
});
