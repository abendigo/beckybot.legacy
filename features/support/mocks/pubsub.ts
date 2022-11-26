import type { PubSubHandler } from "lib/pubsub";

export function createMock(): PubSubHandler {
  const subscriptions = {};

  return {
    publish: (topic: string, message: string) => {
      subscriptions[topic]?.(topic, JSON.parse(message));
    },
    subscribe: (topic: string, callback) => {
      subscriptions[topic] = callback;

      return () => {
        delete subscriptions[topic];
      };
    },
  };
}
