<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import LoginPage from "../routes/login.svelte";
</script>

<Meta
  title="Login Page"
  component={LoginPage}
  argTypes={{
    onLogin: { action: "onLogin" },
    onLogout: { action: "onLogout" },
    onCreateAccount: { action: "onCreateAccount" },
  }}
/>

<Template let:args>
  <LoginPage
    {...args}
    on:login={args.onLogin}
    on:logout={args.onLogout}
    on:createAccount={args.onCreateAccount}
  />
</Template>

<Story
  name="LoggedIn"
  args={{
    user: {},
  }}
/>

<Story name="LoggedOut" args={{}} />
