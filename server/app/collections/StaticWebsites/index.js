import {Collection} from '@orion-js/app'
import StaticWebsite from 'app/models/StaticWebsite'

export default new Collection({
  name: 'static_websites',
  model: StaticWebsite,
  indexes: []
})
