export default {
  _id: {
    type: 'ID'
  },
  staticWebsiteId: {
    type: 'ID'
  },
  number: {
    type: Number
  },
  description: {
    type: String,
    optional: true
  },
  archiveKey: {
    type: String
  },
  createdAt: {
    type: Date
  }
}
