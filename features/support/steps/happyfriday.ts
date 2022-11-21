import { Given, When, Then } from "@cucumber/cucumber";
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

const channel = [];

When(
  "{actor} says {string}",
  async function (this: BeckysWorld, actor: Actor<BeckysWorld>, string) {
    // Write code here that turns the phrase above into concrete actions
    // await actor.attemptsTo()
    const getTeams = () => {
      return {
        T01625HJP6W: { access_token: "token" },
      };
    };

    const getDayOfWeek = () => {
      return 5;
    };

    const postMessage = (props) => {
      console.log("POST MESSAGE", this, { actor, props });
      channel.push(props);
      // actor.remember("heard", props);
      // console.log("AFTER", actor);
    };

    processMessage(
      {
        token: "OF28yWOyUjIicRGftxbXt75A",
        team_id: "T01625HJP6W",
        api_app_id: "A01RHLGBQNT",
        event: {
          client_msg_id: "a3db4bdb-05a0-43d5-a269-bae1929700bf",
          type: "message",
          text: "Happy Friday!",
          user: "U015VN7G0QN",
          ts: "1668863631.085569",
          blocks: ["[Object]"],
          team: "T01625HJP6W",
          channel: "C0160PT5U9K",
          event_ts: "1668863631.085569",
          channel_type: "channel",
        },
        type: "event_callback",
        event_id: "Ev04BM0WASLD",
        event_time: 1668863631,
        authorizations: [
          {
            enterprise_id: null,
            team_id: "T01625HJP6W",
            user_id: "U01SXHPTNHW",
            is_bot: true,
            is_enterprise_install: false,
          },
        ],
        is_ext_shared_channel: false,
        event_context:
          "4-eyJldCI6Im1lc3NhZ2UiLCJ0aWQiOiJUMDE2MjVISlA2VyIsImFpZCI6IkEwMVJITEdCUU5UIiwiY2lkIjoiQzAxNjBQVDVVOUsifQ",
      },
      { getTeams, getDayOfWeek, postMessage }
    );

    // return "pending";
  }
);

Then(
  "{actor} should respond with a YouTube link",
  async function (this: BeckysWorld, actor: Actor<BeckysWorld>) {
    assert.match(channel[0]?.text, /www\.youtube\.com/);
    // Write code here that turns the phrase above into concrete actions
    // return "pending";
  }
);
