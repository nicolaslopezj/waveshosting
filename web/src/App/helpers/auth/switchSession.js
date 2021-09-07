import {deleteSession, addSession} from './otherSessions'
import {setSession, getSession} from '@orion-js/graphql-client'

export default async function(session, user) {
  const currentSession = getSession()
  currentSession.user = user
  addSession(currentSession)
  deleteSession(session._id)
  await setSession(session)
}
