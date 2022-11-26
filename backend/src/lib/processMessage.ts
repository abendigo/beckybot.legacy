import { getContainer } from "@beckybot/lib/ioc";

import type { DataHandler } from "@beckybot/lib/db";
import type { DateHandler } from "@beckybot/lib/date";
import type { SlackHandler } from "@beckybot/lib/slack";

export async function processMessage(message) {
  const { resolve } = getContainer();

  const { getTeams, getTriggers } = resolve<DataHandler>("db");
  const { postMessage } = resolve<SlackHandler>("slack");
  const { now } = resolve<DateHandler>("date");

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
