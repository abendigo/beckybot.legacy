import type { PageServerLoad } from './$types';
import { db } from "@abendigo/beckybot/db.js";

export const load: PageServerLoad = async (/* { params } */) => {

  const teams = (await db.from("teams")).reduce((map, {id, config}) => {
    map[id] = JSON.parse(config);
    return map;
  }, {});

  console.log({teams})

  const data = Object.values(teams).map(next => next.team);

  return {
    teams: data
  };
}
