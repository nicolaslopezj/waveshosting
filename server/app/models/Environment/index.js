import {Model} from '@orion-js/app'

export default new Model({
  name: 'Environment',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
