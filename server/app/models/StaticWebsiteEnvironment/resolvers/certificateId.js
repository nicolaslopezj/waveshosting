import {resolver} from '@orion-js/app'

export default resolver({
  returns: 'ID',
  async resolve(staticWebsiteEnvironment, params, viewer) {
    const config = await staticWebsiteEnvironment.getDistributionConfig()
    const {ViewerCertificate} = config.DistributionConfig
    if (ViewerCertificate.CertificateSource === 'acm') {
      return ViewerCertificate.ACMCertificateArn
    } else {
      return null
    }
  }
})
