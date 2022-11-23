import redis from "redis";

/**
 * @param {string} hostname
 */
export function createPublisher(hostname) {
  return redis.createClient({ url: `redis://${hostname}:6379` });
}

export function subscribe(hostname, topic, callback) {
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
