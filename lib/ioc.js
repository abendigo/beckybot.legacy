// @ts-nocheck
// Dead simple Dependency Injection.

// let container;
// const dependencies = {};

export function createContainer() {
  global.dependencies = {};

  global.container = {
    register: function (key /* : string */, value) {
      console.log("register dependency for", key);
      global.dependencies[key] = value;
    },
    resolve: function (key /* : string */) {
      console.log("resolve dependency for", key);
      return global.dependencies[key];
    },
  };

  return global.container;
}

export function getContainer() {
  console.log(">>>>>>  GET CONTAINER", global.dependencies);
  return global.container;
}
