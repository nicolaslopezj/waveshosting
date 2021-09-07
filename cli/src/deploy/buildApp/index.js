import execute from '../../helpers/execute'
import getScriptToRun from './getScriptToRun'
import colors from 'colors'
import copyExtensions from './copyExtensions'

export default async function({build, buildDir}) {
  console.log(colors.bold('Building app...'))

  const appDir = process.cwd()
  const script = await getScriptToRun({build, buildDir})
  const env = Object.assign(process.env, {
    BUILD_DIR: buildDir,
    APP_DIR: appDir
  })

  await execute(script, {
    env,
    cwd: appDir,
    detached: true,
    stdio: 'inherit'
  })

  await copyExtensions({buildDir, appDir})

  console.log(colors.bold('App built'))

  return `${buildDir}/build`
}
