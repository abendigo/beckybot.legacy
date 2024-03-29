import type { Actor } from "@cucumber/screenplay";
import type { SendChatMessage } from "../types";

export const sendChatMessage: SendChatMessage = (channel, message) => {
  return async (actor: Actor) => {
    await fetch("http://localhost:3001/slack/events", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: {
          type: "message",
          text: message,
          user: actor.name,
          team: "T01625HJP6W",
        },
        type: "event_callback",
      }),
    });
  };
};
