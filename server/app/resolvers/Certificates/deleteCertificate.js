import {resolver} from '@orion-js/app'
import AWS from 'aws-sdk'
import Credentials from 'app/collections/Credentials'

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
  returns: Boolean,
  mutation: true,
  requireTwoFactor: true,
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

    await acm.deleteCertificate({CertificateArn: decodeURIComponent(certificateId)}).promise()
    return true
  }
})
