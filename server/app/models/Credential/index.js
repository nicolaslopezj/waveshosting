import {Model} from '@orion-js/app'

export default new Model({
  name: 'Credential',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
