import {Model} from '@orion-js/app'

export default new Model({
  name: 'StaticWebsitePlatform',
  schema: () => require('./schema'),
  resolvers: () => require('./resolvers')
})
