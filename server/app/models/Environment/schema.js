export default {
  _id: {
    type: 'ID',
    private: true
  },
  name: {
    type: String
  },
  appId: {
    type: 'ID'
  },
  platform: {
    type: String
  },
  endpointURL: {
    type: String
  },
  awsCNAME: {
    type: String,
    private: true
  },
  status: {
    type: String
  },
  health: {
    type: String
  },
  deployedVersionLabel: {
    type: String
  }
}
