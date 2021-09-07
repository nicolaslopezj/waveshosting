export default {
  _id: {
    type: 'ID'
  },
  name: {
    type: String,
    validate(name) {
      if (!/^[a-z0-9-]+$/g.test(name)) return 'invalid'
    }
  },
  staticWebsiteId: {
    type: 'ID'
  },
  distributionId: {
    type: 'ID',
    optional: true
  },
  bucketName: {
    type: 'ID',
    optional: true
  },
  deployedVersionNumber: {
    type: Number,
    optional: true
  }
}
