import {Collection} from '@orion-js/app'
import App from 'app/models/App'

export default new Collection({
  name: 'apps',
  model: App,
  indexes: []
})
