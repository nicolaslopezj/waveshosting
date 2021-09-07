import rp from 'request-promise'
import writeFile from '../../helpers/writeFile'

export default async function({url, buildDir}) {
  const content = await rp(url)
  const path = buildDir + '/script.sh'
  writeFile(path, content)

  return `sh ${path}`
}
