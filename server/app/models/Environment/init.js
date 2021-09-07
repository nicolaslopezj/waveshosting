import model from './index'

export default function(awsRawData) {
  const data = {
    _id: awsRawData.EnvironmentId,
    name: awsRawData.EnvironmentName,
    appId: awsRawData.ApplicationName,
    platform: awsRawData.SolutionStackName,
    endpointURL: awsRawData.EndpointURL,
    awsCNAME: awsRawData.CNAME,
    status: awsRawData.Status,
    health: awsRawData.Health,
    deployedVersionLabel: awsRawData.VersionLabel
  }
  return model.initItem(data)
}
