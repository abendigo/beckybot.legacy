import { postMessage } from "../../../lib/_api.js";
import { createDatabaseConnection } from "../../../lib/db.js";
import { getContainer } from "../../../lib/ioc.js";

let timestamps = {};

// let teams;

// export async function getTeams() {
//   let teams;

//   try {
//     console.log("selecting teams");
//     // const db = knex(config);
//     teams = await (
//       await db.from("teams")
//     ).reduce((map, { id, config }) => {
//       console.log("== id, config", { id, config });
//       map[id] = JSON.parse(config);
//       return map;
//     }, {});
//   } catch (error) {
//     console.log("error", error);
//   }

//   return teams;
// }

export async function processMessage(message) {
  console.log("processMessage", { message });

  const container = getContainer();
  const { getTeams, getTriggers } = container.resolve("db");
  const { postMessage } = container.resolve("slack");
  const { now } = container.resolve("date");

  const { event } = message;
  const { channel, subtype, team, text, type, user } = event;

  const triggers = await getTriggers();

  // if (teams === undefined) {
  const teams = await getTeams();
  // try {
  //   console.log("selecting teams");
  //   // const db = knex(config);
  //   teams = await (
  //     await db.from("teams")
  //   ).reduce((map, { id, config }) => {
  //     console.log("== id, config", { id, config });
  //     map[id] = JSON.parse(config);
  //     return map;
  //   }, {});
  // } catch (error) {
  //   console.log("error", error);
  // }
  // }
  console.log("teams", { teams });

  if (type === "app_mention") {
    console.log({ team, teams });
    const token = teams[team].access_token;
    console.log({ token });

    postMessage({ token, channel, text: `Hi <@${user}>` });
  }

  if (type === "message") {
    if (!subtype) {
      console.log({ text });
      for (let next of triggers) {
        // console.log(next);
        if (next.regex === undefined) {
          next.regex = new RegExp(next.trigger.match, next.trigger.flags);
        }
        console.log(next.trigger);
        if (next.regex.test(text)) {
          console.log("match found");

          if (next.daysOfWeek?.length) {
            const today = now();
            const dayOfWeek = new Date(today).getDay();
            console.log(next.daysOfWeek, { dayOfWeek });
            if (!next.daysOfWeek.includes(dayOfWeek)) {
              continue;
            }

            const token = teams[team].access_token;
            const dayName = Intl.DateTimeFormat("en-US", {
              weekday: "long",
            }).format(today);
            // TODO: eventually there will be more than 1 placeholder
            // we'll need a better pattern than chaining .replace() ;p
            const message = next.responses[next.state.next].replace(
              "{dayName}",
              dayName
            );
            next.state.next = (next.state.next + 1) % next.responses.length;

            postMessage({ token, channel, text: message });
          } else {
            const token = teams[team].access_token;
            const message = next.responses[next.state.next];
            next.state.next = (next.state.next + 1) % next.responses.length;

            postMessage({ token, channel, text: message });
          }
        }
      }
    }

    // if (!subtype && happyHumpday.test(text)) {
    //   const team = event.team;
    //   const token = teams[team].access_token;

    //   const now = Date.now();
    //   const dayOfWeek = new Date().getDay();
    //   console.log({dayOfWeek});

    //   if (dayOfWeek === 3) {
    //     await postMessage({ token, channel: event.channel, text: 'https://i.pinimg.com/originals/20/03/15/2003156de252c06c15b90103f2c3d45b.gif' });
    //   }
    // }
    //   }
  }
}
