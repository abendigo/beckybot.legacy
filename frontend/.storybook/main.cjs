const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf"
  ],
  "core": {
    "builder": "storybook-builder-vite"
  // },
  // "svelteOptions": {
    // "preprocess": require("../svelte.config.js").preprocess
  },
  async viteFinal(config) {
    config.resolve.alias = {
      $app: path.resolve('./.svelte-kit/dev/runtime/app'),
      $generated: path.resolve('./.svelte-kit/dev/generated'),
    };

    return config;
  }
}
