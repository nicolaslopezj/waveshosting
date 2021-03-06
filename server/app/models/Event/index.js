import {Model} from '@orion-js/app'

export default new Model({
  name: 'Event',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
