import type { DateHandler } from "lib/date";

export interface MockDateHandler extends DateHandler {
  setDate: (date: string) => void;
}
export function createMock(): MockDateHandler {
  let mockDate;

  return {
    setDate: (date) => {
      mockDate = date;
    },
    now: () => new Date(mockDate) || new Date(),
  };
}
