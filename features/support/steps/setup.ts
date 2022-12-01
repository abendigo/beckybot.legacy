import { strict as assert } from "node:assert";

import { Given, When, Then } from "@cucumber/cucumber";
import type { Actor } from "@cucumber/screenplay";

import { getContainer } from "@beckybot/lib/ioc";
import type { DataHandler } from "@beckybot/lib/db";

import type BeckysWorld from "../world";
import type { MockDateHandler } from "../mocks/date";
import type { MockSlackHandler } from "../mocks/slack";
import type { MockEnvHandler } from "../mocks/env";

Given("missing setup", function () {
  // Write code here that turns the phrase above into concrete actions
  // return 'pending';
});

Given("complete setup", function () {
  const { set } = getContainer().resolve<MockEnvHandler>("env");

  set("SLACK_CLIENT_ID", "i'm a client");
  set("SLACK_CLIENT_SECRET", "it's a secret");
});

When(
  "{actor} loads the application",
  async function (this: BeckysWorld, actor: Actor<BeckysWorld>) {
    const response = await actor.attemptsTo(
      this.visit(new URL("http://localhost:3001/"))
    );

    actor.remember("visited", response);
  }
);

Then(
  "{actor} should see some setup instructions",
  async function (this: BeckysWorld, actor: Actor<BeckysWorld>) {
    const response = actor.recall<Response>("visited");
    const visited = await actor.ask(this.whichPageIsThis(response));

    assert.equal(response.status, 200);
    assert.equal(visited, "/setup/");
  }
);

Then(
  "{actor} should see the home page",
  async function (this: BeckysWorld, actor: Actor<BeckysWorld>) {
    const response = actor.recall<Response>("visited");
    const visited = await actor.ask(this.whichPageIsThis(response));

    assert.equal(response.status, 200);
    assert.equal(visited, "/");
  }
);
