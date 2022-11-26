// import { request } from "https";
import { stringify } from "querystring";

async function postMessage({ token, channel, text }) {
  console.log("postMessage", { token, channel, text });

  const data = JSON.stringify({
    channel,
    text,
  });

  const options = {
    hostname: "slack.com",
    port: 443,
    path: "/api/chat.postMessage",
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      // 'Content-Length': data.length
    },
  };

  const response = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    body: JSON.stringify({ channel, text }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      // 'Content-Length': data.length
    },
  });

  console.log("---------------------------------------------------");
  console.log(response);
  console.log("---------------------------------------------------");

  const json = await response.json();
  console.log(json);
  console.log("---------------------------------------------------");

  /*
  const req = request(options, (response) => {
    console.log(`statusCode: ${response.statusCode}`);
    let data = "";

    response.on("data", (chunk) => {
      process.stdout.write(chunk);
      data += chunk;
    });

    response.on("end", () => {
      console.log(JSON.parse(data));
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
*/
}

async function getAccessToken({ code, _client_id, _client_secret }) {
  // const data = JSON.stringify({
  //   code,
  //   // client_id,
  //   // client_secret
  // });

  const client_secret = "4e7b3970e0fc002b3a1742274e8d58a2";
  const client_id = "2774084983.1867696398775";

  const data = `code=${code}`;

  const postData = stringify({ code });
  // console.log(data, postData);
  // // const data = `code=${code}&client_id=${client_id}&client_secret=${client_secret}`;
  // const auth = `${client_id}:${client_secret}`;
  // console.log(auth)
  // const buff = Buffer.from(auth);
  // const base64 = buff.toString('base64');
  // console.log(base64)

  console.log("getAccessToken", data);
  console.log("-----------------------------------------------");

  const options = {
    hostname: "slack.com",
    port: 443,
    path: "/api/oauth.v2.access",
    method: "POST",
    // auth: `${client_id}:${client_secret}`,
    headers: {
      // 'Authorization': 'Basic ${base64}',
      // 'Content-Type': 'application/json',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const body = new FormData();
  body.append("code", code);
  body.append("client_id", client_id);
  body.append("client_secret", client_secret);

  const response = await fetch("https://slack.com/api/oauth.v2.access", {
    method: "POST",
    body,
  });

  const json = await response.json();

  // console.log("json", { json });

  return json;
  /*
  const req = request(options, (response) => {
    console.log(`statusCode: ${response.statusCode}`);
    let data = "";

    response.on("data", (chunk) => {
      process.stdout.write(chunk);
      data += chunk;
    });

    response.on("end", () => {
      console.log(JSON.parse(data));
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
  */
}

export interface SlackHandler {
  getAccessToken: (options) => Promise<void>;
  postMessage: (options) => Promise<void>;
}

export function createSlackHandler(): SlackHandler {
  return {
    getAccessToken,
    postMessage,
  };
}

/*

curl -F code=2774084983.4396853513697.6a1649023231db69e0960ba1473a54ec9c0cfa6b7300f1344e4deb7ef81b2577 \
  -F client_id=2774084983.1867696398775 \
  -F client_secret=<<secret>> \
  https://slack.com/api/oauth.v2.access








json {
  json: {
    ok: true,
    app_id: 'A01RHLGBQNT',
    authed_user: { id: 'U02NS2GV5' },
    scope: 'chat:write,channels:read,app_mentions:read,channels:history',
    token_type: 'bot',
    access_token: '<<token>>',
    bot_user_id: 'U01S4JX0A20',
    team: { id: 'T02NS2GUX', name: 'Oosterveld Family' },
    enterprise: null,
    is_enterprise_install: false
  }
}
*/
