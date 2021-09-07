import {resolver} from '@orion-js/app'
import Certificate from 'app/models/Certificate'
import init from 'app/models/Certificate/init'
import AWS from 'aws-sdk'
import Credentials from 'app/collections/Credentials'
import checkAppPermission from 'app/helpers/checkAppPermission'
import checkStaticWebsitePermission from 'app/helpers/checkStaticWebsitePermission'
import Apps from 'app/collections/Apps'
import StaticWebsites from 'app/collections/StaticWebsites'

export default resolver({
  params: {
    appId: {
      type: 'ID',
      optional: true
    },
    staticWebsiteId: {
      type: 'ID',
      optional: true
    },
    credentialId: {
      type: 'ID',
      optional: true
    },
    region: {
      type: 'ID',
      optional: true
    },
    statuses: {
      type: [String],
      optional: true
    }
  },
  returns: [Certificate],
  async checkPermission({appId, staticWebsiteId, credentialId, region}, viewer) {
    if (appId) {
      return await checkAppPermission({appId}, viewer)
    } else if (staticWebsiteId) {
      return await checkStaticWebsitePermission({staticWebsiteId}, viewer)
    } else {
      if (!region) return 'notAllowed'
      const credential = await Credentials.findOne({_id: credentialId, userId: viewer.userId})
      return credential ? '' : 'notAllowed'
    }
  },
  async resolve({appId, staticWebsiteId, credentialId, region, statuses}, viewer) {
    if (appId) {
      const app = await Apps.findOne(appId)
      credentialId = app.credentialId
      region = app.region
    } else if (staticWebsiteId) {
      const staticWebsite = await await StaticWebsites.findOne(staticWebsiteId)
      credentialId = staticWebsite.credentialId
      region = staticWebsite.region
    }

    const credential = await Credentials.findOne(credentialId)
    const acm = new AWS.ACM({
      accessKeyId: credential.accessKeyId,
      secretAccessKey: credential.secretAccessKey,
      region: region
    })

    const result = await acm
      .listCertificates({
        MaxItems: 200,
        CertificateStatuses: statuses || null
      })
      .promise()
    const promises = result.CertificateSummaryList.map(async cert => {
      const details = await acm.describeCertificate({CertificateArn: cert.CertificateArn}).promise()
      return init(details.Certificate)
    })
    return Promise.all(promises)
  }
})
