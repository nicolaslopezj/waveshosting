// include this file if your app is deployed with Waves static websites

let tries = 0

const checkVersion = async function() {
  const path = '/waves-current-version.json'
  try {
    const response = await fetch(path)
    const {version} = await response.json()
    saveVersion(version)
  } catch (e) {
    // saveVersion(3)
  }
}

const saveNewVersion = function(newVersion) {
  localStorage.setItem('clientVersion', newVersion)
}

const loadNewVersion = function(newVersion) {
  saveNewVersion(newVersion)
  window.location.reload(true)
}

const saveVersion = function(newVersion) {
  const oldVersion = localStorage.getItem('clientVersion')
  if (!Number(newVersion)) return
  if (!oldVersion) {
    console.log('no old version saved')
    saveNewVersion(newVersion)
  } else if (Number(oldVersion) !== Number(newVersion)) {
    console.log(`upgrading from version ${oldVersion} to ${newVersion}`)
    if (
      tries === 0 ||
      global.confirm('A new version of this app is available. Do you want to update now?')
    ) {
      loadNewVersion(newVersion)
    } else {
      clearInterval(checkVersion)
    }
  }
  tries++
}

checkVersion()
setInterval(checkVersion, 30000)
