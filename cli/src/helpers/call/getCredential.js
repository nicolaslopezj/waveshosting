import getCredentials from './getCredentials'
import inquirer from 'inquirer'
import setCredentials from './setCredentials'
import program from 'commander'

let selectedCredential = null

export default async function() {
  if (program.token) {
    if (typeof program.token !== 'string') throw new Error('Invalid token')
    const [publicKey, secretKey, _id] = program.token.split(':')
    if (!publicKey || !secretKey || !_id) throw new Error('Invalid token')
    return {publicKey, secretKey, user: {_id}}
  }

  const credentials = getCredentials()
  if (program.account) {
    for (const credential of credentials) {
      if (credential.user.email === program.account) {
        return credential
      }
    }
    throw new Error('You are not logged in as ' + program.account)
  }

  try {
    if (credentials.length <= 1) return credentials[0]
    if (selectedCredential) return selectedCredential
    const choices = credentials.map(credential => {
      return `${credential.user.name} <${credential.user.email}>`
    })
    const {choice} = await inquirer.prompt([
      {name: 'choice', message: 'Select an account', type: 'list', choices}
    ])
    const index = choices.indexOf(choice)
    selectedCredential = credentials[index]
    return selectedCredential
  } catch (e) {
    console.log('Credentials file is corrupted, resetting sessions')
    setCredentials([])
    return {}
  }
}
