export const createMock = () => {
  let mockDate;

  return {
    setDate: (date: string) => {
      mockDate = date;
    },
    now: () => new Date(mockDate) || new Date(),
  };
};
