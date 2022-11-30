import type { DynamicEnvHandler } from "lib/env";

export interface MockEnvHandler extends DynamicEnvHandler {
  set: (key: string, value: string) => void;
}

export function createMock() {
  const env = {};

  return {
    get: (key) => env[key],
    set: (key, value) => {
      env[key] = value;
    },
  };
}
