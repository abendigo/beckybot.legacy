import type { SlackHandler } from "lib/slack";

export interface MockSlackHandler extends SlackHandler {
  getMessages: () => any[];
}

export function createMock(): MockSlackHandler {
  const history: any[] = [];

  return {
    getAccessToken: async () => {},
    getMessages: () => {
      return history;
    },
    postMessage: async (message: any) => {
      history.push(message);
    },
  };
}
