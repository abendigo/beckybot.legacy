import type { Actor } from "@cucumber/screenplay";
import type { SendChatMessage } from "../types";
import { processMessage } from "@beckybot/backend/src/lib/processMessage";

export const sendChatMessage: SendChatMessage = (channel, message) => {
  return (actor: Actor) => {
    processMessage({
      event: {
        type: "message",
        text: message,
        user: actor.name,
        team: "T01625HJP6W",
      },
      type: "event_callback",
    });
  };
};
