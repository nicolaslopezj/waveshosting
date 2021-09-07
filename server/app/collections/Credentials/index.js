import {Collection} from '@orion-js/app'
import Credential from 'app/models/Credential'

export default new Collection({
  name: 'credentials',
  model: Credential,
  indexes: []
})
