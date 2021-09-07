import {Model} from '@orion-js/app'

export default new Model({
  name: 'EnvironmentVariable',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
