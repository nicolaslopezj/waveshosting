import getOptions from './getOptions'
import createSchema from './createSchema'
import getDefaultOptions from './getDefaultOptions'

export default {
  name: 'Ruby on Rails',
  color: '#c50001',
  language: 'Ruby',
  beanstalkSolutionStackName: 'Ruby',
  params: {
    SolutionStackName: '64bit Amazon Linux 2018.03 v2.8.1 running Ruby 2.4 (Passenger Standalone)'
  },
  createSchema,
  getOptions,
  getDefaultOptions
}
