import { getContainer } from "@beckybot/lib/ioc";
import type { PubSubHandler } from "@beckybot/lib/pubsub";

import { processMessage } from "./lib/processMessage";

export const createHandler = () => {
  const { subscribe } = getContainer().resolve<PubSubHandler>("pubsub");

  const unsubscribe = subscribe("EVENTS", function (topic, message) {
    try {
      processMessage(message);
    } catch (error) {
      console.log("XXXX ERROR XXXX", error);
    }
  });

  return {
    close: () => {
      unsubscribe();
    },
  };
};
