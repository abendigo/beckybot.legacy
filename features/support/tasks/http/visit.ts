import type { Actor } from "@cucumber/screenplay";
import type { VisitHtmlPage } from "../types";

export const visit: VisitHtmlPage = (url) => {
  return async (actor: Actor) => {
    return await fetch(url.toString());
  };
};
