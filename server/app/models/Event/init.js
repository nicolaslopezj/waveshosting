import model from './index'

export default function(awsRawData) {
  const data = {
    environmentName: awsRawData.EnvironmentName,
    appId: awsRawData.ApplicationName,
    message: awsRawData.Message,
    severity: awsRawData.Severity,
    date: awsRawData.EventDate
  }

  return model.initItem(data)
}
