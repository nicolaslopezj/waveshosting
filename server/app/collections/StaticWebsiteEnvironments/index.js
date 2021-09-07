import {Collection} from '@orion-js/app'
import StaticWebsiteEnvironment from 'app/models/StaticWebsiteEnvironment'

export default new Collection({
  name: 'static_website_environments',
  model: StaticWebsiteEnvironment,
  indexes: [{keys: {name: 1, staticWebsiteId: 1}, options: {unique: true}}]
})
