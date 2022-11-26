export const createMock = () => {
  const history: any[] = [];

  return {
    getMessages: () => {
      return history;
    },
    postMessage: (message: any) => {
      history.push(message);
    },
  };
};
