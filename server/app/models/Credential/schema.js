export default {
  _id: {
    type: 'ID'
  },
  userId: {
    type: String,
    private: true
  },
  name: {
    type: String
  },
  accessKeyId: {
    type: String,
    private: true
  },
  secretAccessKey: {
    type: String,
    private: true
  },
  createdAt: {
    type: Date
  }
}
