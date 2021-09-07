import os from 'os'
import path from 'path'

const env = process.env.WAVES_ENV || 'prod'

export default function() {
  const homeDir = os.homedir()

  const filePath = `.waves/credentials-${env}-v2`

  return path.join(homeDir, filePath)
}
