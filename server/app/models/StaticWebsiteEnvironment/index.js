import {Model} from '@orion-js/app'

export default new Model({
  name: 'StaticWebsiteEnvironment',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
