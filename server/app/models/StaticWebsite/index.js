import {Model} from '@orion-js/app'

export default new Model({
  name: 'StaticWebsite',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
