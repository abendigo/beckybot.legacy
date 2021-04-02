import redis from 'redis';
import { processMessage } from '$lib/foo';

console.log('========================== hooks.js');

// const queue = [];

let publisher;
let subscriber;
// const pubsub = {
//   publish: (topic, message) => {
//     console.log('publish', { topic });
//     publisher.publish(topic, JSON.stringify(message));
//   },
//   subscribe: (topic, callback) => {
//     // client.on('xxx', function(channe, message) {
//     //   console.log('subscribe', { channel, message });
//     // })
//   }
// };

// function startup() {
//   console.log('startup');
//   client = redis.createClient({ host: 'redis '});

// }

// startup();

export function getContext() {
  console.log('-------------- getContext');
  if (publisher === undefined) {
    console.log('publisher created')
    publisher = redis.createClient({ url: 'redis://redis:6379'});
  }
  if (subscriber === undefined) {
    console.log('subscriber created')
    subscriber = redis.createClient({ url: 'redis://redis:6379'});
    subscriber.on('message', function(channel, message) {
      // console.log('on', { channel, message });
      processMessage(channel, message);
    });
    subscriber.subscribe('EVENTS');
  }

  // console.log('return', { pubsub, queue})
  return { publisher };
}

export function getSession(context) {
  console.log('getSession', { context });
  return {};
}

export async function handle(request, render) {
  console.log('handle')
  return render(request);
}
