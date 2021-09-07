import intercom from './intercom'
import ga from './ga'
import pixel from './pixel'
import getEnv from 'App/Root/getEnv'

export default function(...args) {
  if (getEnv() === 'dev') return console.warn('EVENT', ...args)
  intercom(...args)
  ga(...args)
  pixel(...args)
}
