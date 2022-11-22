import { Given, When, Then, Before } from "@cucumber/cucumber";
import type { Actor } from "@cucumber/screenplay";
import type BeckysWorld from "../world";
import { strict as assert } from "node:assert";
import { processMessage } from "../../../backend/src/lib/processMessage";
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

Given("today is Friday", function () {});

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
    assert.match(channel[0]?.text, /www\.youtube\.com/);
  }
);

Then(
  "{actor} should respond with a GIF",
  async function (this: BeckysWorld, actor: Actor<BeckysWorld>) {
    assert.match(channel[0]?.text, /\.gif/);
  }
);
