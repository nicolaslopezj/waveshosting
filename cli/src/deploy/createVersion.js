import call from '../helpers/call'

export default async function({appId, archiveKey, description}) {
  const mutation = `mutation createNewVersion($appId: ID, $archiveKey: String, $description: String) {
    result: createNewVersion(appId: $appId, archiveKey: $archiveKey, description: $description) {
      label
    }
  }`
  const {
    result: {label}
  } = await call(mutation, {appId, archiveKey, description})
  return label
}
