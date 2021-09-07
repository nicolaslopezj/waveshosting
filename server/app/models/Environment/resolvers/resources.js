import {resolver} from '@orion-js/app'

export default resolver({
  params: {},
  returns: String,
  cache: 4000,
  async resolve(environment, params, viewer) {
    const app = await environment.app()
    const beanstalk = await app.beanstalk()
    const {EnvironmentResources} = await beanstalk
      .describeEnvironmentResources({
        EnvironmentName: environment.name
      })
      .promise()

    const lb = EnvironmentResources.LoadBalancers[0]
    const autogroup = EnvironmentResources.AutoScalingGroups[0]

    const data = {
      environmentName: EnvironmentResources.EnvironmentName,
      autoScalingGroup: autogroup ? autogroup.Name : null,
      instances: EnvironmentResources.Instances.map(i => i.Id),
      loadBalancer: lb ? lb.Name : null
    }

    return data
  }
})
