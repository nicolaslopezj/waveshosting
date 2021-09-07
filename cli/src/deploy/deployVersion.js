import call from '../helpers/call'
import {startSpinner, stopSpinner} from '../helpers/spinner'
import colors from 'colors'

export default async function({appId, version, env}) {
  const environment = `${appId}-${env}`
  startSpinner('Starting deployment...')

  const mutation = `mutation deployVersion($appId: ID, $version: String, $environment: String) {
    result: deployVersion(appId: $appId, version: $version, environment: $environment) {
      name
    }
  }`
  const {result} = await call(mutation, {appId, version, environment})

  stopSpinner()
  console.log(colors.bold(`Deployment of version ${version} in ${appId}#${env} started correctly`))

  return result
}
