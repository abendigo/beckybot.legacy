import path from "path";
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const common = {
  import: ["features/support/steps/*.ts", "features/support/world.ts"],
};

export default {
  ...common,
  worldParameters: {
    tasks: path.join(__dirname, "features/support/tasks/session"),
    // tasks: "./features/support/tasks/session",
    session: "DomainSession",
  },
};

export const http = {
  ...common,
  worldParameters: {
    tasks: path.join(__dirname, "features/support/tasks/http"),
    session: "HttpSessionHandler",
  },
};

// Browser DOM
export const dom = {
  ...common,
  worldParameters: {},
};

// Browser DOM, Http server
export const dom_http = {
  ...common,
  worldParameters: {},
};

export const fullstack = {
  ...common,
  worldParameters: {},
};
