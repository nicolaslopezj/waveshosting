import call from '../helpers/call'

export default async function({staticWebsiteId, archiveKey, description}) {
  const mutation = `mutation createNewVersion($staticWebsiteId: ID, $archiveKey: String, $description: String) {
    result: createNewStaticWebsiteVersion(staticWebsiteId: $staticWebsiteId, archiveKey: $archiveKey, description: $description) {
      label
      number
    }
  }`
  const {
    result: {number}
  } = await call(mutation, {staticWebsiteId, archiveKey, description})
  return number
}
