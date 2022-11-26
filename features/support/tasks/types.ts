import type { Action, Actor } from "@cucumber/screenplay";

export type Mention = (target: Actor) => Action;
export type SendChatMessage = (channel: any[], message: string) => Action;
