import call from '../helpers/call'

export default async function({appId}) {
  const query = `query getApp ($appId: ID) {
    app(appId: $appId) {
      _id
      platformId
    }
  }`
  const {app} = await call(query, {appId})
  if (!app) {
    throw new Error('App not found in this account')
  }
  return app
}
