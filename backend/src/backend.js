import { subscribe } from './lib/pubsub.js';
import { processMessage } from './lib/consumer.js';

console.log('backend.js');


process.once('SIGUSR2', function () {
  console.log('shutting down');
  unsubscribe();

  process.kill(process.pid, 'SIGUSR2');
});

let unsubscribe = subscribe('EVENTS', function(channel, message) {
  console.log('subscribe', channel)
  processMessage(message);
});
