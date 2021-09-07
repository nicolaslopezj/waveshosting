import {Model} from '@orion-js/app'

export default new Model({
  name: 'StaticWebsiteVersion',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
