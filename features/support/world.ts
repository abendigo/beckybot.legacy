import {
  defineParameterType,
  setWorldConstructor,
  Before,
  BeforeAll,
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
  constructor(props: IActorWorldOptions) {
    console.log("WORLD", props);
    super({ ...props, packageType: "module" });
  }
}
setWorldConstructor(BeckysWorld);

BeforeAll(async function (this: BeckysWorld) {
  console.log("BeforeAll", this);
});

Before(async function (this: BeckysWorld) {
  console.log("Before", this);
  if (this.promise) await this.promise;

  // if (this.parameters.dbSession == )
  if (this.parameters.session === )
});
