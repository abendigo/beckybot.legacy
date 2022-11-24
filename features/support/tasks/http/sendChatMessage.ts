import type { Action, Actor } from "@cucumber/screenplay";
// import BeckysWorld from "../../world";
// import { processMessage } from "../../../../backend/src/lib/processMessage";
import type { SendChatMessage } from "../types";

export const sendChatMessage: SendChatMessage = (channel, message) => {
  return async (actor: Actor) => {
    const response = await fetch("http://localhost:3001/slack/event");
  };
};
