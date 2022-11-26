export const createMock = () => {
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
};
