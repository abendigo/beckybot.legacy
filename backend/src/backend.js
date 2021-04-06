import { subscribe } from '@beckybot/lib/pubsub.js';
import { processMessage } from './lib/consumer.js';

// Nodemon sends SIGUSR2 before it restarts.
process.once('SIGUSR2', function () {
  console.log('shutting down');
  unsubscribe();

  process.kill(process.pid, 'SIGUSR2');
});

let unsubscribe = subscribe('EVENTS', function(channel, message) {
  try {
    console.log('subscribe', channel)
    processMessage(message);
  } catch (error) {
    console.log('XXXXSX ERROR XXXX', error)
  }
});
