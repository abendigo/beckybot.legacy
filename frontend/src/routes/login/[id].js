

export async function get({ method, host, headers, path, params, query, rawBody, body, locals }) {
  const { id } = params;

  locals.user = id;

  return {
    status: 302,
    headers: {
      location: `/`
    },
    body: 'OK'
  };
}
