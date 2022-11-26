import redis from "redis";

export interface PubSubHandler {
  publish: (topic: string, message: string) => void;
  subscribe: (
    topic: string,
    callback: (topic: string, message: any) => void
  ) => () => void;
}

export function createPubSubHandler(
  hostname: string = "localhost"
): PubSubHandler {
  const client = redis.createClient({ url: `redis://${hostname}:6379` });

  return {
    publish: client.publish,
    subscribe: (topic, callback) => {
      client.on("message", function (topic, message) {
        callback(topic, JSON.parse(message));
      });
      client.subscribe(topic);

      return () => {
        client.unsubscribe(topic);
        client.quit();
      };
    },
  };
}
