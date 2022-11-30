import type { Server } from "http";
import polka from "polka";

import {
  defineParameterType,
  setWorldConstructor,
  Before,
  After,
} from "@cucumber/cucumber";
import {
  ActorWorld,
  ActorParameterType,
  type IActorWorldOptions,
} from "@cucumber/screenplay";
// import type { IActorWorldOptions } from "@cucumber/screenplay";

import { createHandler } from "@beckybot/backend/src/handler";
import { handler } from "@beckybot/frontend/build/handler";
import { createContainer } from "@beckybot/lib/ioc";

import { createMock as createDateMock } from "./mocks/date";
import { createMock as createDBMock } from "./mocks/db";
import { createMock as createEnvMock } from "./mocks/env";
import { createMock as createPubSubMock } from "./mocks/pubsub";
import { createMock as createSlackMock } from "./mocks/slack";

import type { Mention, SendChatMessage, VisitHtmlPage } from "./tasks/types";

// Define an {actor} parameter type that creates Actor objects
defineParameterType({
  ...ActorParameterType,
  regexp: /BeckyBot|ChannelUser|[A-Z][a-z]+/,
});

// Define your own World class that extends from ActorWorld
export default class BeckysWorld extends ActorWorld {
  frontend: Server;
  backend: any;

  // Tasks
  public mention: Mention;
  public sendChatMessage: SendChatMessage;
  public visit: VisitHtmlPage;

  constructor(props: IActorWorldOptions) {
    super({ ...props, packageType: "module" });
  }
}
setWorldConstructor(BeckysWorld);

Before(async function (this: BeckysWorld) {
  if (this.promise) await this.promise;

  const container = createContainer({
    env: createEnvMock(),

    date: createDateMock(),
    db: createDBMock(),
    pubsub: createPubSubMock(),
    slack: createSlackMock(),
  });

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
