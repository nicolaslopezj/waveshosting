import UserProfile from './UserProfile'
import UserEmail from './UserEmail'

export default {
  _id: {
    type: 'ID'
  },
  emails: {
    type: [UserEmail]
  },
  createdAt: {
    type: Date
  },
  services: {
    type: 'blackbox',
    private: true
  },
  profile: {
    type: UserProfile
  },
  roles: {
    type: ['ID'],
    optional: true
  },
  referralCode: {
    type: String,
    optional: true
  },
  referredById: {
    type: 'ID',
    optional: true
  },
  referralStatus: {
    type: 'blackbox',
    private: true,
    optional: true
  }
}
