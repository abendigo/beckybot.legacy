import type { Actor } from "@cucumber/screenplay";
import { processMessage } from "@beckybot/backend/src/lib/processMessage";
import type { Mention } from "../types";

export const mention: Mention = () => {
  return (actor: Actor) => {
    processMessage({
      event: {
        type: "app_mention",
        user: actor.name,
        team: "T01625HJP6W",
      },
      type: "event_callback",
    });
  };
};
