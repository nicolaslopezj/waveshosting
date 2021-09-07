import writeFile from '../../helpers/writeFile'

export default function({buildDir, staticWebsite}) {
  const fileName = `${buildDir}/build/waves-current-version.json`
  const content = `{"version": ${staticWebsite.nextVersionNumber}}`
  writeFile(fileName, content)
}
