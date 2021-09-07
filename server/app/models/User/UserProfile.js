import {Model, resolver} from '@orion-js/app'

export default new Model({
  name: 'UserProfile',
  schema: {
    firstName: {
      type: String,
      min: 2,
      label: 'First name'
    },
    lastName: {
      type: String,
      min: 2,
      label: 'Last name',
      optional: true
    }
  },
  resolvers: {
    name: resolver({
      name: 'name',
      returns: String,
      resolve: async function(profile) {
        return profile.firstName
      }
    })
  }
})
