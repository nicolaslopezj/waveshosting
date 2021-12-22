import url from './url'
import fetch from 'node-fetch'

export default async function ({headers, body}) {
  const response = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      ...headers
    },
    body: body,
    method: 'POST'
  })

  const json = await response.json()
  return json
}
