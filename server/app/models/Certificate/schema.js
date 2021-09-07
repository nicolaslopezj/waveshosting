import {Model} from '@orion-js/app'

const ResourceRecord = new Model({
  name: 'DomainValidationResourceRecord',
  schema: {
    name: {
      type: String
    },
    type: {
      type: String
    },
    value: {
      type: String
    }
  }
})

const DomainValidationOptions = new Model({
  name: 'DomainValidationOptions',
  schema: {
    domainName: {
      type: String
    },
    validationStatus: {
      type: String
    },
    validationMethod: {
      type: String
    },
    validationEmails: {
      type: [String]
    },
    resourceRecord: {
      type: ResourceRecord
    }
  }
})

export default {
  _id: {
    type: 'ID'
  },
  domains: {
    type: [String]
  },
  createdAt: {
    type: Date
  },
  issuedAt: {
    type: Date
  },
  status: {
    type: String
  },
  inUse: {
    type: Boolean
  },
  domainValidationOptions: {
    type: [DomainValidationOptions]
  }
}
