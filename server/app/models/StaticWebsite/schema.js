import staticWebsitePlatforms from 'app/helpers/staticWebsitePlatforms'

export default {
  _id: {
    type: 'ID',
    validate(name) {
      if (!/^[a-z0-9-]+$/g.test(name)) return 'invalid'
    }
  },
  userId: {
    type: String
  },
  credentialId: {
    type: String
  },
  region: {
    type: String,
    label: 'Region',
    description: 'Choose the AWS region for your app',
    allowedValues: [
      'us-east-1',
      'us-east-2',
      'us-west-1',
      'us-west-2',
      'ca-central-1',
      'eu-west-1',
      'eu-central-1',
      'eu-west-2',
      'ap-northeast-1',
      'ap-northeast-2',
      'ap-southeast-1',
      'ap-southeast-2',
      'ap-south-1',
      'sa-east-1'
    ]
  },
  createdAt: {
    type: Date
  },
  platformId: {
    type: String,
    allowedValues: Object.keys(staticWebsitePlatforms)
  },
  versionsBucketName: {
    type: 'ID'
  }
}
