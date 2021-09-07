import Apps from 'app/collections/Apps'
import EnvironmentVariable from 'app/models/EnvironmentVariable'
import {cleanKey, validateKey, ValidationError} from '@orion-js/schema'
import isEmpty from 'lodash/isEmpty'
import findIndex from 'lodash/findIndex'

export default {
  type: [EnvironmentVariable],
  async clean(
    variables,
    {
      doc: {appId}
    }
  ) {
    const app = await Apps.findOne(appId)
    const platform = await app.platform()
    const basic = platform.basicEnvironmentVariablesSchema
    if (!basic) return variables

    for (const key of Object.keys(basic)) {
      const variable = (variables || []).find(({name}) => name === key)
      if (variable) {
        variable.value = await cleanKey(basic, key, variable.value)
      }
    }

    return variables.filter(variable => {
      return variable.name && variable.value
    })
  },
  async validate(
    variables,
    {
      doc: {appId}
    }
  ) {
    const app = await Apps.findOne(appId)
    const platform = await app.platform()
    const basic = platform.basicEnvironmentVariablesSchema
    if (!basic) return

    const errors = {}

    for (const key of Object.keys(basic)) {
      const variable = (variables || []).find(({name}) => name === key)
      const index = findIndex(variables || [], {name: key})
      const fieldName = `environmentVariables.${index}`
      if (variable) {
        const error = await validateKey(basic, key, variable.value)
        if (error) {
          errors[fieldName] = error
        }
      } else if (!basic[key].optional) {
        return 'missingVariables'
      }
    }

    if (!isEmpty(errors)) {
      throw new ValidationError(errors)
    }
  }
}
