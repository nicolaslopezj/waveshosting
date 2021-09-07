import {paginatedResolver} from '@orion-js/app'
import {getOptions} from '@orion-js/auth'
import Token from 'app/models/Token'

export default paginatedResolver({
  returns: Token,
  async getCursor({filter}, viewer) {
    const query = {
      userId: viewer.userId,
      'options.token': true
    }

    const {Sessions} = getOptions()

    return Sessions.find(query)
  }
})
