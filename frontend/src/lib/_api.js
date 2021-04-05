import { request } from 'https';
import { stringify } from 'querystring';

export function postMessage({token, channel, text}) {
  console.log('postMessage', { token, channel, text });

  const data = JSON.stringify({
    channel,
    text
  });

  const options = {
    hostname: 'slack.com',
    port: 443,
    path: '/api/chat.postMessage',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      // 'Content-Length': data.length
    }
  };

  const req = request(options, (response) => {
    console.log(`statusCode: ${response.statusCode}`);
    let data = '';

    response.on('data', chunk => {
      process.stdout.write(chunk);
      data += chunk;
    });

    response.on('end', () => {
      console.log(JSON.parse(data));
    });
  });

  req.on('error', error => {
    console.error(error)
  });

  req.write(data);
  req.end();
}

export function getAccessToken({ code, client_id, client_secret}) {
  // const data = JSON.stringify({
  //   code,
  //   // client_id,
  //   // client_secret
  // });

  const data = `code=${code}`;

  const postData = stringify({code});
  console.log(data, postData);
  // const data = `code=${code}&client_id=${client_id}&client_secret=${client_secret}`;
  // const auth = `${client_id}:${client_secret}`;
  // console.log(auth)
  // const buff = Buffer.from(auth);
  // const base64 = buff.toString('base64');
  // console.log(base64)

  console.log('getAccessToken', data)

  const options = {
    hostname: 'slack.com',
    port: 443,
    path: '/api/oauth.v2.access',
    method: 'POST',
    auth: `${client_id}:${client_secret}`,
    headers: {
      // 'Authorization': 'Basic ${base64}',
      // 'Content-Type': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  const req = request(options, (response) => {
    console.log(`statusCode: ${response.statusCode}`);
    let data = '';

    response.on('data', chunk => {
      process.stdout.write(chunk);
      data += chunk;
    });

    response.on('end', () => {
      console.log(JSON.parse(data));
    });
  });

  req.on('error', error => {
    console.error(error)
  });

  req.write(data);
  req.end();
}
