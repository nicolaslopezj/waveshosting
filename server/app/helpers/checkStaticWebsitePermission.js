import {cache} from '@orion-js/app'
import StaticWebsites from 'app/collections/StaticWebsites'

const checkPermission = async function ({staticWebsiteId}, viewer) {
  const exists = await StaticWebsites.find({
    _id: staticWebsiteId,
    userId: viewer.userId
  }).count()
  if (exists) return
  return 'notAllowed'
}

export default async function ({staticWebsiteId}, viewer) {
  if (viewer.roles.includes('admin')) return
  const key = `permission_staticwebsite_${staticWebsiteId}_${viewer.userId}`
  const onCache = await cache.get(key)
  if (onCache) {
    return onCache.value
  } else {
    const result = await checkPermission({staticWebsiteId}, viewer)
    await cache.set(key, result, {ttl: 1000 * 60})
    return result
  }
}
