// @ts-nocheck
// Dead simple Dependency Injection.

export function createContainer(dependencies = {}) {
  global.dependencies = dependencies;

  global.container = {
    register: function (key /* : string */, value) {
      global.dependencies[key] = value;
    },
    resolve: function (key /* : string */) {
      return global.dependencies[key];
    },
  };

  return global.container;
}

export function getContainer() {
  return global.container;
}
