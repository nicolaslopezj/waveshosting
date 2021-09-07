import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'
import App from 'app/models/App'
import Apps from 'app/collections/Apps'

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    to: {
      type: String,
      label: 'Account email',
      async custom(email) {
        const user = await Users.findOne({'emails.address': email})
        if (!user) return 'userNotFound'
      }
    }
  },
  returns: App,
  mutation: true,
  requireTwoFactor: true,
  async resolve({appId, to}, viewer) {
    const app = await Apps.findOne(appId)
    if (viewer.userId !== app.userId) throw new Error('Only the owner can transfer an app')

    const user = await Users.findOne({'emails.address': to})
    if (user._id === app.userId) throw new Error("You can't transfer the app to yourself")

    await app.update({$set: {transferToId: user._id}})

    return app
  }
})
