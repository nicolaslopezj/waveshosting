import createCloudfront from './createCloudfront'
import createBucket from './createBucket'

export default async function(environment) {
  await createBucket(environment)
  await createCloudfront(environment)
}
