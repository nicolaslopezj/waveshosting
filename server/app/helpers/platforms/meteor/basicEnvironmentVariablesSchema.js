import isPlainObject from 'lodash/isPlainObject'

export default {
  MONGO_URL: {
    type: String,
    label: 'The URL of the Mongo Database',
    description: 'This is required to start your app'
  },
  ROOT_URL: {
    type: String,
    label: 'The public URL of your app',
    description: 'The client will connect the websocket to this URL',
    validate(url) {
      const regex = /^(http[s]?:\/\/(www\.)?){1}([0-9A-Za-z-.@:%_+~#=]+)+((\.[a-zA-Z]{2,3})+)(\/(.)*)?(\?(.)*)?/g
      if (!regex.test(url)) return 'invalid'
    }
  },
  METEOR_SETTINGS: {
    type: String,
    label: 'A JSON with the settings of your app',
    optional: true,
    fieldType: 'meteorSettings',
    clean(settings) {
      try {
        const json = JSON.parse(decodeURIComponent(settings))
        return encodeURIComponent(JSON.stringify(json, null, 2))
      } catch (e) {
        return settings
      }
    },
    validate(settings) {
      try {
        const result = JSON.parse(decodeURIComponent(settings))
        if (!isPlainObject(result)) {
          return 'invalid'
        }
      } catch (e) {
        return 'invalid'
      }
    }
  }
}
