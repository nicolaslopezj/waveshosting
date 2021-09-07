export const addSession = function(session) {
  const sessions = getSessions()
  sessions.push(session)
  localStorage.setItem('sessions', JSON.stringify(sessions))
}

export const deleteSession = function(sessionId) {
  const sessions = getSessions()
  for (let i = 0; i < sessions.length; i++) {
    const session = sessions[i]
    if (session._id === sessionId) {
      sessions.splice(i, 1)
      localStorage.setItem('sessions', JSON.stringify(sessions))
      return
    }
  }
}

export const getSessions = function() {
  try {
    return JSON.parse(localStorage.getItem('sessions')) || []
  } catch (e) {
    return []
  }
}
