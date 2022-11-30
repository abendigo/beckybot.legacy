import type { DataHandler } from "lib/db";

export function createMock(): DataHandler {
  const teams = {
    T01625HJP6W: { access_token: "token" },
  };
  const triggers: any[] = [];

  return {
    getTeams: async () => teams,
    addTeam: async ({ id, config }) => {
      teams[id] = config;
    },
    getTriggers: async () => triggers,
    addTrigger: async (trigger: any) => {
      triggers.push(trigger);
    },
  };
}
