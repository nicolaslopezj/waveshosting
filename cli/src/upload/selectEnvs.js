import inquirer from 'inquirer'
import call from '../helpers/call'

export default async function(staticWebsiteId) {
  const query = `query getStaticWebisteEnvironments($staticWebsiteId: ID) {
    staticWebsite(staticWebsiteId: $staticWebsiteId) {
      environments {
        name
      }
    }
  }
  `
  const {
    staticWebsite: {environments}
  } = await call(query, {staticWebsiteId})

  if (!environments.length) {
    return
  }

  const {confirm} = await inquirer.prompt([
    {
      name: 'confirm',
      message: 'do you wish to deploy this version to an environment?',
      type: 'confirm'
    }
  ])

  if (!confirm) return

  const choices = environments.map(environment => {
    return environment.name
  })

  const {envs} = await inquirer.prompt([
    {name: 'envs', message: 'Select an environment', type: 'checkbox', choices}
  ])

  return envs
}
