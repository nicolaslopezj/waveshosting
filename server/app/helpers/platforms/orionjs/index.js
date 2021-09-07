import getDefaultOptions from './getDefaultOptions'
import getOptions from './getOptions'
import basicEnvironmentVariablesSchema from './basicEnvironmentVariablesSchema'

export default {
  name: 'Orionjs',
  color: '#0f2027',
  language: 'Node',
  beanstalkSolutionStackName: 'Node.js',
  createSchema: {},
  appLogs: 'nodejs/nodejs',
  getOptions,
  getDefaultOptions,
  basicEnvironmentVariablesSchema
}
