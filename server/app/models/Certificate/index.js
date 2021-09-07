import {Model} from '@orion-js/app'

export default new Model({
  name: 'Certificate',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
