<!-- <script context="module">
  export async function load({ page, fetch, session, context }) {
    console.log('load', { session })

    if (!session?.user?.id) {
      return {
        status: 302,
        redirect: '/login'
      }
    }

    return {
      status: 200
    };
  }
</script> -->
<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  console.log("data", { data})

	// import { getStores, navigating, page, session } from '$app/stores';
	// import { getStores, navigating, page, session } from '../../.svelte-kit/dev/runtime/app';

	const client_id = '2774084983.1867696398775';
	const scopes = ['app_mentions:read', 'channels:history', 'channels:read', 'chat:write'];
	const state = 'randomString';
	// const redirect_uri = "https://oosterveld.ngrok.io/slack/oauth"

	const params = new URLSearchParams({ scope: scopes.join(','), client_id, state });

	// console.log($session);
</script>

<main>
	<h1>Hello Becky Fans!</h1>

	<hr />
	<!-- id: {$session?.user?.id} -->

  {#each data.teams as team}
	<a href={`/teams/${team.id}`}>{team.name}</a> <br />
  {/each}

	<hr />

	<a href={`https://slack.com/oauth/v2/authorize?${params.toString()}`}>
		<img
			alt="Add to Slack"
			height="40"
			width="139"
			src="https://platform.slack-edge.com/img/add_to_slack.png"
			srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
		/>
	</a>
</main>
