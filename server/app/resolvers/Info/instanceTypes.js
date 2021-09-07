import {resolver, Model} from '@orion-js/app'
import Apps from 'app/collections/Apps'
import rp from 'request-promise'

const schema = {
  code: {
    type: String
  },
  name: {
    type: String
  },
  memory: {
    type: String
  },
  vcpu: {
    type: String
  },
  networkPerformance: {
    type: String
  },
  cost: {
    type: String
  },
  familyName: {
    type: String
  },
  familyCode: {
    type: String
  }
}

export default resolver({
  params: {
    appId: {
      type: 'ID'
    },
    environmentName: {
      type: 'ID'
    }
  },
  returns: [
    new Model({
      name: 'InstanceType',
      schema
    })
  ],
  cache: 10000,
  async resolve({appId, environmentName}, viewer) {
    const app = await Apps.findOne(appId)
    const beanstalk = await app.beanstalk()
    const response = await beanstalk
      .describeConfigurationOptions({
        ApplicationName: appId,
        EnvironmentName: environmentName,
        Options: [
          {
            Namespace: 'aws:autoscaling:launchconfiguration',
            OptionName: 'InstanceType'
          }
        ]
      })
      .promise()
    const {
      Options: [{ValueOptions: available}]
    } = response

    const result = await rp({
      uri:
        'https://raw.githubusercontent.com/powdahound/ec2instances.info/master/www/instances.json',
      json: true
    })

    return result
      .filter(data => {
        return available.includes(data.instance_type)
      })
      .map(data => {
        return {
          code: data.instance_type,
          familyName: data.pretty_name.split(' ')[0] + ' - ' + data.family,
          familyCode: data.instance_type.split('.')[0],
          name: data.pretty_name,
          memory: data.memory,
          vcpu: data.vCPU,
          networkPerformance: data.network_performance,
          cost: data.pricing[app.region].linux.ondemand * 100
        }
      })
      .sort((a, b) => {
        return a.cost - b.cost
      })
  }
})
