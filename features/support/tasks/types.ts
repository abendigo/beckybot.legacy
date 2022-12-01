import type { Action, Actor } from "@cucumber/screenplay";
// import type BeckysWorld from "../world";

export type Mention = (target: Actor) => Action<void>;
export type SendChatMessage = (channel: any[], message: string) => Action<void>;
export type VisitHtmlPage = (url: URL) => Action<Promise<Response>>;

export type WhichPageIsThis = (response: Response) => Action<Promise<string>>;
