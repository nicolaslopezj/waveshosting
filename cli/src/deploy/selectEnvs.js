import inquirer from 'inquirer'
import call from '../helpers/call'

export default async function(appId) {
  const query = `query getAppEnvironments($appId: ID) {
    app(appId: $appId) {
      environments {
        cleanName
      }
    }
  }
  `
  const {
    app: {environments}
  } = await call(query, {appId})

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
    return environment.cleanName
  })

  const {envs} = await inquirer.prompt([
    {name: 'envs', message: 'Select an environment', type: 'checkbox', choices}
  ])

  return envs
}
