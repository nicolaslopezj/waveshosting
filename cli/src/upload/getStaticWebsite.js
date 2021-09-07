import call from '../helpers/call'

export default async function({staticWebsiteId}) {
  const query = `query getStaticWebsite ($staticWebsiteId: ID) {
    staticWebsite(staticWebsiteId: $staticWebsiteId) {
      _id
      platformId
      nextVersionNumber
    }
  }`
  const {staticWebsite} = await call(query, {staticWebsiteId})
  if (!staticWebsite) {
    throw new Error('Static webisite not found in this account')
  }
  return staticWebsite
}
