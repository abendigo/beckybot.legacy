import type { Action, Actor } from "@cucumber/screenplay";

export type SendChatMessage = (channel: any[], message: string) => Action;
