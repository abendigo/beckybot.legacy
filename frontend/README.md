# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Svelte apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `node build`. To use a different adapter, add it to the `devDependencies` in `package.json` making sure to specify the version as `next` and update your `svelte.config.cjs` to [specify your chosen adapter](https://kit.svelte.dev/docs#configuration-adapter). The following official adapters are available:

- [@sveltejs/adapter-node](https://github.com/sveltejs/kit/tree/master/packages/adapter-node)
- [@sveltejs/adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static)
- [@sveltejs/adapter-netlify](https://github.com/sveltejs/kit/tree/master/packages/adapter-netlify)
- [@sveltejs/adapter-vercel](https://github.com/sveltejs/kit/tree/master/packages/adapter-vercel)
- ...more soon

[See the adapter documentation for more detail](https://kit.svelte.dev/docs#adapters)




  <a href="https://slack.com/oauth/v2/authorize?scope=app_mentions:read,channels:history,channels:read,chat:write&client_id=2774084983.1867696398775"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
  <a href="https://slack.com/oauth/v2/authorize?client_id=2774084983.1867696398775"><img alt=""Add to Slack"" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>





docker run -d --env SLACK_CLIENT_SECRET=f1f336cb74680ef71d09a8405d3d954a --name beckybot --rm --net traefik_default -v "$PWD":/usr/src/app -w /usr/src/app node:14 npm run dev












<a href="https://slack.com/oauth/v2/authorize?client_id=2774084983.1867696398775&scope=chat:write,channels:read,app_mentions:read,channels:history&user_scope="><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>



https://slack.com/oauth/v2/authorize?client_id=2774084983.1867696398775&scope=chat:write,channels:read,app_mentions:read,channels:history&user_scope=



<meta name="slack-app-id" content="A01RHLGBQNT">





CREATE DATABASE beckybot;
CREATE USER 'beckybot'@'%' IDENTIFIED BY 'FooBarIsDead';
GRANT ALL PRIVILEGES ON beckybot.* TO 'beckybot'@'%';




npx knex --knexfile src/db/knexfile.mjs --esm --debug migrate:up
