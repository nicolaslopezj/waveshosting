import {Model} from '@orion-js/app'

export default new Model({
  name: 'Platform',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
