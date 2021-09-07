import printValidationError from './printValidationError'
import promptTwoFactor from './promptTwoFactor'
import makeRequest from './makeRequest'
import handleNetworkError from './handleNetworkError'

export default async function handleError({error, credential, headers, body}) {
  if (error.error === 'validationError') {
    return printValidationError(error)
  }

  if (error.type === 'needsTwoFactorCode') {
    const code = await promptTwoFactor()
    headers['X-ORION-TWOFACTOR'] = code
    try {
      const result = await makeRequest({headers, body})

      if (result.errors) {
        return await handleError({
          error: result.errors[0],
          headers,
          body,
          credential
        })
      }

      return result.data
    } catch (error) {
      return handleNetworkError({credential, error})
    }
  }

  throw new Error(error.message)
}
