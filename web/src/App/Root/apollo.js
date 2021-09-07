import {createClient} from '@orion-js/graphql-client'
import url from './url'
import {InMemoryCache} from 'apollo-cache-inmemory'
import TwoFactorPromptProvider from './TwoFactorPromptProvider'
import {Observable} from 'apollo-link'
import NetworkError from './NetworkError'

global.apolloNetworkErrorComponent = NetworkError

const cache = new InMemoryCache({
  dataIdFromObject: function(object) {
    if (object._id) return object._id
    if (object.id) return object.id
    if (object.__typename === 'Environment') return object.name
    if (object.__typename === 'Version') return object.label
  }
})

const sessionKey = 'waves_session'

export default createClient({
  endpointURL: url,
  useSubscriptions: false,
  cache,
  promptTwoFactorCode: TwoFactorPromptProvider.promptTwoFactor,
  saveSession(session) {
    localStorage.setItem(sessionKey, JSON.stringify(session, null, 2))
  },
  getSession(session) {
    try {
      return JSON.parse(localStorage.getItem(sessionKey))
    } catch (e) {
      return {}
    }
  },
  onError({graphQLErrors, networkError, response, operation, forward}) {
    if (graphQLErrors) {
      for (const graphQLError of graphQLErrors) {
        if (graphQLError.message === 'Rate exceeded') {
          console.log('Rate exceeded, will retry in 3 seconds')
          return new Observable(observer => {
            setTimeout(() => {
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer)
              }
              forward(operation).subscribe(subscriber)
            }, 3000)
          })
        }
      }
    }
  }
})
