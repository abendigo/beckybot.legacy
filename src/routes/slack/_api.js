import { request } from 'https';

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
