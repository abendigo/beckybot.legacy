import type { Actor } from "@cucumber/screenplay";
import type { WhichPageIsThis } from "../types";

export const whichPageIsThis: WhichPageIsThis = (response) => {
  return async (actor: Actor) => {
    const text = await response.text();
    const match = text.match(/^Page Visited: ([a-z\/]*)\+page.svelte$/);

    return match ? match[1] : "unknown";
  };
};
