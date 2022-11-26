// Dead simple Dependency Injection.

interface Dependencies {
  [key: string]: any;
}

interface DependencyContainer {
  register: (key: string, handler: any) => void;
  resolve: <T>(key: string) => T;
}

declare global {
  var container: DependencyContainer;
}

export function createContainer(xxx: Dependencies = {}) {
  global.container = (function create(): DependencyContainer {
    const dependencies: Dependencies = xxx;

    return {
      register: function (key, handler) {
        dependencies[key] = handler;
      },
      resolve: function (key) {
        return dependencies[key];
      },
    };
  })();

  return global.container;
}

export function getContainer(): DependencyContainer {
  return global.container;
}
