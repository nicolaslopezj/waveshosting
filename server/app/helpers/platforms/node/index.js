import getDefaultOptions from './getDefaultOptions'
import getOptions from './getOptions'
import createSchema from './createSchema'

export default {
  name: 'Node',
  color: '#23d160',
  language: 'Node',
  beanstalkSolutionStackName: 'Node.js',
  appLogs: 'nodejs/nodejs',
  createSchema,
  getOptions,
  getDefaultOptions
}
