export interface DateHandler {
  now: () => Date;
}

export function createDateHandler(): DateHandler {
  return {
    now: () => new Date(),
  };
}
