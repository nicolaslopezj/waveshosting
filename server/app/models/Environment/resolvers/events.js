import {resolver} from '@orion-js/app'
import Event from 'app/models/Event'
import init from 'app/models/Event/init'

export default resolver({
  params: {},
  returns: [Event],
  mutation: false,
  cache: 4000,
  async resolve(environment, params, viewer) {
    const app = await environment.app()
    const beanstalk = await app.beanstalk()
    const {Events: events} = await beanstalk
      .describeEvents({
        EnvironmentName: environment.name,
        ApplicationName: app._id,
        MaxRecords: 30
      })
      .promise()
    return events.map(event => init(event))
  }
})
