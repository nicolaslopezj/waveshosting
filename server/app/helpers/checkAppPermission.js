import {cache} from '@orion-js/app'
import Apps from 'app/collections/Apps'

const checkPermission = async function({appId}, viewer) {
  const hasApp = await Apps.find({
    _id: appId,
    $or: [{userId: viewer.userId}, {collaboratorsIds: viewer.userId}]
  }).count()
  if (hasApp) return
  return 'notAllowed'
}

export default async function({appId}, viewer) {
  if (!viewer.userId) return 'notAllowed'
  if (viewer.roles && viewer.roles.includes('admin')) return
  const key = `permission_${appId}_${viewer.userId}`
  const onCache = await cache.get(key)
  if (onCache) {
    return onCache.value
  } else {
    const result = await checkPermission({appId}, viewer)
    await cache.set(key, result, {ttl: 1000 * 60})
    return result
  }
}
