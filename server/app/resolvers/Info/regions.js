import {resolver, Model} from '@orion-js/app'

const Region = new Model({
  name: 'Region',
  schema: {
    name: {
      type: String
    },
    code: {
      type: String
    }
  }
})

export default resolver({
  returns: [Region],
  async resolve(params, viewer) {
    const regions = {
      'us-east-1': 'US East, North Virginia',
      'us-east-2': 'US East, Ohio',
      'us-west-1': 'US West, North Carolina',
      'us-west-2': 'US West, Oregon',
      'ca-central-1': 'Canada, Central',
      'eu-west-1': 'EU, Ireland',
      'eu-central-1': 'EU, Frankfurt',
      'eu-west-2': 'EU, London',
      'ap-northeast-1': 'Asia Pacific, Tokio',
      'ap-northeast-2': 'Asia Pacific, Seoul',
      'ap-southeast-1': 'Asia Pacific, Singapore',
      'ap-southeast-2': 'Asia Pacific, Sydney',
      'ap-south-1': 'Asia Pacific, Mumbai',
      'sa-east-1': 'South America, São Paulo'
    }
    return Object.keys(regions).map(code => {
      return {code, name: regions[code]}
    })
  }
})
