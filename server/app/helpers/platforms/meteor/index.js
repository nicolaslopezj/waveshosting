import getOptions from './getOptions'
import createSchema from './createSchema'
import getDefaultOptions from './getDefaultOptions'
import basicEnvironmentVariablesSchema from './basicEnvironmentVariablesSchema'

export default {
  name: 'Meteor',
  color: '#de4f4f',
  language: 'Node',
  beanstalkSolutionStackName: 'Node.js',
  appLogs: 'nodejs/nodejs',
  createSchema,
  getOptions,
  getDefaultOptions,
  basicEnvironmentVariablesSchema
}
