<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";

  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';

  import IndexPage from "../routes/index.svelte";

  const stores = {
    page: writable(),
    navigating: writable(null),
    session: writable({})
  };

  setContext('__svelte__', stores);
</script>

<Meta title="Pages/Index Page" component={IndexPage} />

<Template let:args>
  <IndexPage
    {...args}
    on:login={args.onLogin}
    on:logout={args.onLogout}
    on:createAccount={args.onCreateAccount}
  />
</Template>

<Story><IndexPage /></Story>

