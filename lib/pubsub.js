import redis from "redis";

let publisher;

const hostname = "redis";

export function publish(topic, message) {
  if (publisher === undefined) {
    publisher = redis.createClient({ url: `redis://${hostname}:6379` });
  }

  publisher.publish(topic, JSON.stringify(message));
}

export function subscribe(topic, callback) {
  const subscriber = redis.createClient({ url: `redis://${hostname}:6379` });

  subscriber.on("message", function (channel, message) {
    callback(channel, JSON.parse(message));
  });
  subscriber.subscribe(topic);

  return () => {
    console.log("unsubscribe", topic);
    subscriber.unsubscribe(topic);
    subscriber.quit();
  };
}
