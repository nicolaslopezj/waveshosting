import {resolver} from '@orion-js/app'
import Certificate from 'app/models/Certificate'
import Credentials from 'app/collections/Credentials'
import AWS from 'aws-sdk'
import init from 'app/models/Certificate/init'

export default resolver({
  params: {
    certificateId: {
      type: 'ID'
    },
    credentialId: {
      type: 'ID'
    },
    region: {
      type: 'ID'
    }
  },
  returns: Certificate,
  async checkPermission({credentialId, region}, viewer) {
    const credential = await Credentials.findOne({_id: credentialId, userId: viewer.userId})
    return credential ? '' : 'notAllowed'
  },
  async resolve({certificateId, credentialId, region}, viewer) {
    const credential = await Credentials.findOne(credentialId)
    const acm = new AWS.ACM({
      accessKeyId: credential.accessKeyId,
      secretAccessKey: credential.secretAccessKey,
      region: region
    })

    const details = await acm
      .describeCertificate({CertificateArn: decodeURIComponent(certificateId)})
      .promise()
    return init(details.Certificate)
  }
})
