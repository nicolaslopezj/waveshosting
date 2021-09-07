import {generateId} from '@orion-js/app'

export default async function(environment) {
  const s3 = await environment.s3()
  const baseName = `${environment.staticWebsiteId}-${environment.name}-${generateId()}`
  const bucketName = `${baseName}-website`.toLowerCase()

  await s3.createBucket({Bucket: bucketName}).promise()

  await environment.update({$set: {bucketName}})
}
