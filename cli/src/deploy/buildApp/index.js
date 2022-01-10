import execute from '../../helpers/execute'
import getScriptToRun from './getScriptToRun'
import chalk from 'chalk'
import copyExtensions from './copyExtensions'

export default async function ({build, buildDir}) {
  console.log(chalk.bold('Building app...'))

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

  console.log(chalk.bold('App built'))

  return `${buildDir}/build`
}
