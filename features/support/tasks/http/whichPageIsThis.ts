import type { Actor } from "@cucumber/screenplay";
import type { WhichPageIsThis } from "../types";

export const whichPageIsThis: WhichPageIsThis = (response) => {
  return async (actor: Actor) => {
    const link = response.headers.get("link");
    const match = link.match(
      /\/_app\/immutable\/components\/pages([a-z\/]*)_page.svelte/
    );

    return match ? match[1] : "unknown";
  };
};
