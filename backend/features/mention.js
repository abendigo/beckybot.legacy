import assert from 'assert/strict';
import { Given, When, Then } from '@cucumber/cucumber';

import { createMessageConsumer } from '../src/lib/consumer.js';

function createEventPayload({ channel = 'general', team = 'team', type, ...rest }) {
  return {
    event: {
      channel,
      team,
      type,
      ...rest
    }
  };
}

function createAppMentionPayload (user) {
  return createEventPayload({ type: 'app_mention', user });
}

function createUserMessagePayload({user, message}) {
  return createEventPayload({ type: 'message', user, text: message });
}

Given('@{word} has joined a slack channel', function (botUser) {
  // console.log({botUser, this: this} );
});

let response;

const messageProducer = {
  postMessage: function({ token, text }) {
    response = text;
  }
};

const tables = {
  'teams': [{id: 'team', config: JSON.stringify({access_token: 'tokxxen'})}],
  'triggers': [
    // {regex: { match: '^Happy F(ri|ir)day*', flags: 'i' }, daysOfWeek: [4], timeout: 15 * 60, responses: []},
    {trigger: { match: '^Happy F(ri|ir)day*', flags: 'i' }, responses: [
      'And a Happy Friday to you too! Enjoy the original video, the one that started it all! https://www.youtube.com/watch?v=kfVsfOSbJY0',
      'Looking forward to that weekend! Here\'s one with Lyrics: https://www.youtube.com/watch?v=DPVTl9K0lqc',
      'Thanks! Celebrate with the new remix! https://www.youtube.com/watch?v=iCFOcqsnc9Y',
      'You too! Here\'s a cover by Katy Perry. https://www.youtube.com/watch?v=sM51ANnSgsU',
      'For all the metal fans. https://www.youtube.com/watch?v=9mHDAYutrC0',
      'It\'s Death Metal Friday! https://www.youtube.com/watch?v=pi00ykRg_5c',
      'Something a little different this time. Annoying Orange! https://www.youtube.com/watch?v=akT0wxv9ON8',
      'Did you know Rebecca Black has some other songs too? Here\'s Girlfriend: https://www.youtube.com/watch?v=pEy5x-vTH4g'
    ], state: { next: 0 }},
    {trigger: { match: '^Happy Humpday*', flags: 'i' }, responses: [
      'https://i.pinimg.com/originals/20/03/15/2003156de252c06c15b90103f2c3d45b.gif'
    ], state: { next: 0 }}
  ]
};

const db = {
  from: (table) => {
    return tables[table];
  }
}

When('@{word} mentions @{word}', async function (user, botUser) {
  const { processMessage } = createMessageConsumer({ db, messageProducer });

  response = undefined;
  try {
    await processMessage(createAppMentionPayload(user));
  } catch (error) {
    console.log('error', error);
  }
});

When('@{word} says {string}', async function (user, message) {
  const { processMessage } = createMessageConsumer({ db, messageProducer });

  response = undefined;
  try {
    await processMessage(createUserMessagePayload({user, message}));
  } catch (error) {
    console.log('error', error);
  }
});

Then('@{word} should respond with {string}', function (botUser, expected) {
  assert.equal(response, expected);
});

Then('@{word} should respond with a YouTube link', function (botUser) {
  assert.match(response, /https:\/\/www.youtube.com\//);
});

Then('@{word} should respond with a GIF', function (botUser) {
  assert.match(response, /.gif/);
});
