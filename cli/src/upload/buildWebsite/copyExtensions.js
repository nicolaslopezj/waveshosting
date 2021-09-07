import fs from 'fs'
import ensureDirectory from '../../helpers/ensureDirectory'

export default function({buildDir, appDir}) {
  const fromFolder = appDir + '/.ebextensions'
  const toFolder = buildDir + '/build/.ebextensions'
  if (!fs.existsSync(fromFolder)) return
  ensureDirectory(toFolder + '/afile.config')

  const files = fs.readdirSync(fromFolder)

  for (const file of files) {
    fs.createReadStream(fromFolder + '/' + file).pipe(fs.createWriteStream(toFolder + '/' + file))
  }
}
