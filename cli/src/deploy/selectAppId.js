import inquirer from 'inquirer'
import call from '../helpers/call'
import getCredential from '../helpers/call/getCredential'

export default async function() {
  const credential = await getCredential()
  const query = `query getMyApps ($userId: ID) {
    apps (userId: $userId) {
      items {
        _id
      }
    }
  }`
  const {
    apps: {items: apps}
  } = await call(query, {userId: credential.user._id})
  if (!apps.length) {
    throw new Error('App not found in this account')
  }

  const choices = apps.map(app => {
    return app._id
  })

  const {appId} = await inquirer.prompt([
    {name: 'appId', message: 'Select an app', type: 'list', choices}
  ])

  return appId
}
