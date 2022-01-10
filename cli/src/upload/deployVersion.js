import call from '../helpers/call'
import {startSpinner, stopSpinner} from '../helpers/spinner'
import chalk from 'chalk'

export default async function ({staticWebsiteId, version: versionNumber, env: environment}) {
  startSpinner('Starting deployment...')

  const mutation = `mutation deployStaticWebsiteVersion($staticWebsiteId: ID, $versionNumber: Float, $environment: ID) {
    result: deployStaticWebsiteVersion(staticWebsiteId: $staticWebsiteId, versionNumber: $versionNumber, environment: $environment) {
      name
    }
  }`
  const {result} = await call(mutation, {staticWebsiteId, versionNumber, environment})

  stopSpinner()
  console.log(
    chalk.bold(
      `Deployment of versionNumber v${versionNumber} in ${staticWebsiteId}#${environment} started correctly`
    )
  )

  return result
}
