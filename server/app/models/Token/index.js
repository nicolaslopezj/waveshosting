import {Model} from '@orion-js/app'

export default new Model({
  name: 'Token',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
