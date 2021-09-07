import createReactApp from './createReactApp'
import basic from './basic'
import docusaurus from './docusaurus'

const platforms = {
  createReactApp,
  basic,
  docusaurus
}

Object.keys(platforms).map(_id => {
  const data = platforms[_id]
  platforms[_id] = {_id, ...data}
})

export default platforms
