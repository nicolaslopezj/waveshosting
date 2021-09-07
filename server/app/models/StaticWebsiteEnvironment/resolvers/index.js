import credential from './credential'
import cloudfront from './cloudfront'
import s3 from './s3'
import staticWebsite from './staticWebsite'
import cname from './cname'
import certificateId from './certificateId'
import getDistributionConfig from './getDistributionConfig'
import domains from './domains'
import enabled from './enabled'
import status from './status'

export default {
  status,
  enabled,
  domains,
  getDistributionConfig,
  certificateId,
  cname,
  staticWebsite,
  cloudfront,
  credential,
  s3
}
