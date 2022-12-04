// Dead simple Dependency Injection.

interface Factory {
  (): any;
}

interface Dependencies {
  [key: string]: { factory: Factory; handler?: any };
}

interface DependencyContainer {
  // register: (key: string, factory: () => any) => void;
  resolve: <T>(key: string) => T;
}

declare global {
  var container: DependencyContainer;
}

export function createContainer(factories: { [key: string]: Factory } = {}) {
  global.container = (function create(): DependencyContainer {
    const dependencies: Dependencies = Object.fromEntries(
      Object.entries(factories).map(([key, factory]) => [
        key,
        { factory: factory },
      ])
    );

    return {
      // register: function (key, handler) {
      //   dependencies[key] = handler;
      // },
      resolve: function (key) {
        if (!dependencies[key].handler)
          dependencies[key].handler = dependencies[key].factory();
        return dependencies[key].handler;
      },
    };
  })();

  return global.container;
}

export function getContainer(): DependencyContainer {
  return global.container;
}
