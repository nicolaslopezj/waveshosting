import getCredential from '../../helpers/call/getCredential'
import deleteCredential from '../../helpers/call/deleteCredential'

export default async function() {
  const credential = await getCredential()
  deleteCredential(credential._id)
  console.log('You where logged out')
}
