import call from '../helpers/call'
import fs from 'fs'
import rp from 'request-promise'
import createVersion from './createVersion'
import {startSpinner, stopSpinner} from '../helpers/spinner'
import chalk from 'chalk'

export default async function ({path, appId, description}) {
  startSpinner('Uploading app...')

  const stream = fs.createReadStream(path)

  const mutation = `mutation generate($appId: ID) {
    result: generateUploadSpot(appId: $appId) {
      url
      fields
      key
    }
  }`
  const {
    result: {url, fields, key}
  } = await call(mutation, {appId})

  await rp({
    uri: url,
    method: 'POST',
    formData: Object.assign(fields, {
      key: key,
      file: stream
    })
  })

  const version = await createVersion({appId, archiveKey: key, description})

  stopSpinner()
  console.log(chalk.bold('Uploaded version ' + version))

  return version
}
