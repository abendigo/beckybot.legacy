export interface DynamicEnvHandler {
  get: (key: string) => string;
}

export function createDynamicEnvHandler(env: any): DynamicEnvHandler {
  return {
    get: (key) => process.env[key],
  };
}
