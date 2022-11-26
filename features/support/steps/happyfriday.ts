import { Given, When, Then, Before } from "@cucumber/cucumber";
import type { Actor } from "@cucumber/screenplay";
import type BeckysWorld from "../world";
import { strict as assert } from "node:assert";
import { processMessage } from "../../../backend/src/lib/processMessage";
import { getContainer } from "../../../lib/ioc";
// import { processMessage } from "$workspace/backend/src/lib/processMessage.js";

// Given("botUser has joined a slack channel", function () {
//   // Write code here that turns the phrase above into concrete actions
//   // return "pending";
// });

Given(
  "{actor} has joined a slack channel",
  async function (this: BeckysWorld, actor: Actor<BeckysWorld>) {
    // Write code here that turns the phrase above into concrete actions
    // return "pending";
  }
);

Given("today is Friday", function () {
  const container = getContainer();
  const { setDate } = container.resolve("date");

  setDate("2022-11-25T12:00");
});

let channel = [];
Before(() => {
  channel = [];
});

When(
  "{actor} says {string}",
  async function (
    this: BeckysWorld,
    actor: Actor<BeckysWorld>,
    message: string
  ) {
    await actor.attemptsTo(this.sendChatMessage(channel, message));
  }
);

Then(
  "{actor} should respond with a YouTube link",
  async function (this: BeckysWorld, actor: Actor<BeckysWorld>) {
    const container = getContainer();
    const { getMessages } = container.resolve("slack");

    assert.match(getMessages()[0]?.text, /www\.youtube\.com/);
    // assert.match(channel[0]?.text, /www\.youtube\.com/);
  }
);

Then(
  "{actor} should respond with a GIF",
  async function (this: BeckysWorld, actor: Actor<BeckysWorld>) {
    const container = getContainer();
    const { getMessages } = container.resolve("slack");

    assert.match(getMessages()[0]?.text, /\.gif/);
    // assert.match(channel[0]?.text, /\.gif/);
  }
);
