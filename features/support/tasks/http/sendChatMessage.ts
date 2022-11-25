import type { Action, Actor } from "@cucumber/screenplay";
// import BeckysWorld from "../../world";
// import { processMessage } from "../../../../backend/src/lib/processMessage";
import type { SendChatMessage } from "../types";

export const sendChatMessage: SendChatMessage = (channel, message) => {
  return async (actor: Actor) => {
    console.log(">>>>>> BEFORE FETCH");
    const response = await fetch("http://localhost:3001/slack/events", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: "OF28yWOyUjIicRGftxbXt75A",
        team_id: "T01625HJP6W",
        api_app_id: "A01RHLGBQNT",
        event: {
          client_msg_id: "a3db4bdb-05a0-43d5-a269-bae1929700bf",
          type: "message",
          text: message, // "Happy Friday!",
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
      }),
    });
    console.log(">>>>>> AFTER FETCH");
  };
};
