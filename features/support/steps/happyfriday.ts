import { strict as assert } from "node:assert";

import { Given, When, Then } from "@cucumber/cucumber";
import type { Actor } from "@cucumber/screenplay";

import { getContainer } from "@beckybot/lib/ioc";
import type { DataHandler } from "@beckybot/lib/db";

import type BeckysWorld from "../world";
import type { MockDateHandler } from "../mocks/date";
import type { MockSlackHandler } from "../mocks/slack";
import type { MockEnvHandler } from "../mocks/env";

Given(
  "{actor} has joined a slack channel",
  async function (this: BeckysWorld, actor: Actor<BeckysWorld>) {
    const container = getContainer();
    const { addTrigger } = container.resolve<DataHandler>("db");
    const { set } = getContainer().resolve<MockEnvHandler>("env");

    set("SLACK_CLIENT_ID", "i'm a client");
    set("SLACK_CLIENT_SECRET", "it's a secret");

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
  const { setDate } = container.resolve<MockDateHandler>("date");

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
    const { getMessages } = container.resolve<MockSlackHandler>("slack");

    assert.match(getMessages()[0]?.text, /www\.youtube\.com/);
  }
);

Then(
  "{actor} should respond with a GIF",
  async function (this: BeckysWorld, actor: Actor<BeckysWorld>) {
    const container = getContainer();
    const { getMessages } = container.resolve<MockSlackHandler>("slack");

    assert.match(getMessages()[0]?.text, /\.gif/);
  }
);
