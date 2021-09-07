import model from './index'
import union from 'lodash/union'

export default function(data) {
  const item = {
    _id: data.CertificateArn,
    domains: union([data.DomainName], data.SubjectAlternativeNames || []),
    createdAt: data.CreatedAt,
    issuedAt: data.IssuedAt,
    status: data.Status,
    inUse: data.InUseBy.length !== 0,
    domainValidationOptions: data.DomainValidationOptions.map(options => {
      return {
        domainName: options.DomainName,
        validationStatus: options.ValidationStatus,
        resourceRecord: options.ResourceRecord
          ? {
              name: options.ResourceRecord.Name,
              type: options.ResourceRecord.Type,
              value: options.ResourceRecord.Value
            }
          : null,
        validationMethod: options.ValidationMethod,
        validationEmails: options.ValidationEmails
      }
    })
  }
  return model.initItem(item)
}
