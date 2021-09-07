import deleteCredential from './deleteCredential'

export default function({credential, error}) {
  if (credential && error.response && error.response.statusCode === 400) {
    console.log(error.response.body)
    deleteCredential(credential._id)
    throw new Error('Credentials error, will log out')
  }
  throw new Error(error.message)
}
