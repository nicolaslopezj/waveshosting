import call from '../helpers/call'
import {startSpinner, stopSpinner} from '../helpers/spinner'
import colors from 'colors'

export default async function({staticWebsiteId, version: versionNumber, env: environment}) {
  startSpinner('Starting deployment...')

  const mutation = `mutation deployStaticWebsiteVersion($staticWebsiteId: ID, $versionNumber: Float, $environment: ID) {
    result: deployStaticWebsiteVersion(staticWebsiteId: $staticWebsiteId, versionNumber: $versionNumber, environment: $environment) {
      name
    }
  }`
  const {result} = await call(mutation, {staticWebsiteId, versionNumber, environment})

  stopSpinner()
  console.log(
    colors.bold(
      `Deployment of versionNumber v${versionNumber} in ${staticWebsiteId}#${environment} started correctly`
    )
  )

  return result
}
