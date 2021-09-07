import Environment from 'app/models/Environment'

export default {
  label: {
    type: String
  },
  status: {
    type: String
  },
  createdAt: {
    type: Date
  },
  description: {
    type: String
  },
  deployedInEnvironments: {
    type: [Environment]
  }
}
