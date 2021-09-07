import model from './index'
import init from 'app/models/Environment/init'

export default function(awsRawData, enviromentsRawData) {
  const deployedInEnvironments = (enviromentsRawData || [])
    .filter(env => env.VersionLabel === awsRawData.VersionLabel)
    .map(data => init(data))

  const data = {
    label: awsRawData.VersionLabel,
    status: awsRawData.Status,
    createdAt: awsRawData.DateCreated,
    description: awsRawData.Description,
    deployedInEnvironments
  }

  return model.initItem(data)
}
