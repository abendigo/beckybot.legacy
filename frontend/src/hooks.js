// import redis from 'redis';
// import { processMessage } from '$lib/foo';

// import knex from 'knex';
// import { config } from './db/knexfile.js';

// console.log('========================== hooks.js', config);

// const queue = [];

// let teams;
// let publisher;
// let subscriber;
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

// export async function getContext() {
//   console.log('-------------- getContext');
  // if (teams === undefined) {
  //   try {
  //     console.log('selecting teams')
  //     const db = knex(config);
  //     teams = await (await db.from('teams')).reduce((map, {id, config}) => {
  //       map[id] = JSON.parse(config);
  //       return map;
  //     }, {});
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }
/*
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
*/
//   return { teams}
// }

// export function getSession(context) {
//   console.log('getSession', { context });
//   return {};
// }

// export async function handle(request, render) {
//   console.log('handle')
//   return render(request);
// }


export function getContext({ method, host, headers, path, query, body }) {
  console.log('getContext', { method, host, headers, path, query, body });
  return {
    foo: 'bar'
  };
};

export function getSession(context) {
  console.log('getSession', { context })
  return {
    user: {
      name: 'Joe'
    }
  };
}
