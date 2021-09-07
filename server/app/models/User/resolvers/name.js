import {resolver} from '@orion-js/app'

export default resolver({
  returns: String,
  async resolve(user, params, viewer) {
    if (!user.profile) return null
    if (!user.profile.firstName) return null
    if (user.profile.lastName) {
      return `${user.profile.firstName} ${user.profile.lastName}`
    } else {
      return user.profile.firstName
    }
  }
})
