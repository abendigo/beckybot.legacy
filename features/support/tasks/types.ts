import type { Action, Actor } from "@cucumber/screenplay";
import type BeckysWorld from "../world";

export type Mention = (target: Actor) => Action<void, BeckysWorld>;
export type SendChatMessage = (
  channel: any[],
  message: string
) => Action<void, BeckysWorld>;
export type VisitHtmlPage = (
  url: URL
) => Action<Promise<Response>, BeckysWorld>;
