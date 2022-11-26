// Dead simple Dependency Injection.

interface Dependencies {
  [key: string]: any;
}

interface DependencyContainer {
  register: (key: string, value: any) => void;
  resolve: (key: string) => any;
}

declare global {
  var container: DependencyContainer;
}

export function createContainer(xxx: Dependencies = {}) {
  global.container = (function create(): DependencyContainer {
    const dependencies: Dependencies = xxx;

    return {
      register: function (key: string, value: any) {
        dependencies[key] = value;
      },
      resolve: function (key: string) {
        return dependencies[key];
      },
    };
  })();

  return global.container;
}

export function getContainer(): DependencyContainer {
  return global.container;
}
