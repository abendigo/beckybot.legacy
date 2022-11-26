import { strict as assert } from "node:assert";

import { Given, When, Then, Before } from "@cucumber/cucumber";
import type { Actor } from "@cucumber/screenplay";

import type BeckysWorld from "../world";
import { getContainer } from "../../../lib/ioc";

Given(
  "{actor} has joined a slack channel",
  async function (this: BeckysWorld, actor: Actor<BeckysWorld>) {
    const container = getContainer();
    const { addTrigger } = container.resolve("db");

    addTrigger({
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
    });
    addTrigger({
      trigger: { match: "^Happy Humpday*", flags: "i" },
      // daysOfWeek: [0, 3],
      timeout: 15 * 60,
      responses: [
        "https://i.pinimg.com/originals/20/03/15/2003156de252c06c15b90103f2c3d45b.gif",
      ],
      state: { next: 0 },
    });
  }
);

Given("today is Friday", async function () {
  const container = getContainer();
  const { setDate } = container.resolve("date");

  setDate("2022-11-25T12:00");
});

When(
  "{actor} mentions @{actor}",
  async function (
    this: BeckysWorld,
    speaker: Actor<BeckysWorld>,
    target: Actor<BeckysWorld>
  ) {
    await speaker.attemptsTo(this.mention(target));
    // return "pending";
  }
);

When(
  "{actor} says {string}",
  async function (
    this: BeckysWorld,
    actor: Actor<BeckysWorld>,
    message: string
  ) {
    await actor.attemptsTo(this.sendChatMessage([], message));
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
