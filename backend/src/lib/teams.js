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



/*
 return knex('teams').insert([
    {
      id: 'T02NS2GUX',
      config: JSON.stringify({
        ok: true,
        app_id: 'A01RHLGBQNT',
        authed_user: { id: 'U02NS2GV5' },
        scope: 'chat:write,channels:read,app_mentions:read,channels:history',
        token_type: 'bot',
        access_token: 'xoxb-2774084983-1888643010068-NIlE7U13DVbXL2KhK5mKk5I4',
        bot_user_id: 'U01S4JX0A20',
        team: { id: 'T02NS2GUX', name: 'Oosterveld Family' },
        enterprise: null,
        is_enterprise_install: false
      })
    },
    {
      id: 'T01625HJP6W',
      config: JSON.stringify({
        ok: true,
        app_id: 'A01RHLGBQNT',
        authed_user: { id: 'U0162BRSYJX' },
        scope: 'app_mentions:read,channels:history,channels:read,chat:write',
        token_type: 'bot',
        access_token: 'xoxb-1206187635234-1915601940608-LnlXbdrNTAa6EZLHolEIOhCB',
        bot_user_id: 'U01SXHPTNHW',
        team: { id: 'T01625HJP6W', name: 'ex-customizers' },
        enterprise: null,
        is_enterprise_install: false
      })
    }
  ]);
  */
