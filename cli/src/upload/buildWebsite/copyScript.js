import writeFile from '../../helpers/writeFile'

export default async function({content, buildDir}) {
  const path = buildDir + '/script.sh'
  writeFile(path, content)

  return `sh ${path}`
}
