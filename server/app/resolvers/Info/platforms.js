import {resolver} from '@orion-js/app'
import platforms from 'app/helpers/platforms'
import Platform from 'app/models/Platform'
import sortBy from 'lodash/sortBy'

export default resolver({
  returns: [Platform],
  async resolve(params, viewer) {
    return sortBy(Object.values(platforms), 'name')
  }
})
