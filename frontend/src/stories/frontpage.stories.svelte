<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import FrontPage from "../routes/index.svelte";

  // import { setContext } from 'svelte';

  const stores = {
    page: writable(),
		navigating: writable(null),
		session: writable({})
  };

  setContext('__svelte__', stores);
</script>

<Meta title="Pages/Front Page" component={FrontPage} />

<Story name="Front Page">
  <FrontPage />
</Story>
