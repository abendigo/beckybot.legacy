import { getAccessToken } from './_api';

const { SLACK_CLIENT_SECRET: client_secret } = process.env;
const client_id = "2774084983.1867696398775";

export async function get(request, context) {
  console.log('oauth.get', request);
  console.log('oauth.get', request.query);
  const code = request.query.get('code');

  console.log({code, client_id, client_secret})

  await getAccessToken({ code, client_id, client_secret })

  return { status: 204, body: {} };
}
