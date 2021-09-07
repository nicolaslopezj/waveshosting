import {setSession, getSession} from '@orion-js/graphql-client'
import {addSession} from './otherSessions'

export default async function(user) {
  const currentSession = getSession()
  currentSession.user = user
  addSession(currentSession)
  await setSession(null)
}
