import {setCorsOptions} from '@orion-js/app'
import {startGraphQL} from '@orion-js/graphql'
import resolvers from 'app/resolvers'

startGraphQL({
  resolvers
})

setCorsOptions({
  origin: '*'
})
