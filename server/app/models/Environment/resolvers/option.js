import {resolver} from '@orion-js/app'

export default resolver({
  params: {
    namespace: {
      type: String,
      optional: true
    },
    optionName: {
      type: String,
      optional: true
    },
    resourceName: {
      type: String,
      optional: true
    }
  },
  private: true,
  async resolve(environment, {namespace, optionName, resourceName}, viewer) {
    const options = await environment.options()

    for (const option of options) {
      if (namespace && option.Namespace !== namespace) continue
      if (resourceName && option.ResourceName !== resourceName) continue
      if (optionName && option.OptionName !== optionName) continue
      return option.Value
    }

    return null
  }
})
