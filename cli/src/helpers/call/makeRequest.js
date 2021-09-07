import url from './url'
import rp from 'request-promise'

export default async function({headers, body}) {
  const response = await rp({
    url,
    method: 'POST',
    headers,
    body
  })

  return JSON.parse(response)
}
