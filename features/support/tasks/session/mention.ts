import type { Actor } from "@cucumber/screenplay";
import type { Mention } from "../types";
import { processMessage } from "../../../../backend/src/lib/processMessage";

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
