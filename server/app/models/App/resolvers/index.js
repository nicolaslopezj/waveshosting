import beanstalk from './beanstalk'
import environments from './environments'
import credential from './credential'
import bucketName from './bucketName'
import versions from './versions'
import platform from './platform'
import environment from './environment'
import updateEnvironmentSettings from './updateEnvironmentSettings'
import cloudwatch from './cloudwatch'
import cloudwatchlogs from './cloudwatchlogs'
import user from './user'
import collaborators from './collaborators'
import isOwner from './isOwner'
import owner from './owner'

export default {
  owner,
  isOwner,
  collaborators,
  user,
  cloudwatch,
  environment,
  platform,
  versions,
  bucketName,
  credential,
  environments,
  beanstalk,
  updateEnvironmentSettings,
  cloudwatchlogs
}
