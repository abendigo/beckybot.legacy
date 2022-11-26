import type { Actor } from "@cucumber/screenplay";
import type { Mention } from "../types";

export const mention: Mention = () => {
  return async (actor: Actor) => {
    await fetch("http://localhost:3001/slack/events", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: {
          type: "app_mention",
          user: actor.name,
          team: "T01625HJP6W",
        },
        type: "event_callback",
      }),
    });
  };
};
