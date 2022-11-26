import { processMessage } from "./lib/processMessage.js";
import { getContainer } from "../../lib/ioc.js";

export const createHandler = () => {
  const { subscribe } = getContainer().resolve("pubsub");

  const unsubscribe = subscribe("EVENTS", function (topic, message) {
    try {
      console.log("subscribe", topic);
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