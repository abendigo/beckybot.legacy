import assert from 'assert/strict';
import { Given, When, Then } from '@cucumber/cucumber';

import { createMessageConsumer } from '../src/lib/consumer.js';

function createEventPayload() {
  // return {
  //   event: {
  //     channel: 'general',
  //     team: 'team',
  //   }
  // };
}

function createAppMentionPayload (user) {
  return {
    event: {
      channel: 'general',
      team: 'team',

      type: 'app_mention',

      user
    }
  };
}

function createUserMessagePayload({user, message}) {
  return {
    event: {
      channel: 'general',
      team: 'team',

      type: 'message',

      user,
      text: message
    }
  };
}

Given('@{word} has joined a slack channel', function (botUser) {
  console.log({botUser, this: this} );
});

let response;

const messageProducer = {
  postMessage: function({ text }) {
    response = text;
  }
};

const teamManager = {
  getTeam: function(team) {
    return {
      access_token: 'token'
    };
  }
}

When('@{word} mentions @{word}', async function (user, botUser) {
  const { processMessage } = createMessageConsumer({ messageProducer, teamManager });

  response = undefined;
  try {
    await processMessage(createAppMentionPayload(user));
  } catch (error) {
    console.log('error', error);
  }
});

When('@{word} says {string}', async function (user, message) {
  const { processMessage } = createMessageConsumer({ messageProducer, teamManager });

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
