import {resolver} from '@orion-js/app'
import Version from 'app/models/Version'
import init from 'app/models/Version/init'

export default resolver({
  returns: [Version],
  async resolve(app, params, viewer) {
    const beanstalk = await app.beanstalk()
    const {ApplicationVersions} = await beanstalk
      .describeApplicationVersions({ApplicationName: app._id})
      .promise()

    const {Environments: enviroments} = await beanstalk
      .describeEnvironments({ApplicationName: app._id})
      .promise()

    return ApplicationVersions.map(version => init(version, enviroments))
  }
})
