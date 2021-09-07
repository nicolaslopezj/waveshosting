import inquirer from 'inquirer'
import call from '../helpers/call'

export default async function() {
  const query = `query getMyWebsites {
    staticWebsites {
      items {
        _id
      }
    }
  }`
  const {
    staticWebsites: {items: staticWebsites}
  } = await call(query)
  if (!staticWebsites.length) {
    throw new Error('No websites found in this account')
  }

  const choices = staticWebsites.map(staticWebsite => {
    return staticWebsite._id
  })

  const {staticWebsiteId} = await inquirer.prompt([
    {name: 'staticWebsiteId', message: 'Select a static website', type: 'list', choices}
  ])

  return staticWebsiteId
}
