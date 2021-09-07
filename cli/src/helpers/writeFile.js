import fs from 'fs'
import ensureDirectory from '../helpers/ensureDirectory'

export default function(path, content) {
  ensureDirectory(path)
  fs.writeFileSync(path, content)
}
