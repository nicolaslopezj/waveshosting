import {Model} from '@orion-js/app'

export default new Model({
  name: 'SafeUser',
  schema: {
    _id: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String
    }
  }
})
