import gql from 'graphql-tag'
import {setSession} from '@orion-js/graphql-client'

export default async function() {
  await global.apolloClient.mutate({
    mutation: gql`
      mutation logout {
        logout
      }
    `
  })
  await setSession(null)
}
