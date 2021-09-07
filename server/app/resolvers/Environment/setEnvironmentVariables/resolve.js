import Apps from 'app/collections/Apps'
import isEqual from 'lodash/isEqual'
import differenceBy from 'lodash/differenceBy'
import differenceWith from 'lodash/differenceWith'

export default async function({appId, environmentName, environmentVariables}, viewer) {
  const app = await Apps.findOne(appId)
  const environment = await app.environment({environmentName})
  const beanstalk = await app.beanstalk()

  const oldVariables = await environment.environmentVariables()

  const toAdd = differenceWith(environmentVariables, oldVariables, isEqual)
  const toRemove = differenceBy(oldVariables, environmentVariables, 'name')

  if (toAdd.length === 0 && toRemove.length === 0) return environment

  const finalToAdd = toAdd.map(variable => ({
    Namespace: 'aws:elasticbeanstalk:application:environment',
    OptionName: variable.name,
    Value: variable.value
  }))

  const finalToRemove = toRemove.map(variable => ({
    Namespace: 'aws:elasticbeanstalk:application:environment',
    OptionName: variable.name
  }))

  await beanstalk
    .updateEnvironment({
      ApplicationName: appId,
      EnvironmentName: environmentName,
      OptionSettings: finalToAdd,
      OptionsToRemove: finalToRemove
    })
    .promise()

  return environment
}
