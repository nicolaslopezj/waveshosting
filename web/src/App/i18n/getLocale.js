const getBrowserLang = function() {
  const full = navigator.language || navigator.userLanguage
  const parts = full.split('-')
  return parts[0]
}

const getSavedLang = function() {
  return window.localStorage.locale
}

const getUserLang = function(user) {
  if (!user) return
  if (!user.profile) return
  if (!user.profile.language) return
  return user.profile.language
}

const getForcedLang = function() {
  return 'en'
}

export default function(user) {
  return getForcedLang() || getUserLang(user) || getSavedLang() || getBrowserLang()
}
