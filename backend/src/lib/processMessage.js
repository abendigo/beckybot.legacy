import { getContainer } from "../../../lib/ioc.js";

export async function processMessage(message) {
  const container = getContainer();
  const { getTeams, getTriggers } = container.resolve("db");
  const { postMessage } = container.resolve("slack");
  const { now } = container.resolve("date");

  const { event } = message;
  const { channel, subtype, team, text, type, user } = event;

  const triggers = await getTriggers();
  const teams = await getTeams();

  if (type === "app_mention") {
    const token = teams[team].access_token;

    postMessage({ token, channel, text: `Hi <@${user}>` });
  }

  if (type === "message") {
    if (!subtype) {
      for (let next of triggers) {
        if (next.regex === undefined) {
          next.regex = new RegExp(next.trigger.match, next.trigger.flags);
        }
        if (next.regex.test(text)) {
          if (next.daysOfWeek?.length) {
            const today = now();
            const dayOfWeek = new Date(today).getDay();
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
  }
}
