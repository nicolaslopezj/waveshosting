import {Collection} from '@orion-js/app'
import StaticWebsiteVersion from 'app/models/StaticWebsiteVersion'

export default new Collection({
  name: 'static_website_versions',
  model: StaticWebsiteVersion,
  indexes: [{keys: {number: 1, staticWebsiteId: 1}, options: {unique: true}}]
})
