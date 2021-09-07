import {resolver} from '@orion-js/app'
import Apps from 'app/collections/Apps'
import App from 'app/models/App'
import Users from 'app/collections/Users'
import canCreateAnApp from 'app/resolvers/Subscription/canCreateAnApp'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    email: {
      type: String,
      label: 'Email',
      async custom(email) {
        const user = await Users.findOne({'emails.address': email})
        if (!user) return 'userNotFound'
        const invitedUserCanCreateAnApp = await canCreateAnApp({}, {userId: user._id})
        if (!invitedUserCanCreateAnApp) return 'userNotSuscribed'
      }
    }
  },
  mutation: true,
  returns: App,
  async checkPermission({appId}, viewer) {
    if (viewer.roles.includes('admin')) return
    const app = await Apps.findOne(appId)
    if (app.userId !== viewer.userId) {
      return 'unauthorized'
    }
  },
  async resolve({appId, email}, viewer) {
    const currentUserCanCreateAnApp = await canCreateAnApp({}, viewer)
    if (!currentUserCanCreateAnApp) throw new Error('You must have an active subscription')
    const app = await Apps.findOne(appId)
    const user = await Users.findOne({'emails.address': email})
    app.update({$addToSet: {collaboratorsIds: user._id}})
    return app
  }
})
