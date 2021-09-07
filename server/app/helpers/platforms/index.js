import react from './react'
import orionjs from './orionjs'
import meteor from './meteor'
import rails from './rails'
import node from './node'

const platforms = {
  node,
  orionjs,
  react,
  meteor,
  rails
}

Object.keys(platforms).map(_id => {
  const data = platforms[_id]
  platforms[_id] = {_id, ...data}
})

export default platforms
