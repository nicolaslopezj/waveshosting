import getAuthHeaders from './getAuthHeaders'
import getCredential from './getCredential'
import handleError from './handleError'
import getBody from './getBody'
import makeRequest from './makeRequest'
import handleNetworkError from './handleNetworkError'

export default async function(query, variables, {skipSession} = {}) {
  const body = getBody({query, variables})
  const credential = skipSession ? null : await getCredential()

  try {
    const headers = credential ? getAuthHeaders(body, credential) : {}
    const result = await makeRequest({headers, body})

    if (result.errors) {
      return await handleError({
        error: result.errors[0],
        headers,
        credential,
        body
      })
    }

    return result.data
  } catch (error) {
    return handleNetworkError({credential, error})
  }
}
