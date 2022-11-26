export const createMock = () => {
  const teams = {
    T01625HJP6W: { access_token: "token" },
  };
  const triggers: any[] = [];

  return {
    getTeams: () => teams,
    getTriggers: () => triggers,
    addTrigger: (trigger: any) => triggers.push(trigger),
  };
};
