import call from '../helpers/call'
import fs from 'fs'
import rp from 'request-promise'
import createVersion from './createVersion'
import {startSpinner, stopSpinner} from '../helpers/spinner'
import chalk from 'chalk'

export default async function ({path, staticWebsiteId, description}) {
  startSpinner('Uploading app...')

  const stream = fs.createReadStream(path)

  const mutation = `mutation generate($staticWebsiteId: ID) {
    result: generateStaticWebsiteUploadSpot(staticWebsiteId: $staticWebsiteId) {
      url
      fields
      key
    }
  }`
  const {
    result: {url, fields, key}
  } = await call(mutation, {staticWebsiteId})

  await rp({
    uri: url,
    method: 'POST',
    formData: Object.assign(fields, {
      key: key,
      file: stream
    })
  })

  const version = await createVersion({staticWebsiteId, archiveKey: key, description})

  stopSpinner()
  console.log(chalk.bold('Uploaded version v' + version))

  return version
}
