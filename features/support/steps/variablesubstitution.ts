import { strict as assert } from "node:assert";

import { Given, When, Then } from "@cucumber/cucumber";
import type { Actor } from "@cucumber/screenplay";

import { getContainer } from "@beckybot/lib/ioc";
import type { DataHandler } from "@beckybot/lib/db";

import type BeckysWorld from "../world";
import type { MockDateHandler } from "../mocks/date";
import type { MockSlackHandler } from "../mocks/slack";

Given("the response is {string}", function (string) {
  const container = getContainer();
  const { addTrigger } = container.resolve<DataHandler>("db");

  addTrigger({
    trigger: { match: "test trigger", flags: "i" },
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    timeout: 15 * 60,
    responses: ["It's {dayName}"],
    state: { next: 0 },
  });
});

Given("today is Monday", function () {
  const container = getContainer();
  const { setDate } = container.resolve<MockDateHandler>("date");

  setDate("2022-11-28T12:00");
});

When(
  "{actor} triggers the response",
  async function (this: BeckysWorld, actor: Actor<BeckysWorld>) {
    await actor.attemptsTo(this.sendChatMessage([], "test trigger"));
  }
);

Then(
  "{actor} should respond with {string}",
  async function (
    this: BeckysWorld,
    actor: Actor<BeckysWorld>,
    message: string
  ) {
    const container = getContainer();
    const { getMessages } = container.resolve<MockSlackHandler>("slack");

    assert.equal(getMessages()[0]?.text, message);
  }
);
