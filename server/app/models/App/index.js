import {Model} from '@orion-js/app'

export default new Model({
  name: 'App',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
