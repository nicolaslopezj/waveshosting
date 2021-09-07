import os from 'os'
import generateId from '../helpers/generateId'
import ensureDirectory from '../helpers/ensureDirectory'

export default function() {
  const id = generateId()
  const tempDir = os.tmpdir()

  const buildDir = `${tempDir}/waves-build-${id}`
  ensureDirectory(buildDir + '/build.txt')
  return buildDir
}
