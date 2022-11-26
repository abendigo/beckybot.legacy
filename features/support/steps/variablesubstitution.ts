import { Given, When, Then } from "@cucumber/cucumber";
import type { Actor } from "@cucumber/screenplay";
import type BeckysWorld from "../world";
import { strict as assert } from "node:assert";
import { getContainer } from "../../../lib/ioc";


Given('the response is {string}', function (string) {
  const container = getContainer();
  const { addTrigger } = container.resolve("db");

  addTrigger({
    trigger: { match: "test trigger", flags: "i" },
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    timeout: 15 * 60,
    responses: ["It's {dayName}"],
    state: { next: 0 },
  });
});


Given('today is Monday', function () {
  const container = getContainer();
  const { setDate } = container.resolve("date");

  setDate("2022-11-28T12:00");
});


When('{actor} triggers the response', async function (
  this: BeckysWorld,
  actor: Actor<BeckysWorld>
) {
  await actor.attemptsTo(this.sendChatMessage([], "test trigger"));
});


Then('{actor} should respond with {string}', async function (this: BeckysWorld, actor: Actor<BeckysWorld>, message: string) {
  const container = getContainer();
  const { getMessages } = container.resolve("slack");

  assert.equal(getMessages()[0]?.text, message);
});