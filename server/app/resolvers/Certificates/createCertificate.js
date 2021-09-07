import {resolver, generateId} from '@orion-js/app'
import Certificate from 'app/models/Certificate'
import init from 'app/models/Certificate/init'
import AWS from 'aws-sdk'
import Credentials from 'app/collections/Credentials'
import parse from 'parse-domain'

export default resolver({
  params: {
    credentialId: {
      type: 'ID'
    },
    region: {
      type: 'ID'
    },
    domains: {
      type: [String],
      autoValue(domains) {
        return (domains || []).map(domain => domain.toLowerCase())
      }
    },
    validationMethod: {
      type: String,
      allowedValues: ['EMAIL', 'DNS']
    }
  },
  returns: Certificate,
  mutation: true,
  async checkPermission({credentialId, region}, viewer) {
    const credential = await Credentials.findOne({_id: credentialId, userId: viewer.userId})
    return credential ? '' : 'notAllowed'
  },
  async resolve({credentialId, region, domains, validationMethod}, viewer) {
    const credential = await Credentials.findOne({_id: credentialId, userId: viewer.userId})
    const acm = new AWS.ACM({
      accessKeyId: credential.accessKeyId,
      secretAccessKey: credential.secretAccessKey,
      region: region
    })
    const [firstDomain, ...otherDomains] = domains

    const validationOptions = domains.map(url => {
      const {domain, tld} = parse(url)
      return {
        DomainName: url,
        ValidationDomain: `${domain}.${tld}`
      }
    })

    try {
      const result = await acm
        .requestCertificate({
          DomainName: firstDomain,
          ValidationMethod: validationMethod,
          DomainValidationOptions: validationOptions,
          IdempotencyToken: generateId(),
          SubjectAlternativeNames: otherDomains.length ? otherDomains : undefined
        })
        .promise()
      const details = await acm
        .describeCertificate({CertificateArn: result.CertificateArn})
        .promise()

      return init(details.Certificate)
    } catch (error) {
      if (error.code === 'AccessDeniedException') {
        throw new Error(
          'The credential of this app is not allowed to create certificates. Please add the permission "AWSCertificateManagerFullAccess" in AWS "My security credentials"'
        )
      }
      console.log(JSON.stringify(error, null, 2))
      throw error
    }
  }
})
