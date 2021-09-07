import deleteCloudfront from './deleteCloudfront'
import deleteBucket from './deleteBucket'

export default async function(environment) {
  await deleteCloudfront(environment)
  await deleteBucket(environment)
}
