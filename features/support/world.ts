import {
  defineParameterType,
  setWorldConstructor,
  Before,
} from "@cucumber/cucumber";
import { ActorWorld, ActorParameterType } from "@cucumber/screenplay";
import type { IActorWorldOptions } from "@cucumber/screenplay";

// Define an {actor} parameter type that creates Actor objects
defineParameterType({
  ...ActorParameterType,
  regexp: /BeckyBot|ChannelUser|A-Z][a-z]+/,
});

// Define your own World class that extends from ActorWorld
export default class BeckysWorld extends ActorWorld {
  // constructor(props: IActorWorldOptions) {
  //   super({ ...props, packageType: "module" });
  // }
}
setWorldConstructor(BeckysWorld);

// Before(async function (this: BeckysWorld) {
//   if (this.promise) await this.promise;
// });
