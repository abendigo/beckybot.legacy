export function createTeamManager(db) {
  let teams;

  return {
    getTeam: async function(team) {
      if (teams === undefined) {
        try {
          teams = (await db.from('teams')).reduce((map, {id, config}) => {
            map[id] = JSON.parse(config);
            return map;
          }, {});
        } catch (error) {
          console.log('error', error)
        }
      }

      return teams[team];
    }
  };
}

