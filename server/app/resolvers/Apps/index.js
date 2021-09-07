import createApp from './createApp'
import apps from './apps'
import app from './app'
import generateUploadSpot from './generateUploadSpot'
import createNewVersion from './createNewVersion'
import deployVersion from './deployVersion'
import environment from './environment'
import setVersionDescription from './setVersionDescription'
import deleteApp from './deleteApp'
import transferApp from './transferApp'
import cancelAppTransfer from './cancelAppTransfer'
import transferRequests from './transferRequests'
import acceptAppTransfer from './acceptAppTransfer'
import rejectAppTransfer from './rejectAppTransfer'
import addUserToApp from './addUserToApp'
import removeUserFromApp from './removeUserFromApp'
import deleteVersion from './deleteVersion'

export default {
  deleteVersion,
  removeUserFromApp,
  addUserToApp,
  rejectAppTransfer,
  acceptAppTransfer,
  transferRequests,
  cancelAppTransfer,
  transferApp,
  deleteApp,
  setVersionDescription,
  environment,
  deployVersion,
  createNewVersion,
  generateUploadSpot,
  app,
  apps,
  createApp
}
