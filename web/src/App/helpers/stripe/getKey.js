import getEnv from 'App/Root/getEnv'

const env = getEnv()

const keys = {
  local: 'pk_test_MvfDNlXYghVwq6Il3nBOPdz5',
  dev: 'pk_test_MvfDNlXYghVwq6Il3nBOPdz5',
  prod: 'pk_live_ZELLjoXH4wiXNqAgN77h1Mqi'
}

export default function() {
  return keys[env]
}
