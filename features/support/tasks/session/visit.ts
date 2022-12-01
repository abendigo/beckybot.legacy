import type { Actor } from "@cucumber/screenplay";
import type { ResolveOptions } from "@sveltejs/kit/";
import type { MaybePromise } from "@sveltejs/kit/types/private";

import type { RequestEvent } from "@beckybot/frontend/.svelte-kit/types/src/routes/$types";
import { handle } from "@beckybot/frontend/src/hooks.server";

import type { VisitHtmlPage } from "../types";

export const visit: VisitHtmlPage = (url) => {
  return async (actor: Actor) => {
    const event: RequestEvent = {
      url: url,
    } as RequestEvent;

    const resolve: (
      event: RequestEvent,
      opts?: ResolveOptions
    ) => MaybePromise<Response> = (event, opts) => {
      return new Response(
        `Page Visited: ${event.url.pathname}${
          event.url.pathname.endsWith("/") ? "" : "/"
        }+page.svelte`
      );
    };

    let response = await handle({ event, resolve });

    if (response.status === 303) {
      const path = response.headers.get("location");

      response = await handle({
        event: {
          url: new URL(path),
        } as RequestEvent,
        resolve,
      });
    }

    return response;
  };
};
