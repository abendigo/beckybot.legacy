<script context="module">
  export async function load({ page, fetch, session, context }) {
    console.log('load', { page, fetch, session, context })

  //   return { status: 200 };
  // //   return {
  //     status,
  //     error,
  //     redirect,
  //     maxage,
  //     props,
  //     context
  //   };
  };
</script>

<script>
  const client_id = "2774084983.1867696398775";
  const scopes = [
    'app_mentions:read',
    'channels:history',
    'channels:read',
    'chat:write'
  ];
  const state = 'randomString';
</script>

<main>
	<h1>Hello Becky Fans!</h1>

  <a href="{`https://slack.com/oauth/v2/authorize?scope=${scopes.join(',')}&client_id=${client_id}&state=${state}`}">
    <img
      alt="Add to Slack"
      height="40"
      width="139"
      src="https://platform.slack-edge.com/img/add_to_slack.png"
      srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
    />
  </a>
</main>
