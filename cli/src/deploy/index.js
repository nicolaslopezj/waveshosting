import compressDirectory from '../helpers/compressDirectory'
import deployVersion from './deployVersion'
import getBuildDir from './getBuildDir'
import buildApp from './buildApp'
import getApp from './getApp'
import isLoggedIn from '../helpers/call/isLoggedIn'
import login from '../auth/login'
import uploadApp from './uploadApp'
import {startSpinner, stopSpinner} from '../helpers/spinner'
import colors from 'colors'
import selectAppId from './selectAppId'
import selectEnvs from './selectEnvs'
import program from 'commander'

export default async function(appId, {env, build: customBuildScript, description}) {
  if (!program.token && !(await isLoggedIn())) {
    console.log('First, login with your Waves account')
    await login()
  }

  if (!appId) {
    appId = await selectAppId()
  }

  const app = await getApp({appId})

  const buildDir = getBuildDir()
  const buildArchivePath = await buildApp({
    build: customBuildScript || app.platformId,
    buildDir
  })

  startSpinner('Compressing build...')
  const path = await compressDirectory(buildArchivePath, `${buildDir}/archive.zip`)
  stopSpinner()
  console.log(colors.bold('Build prepared'))

  const version = await uploadApp({path, appId, description})

  let envs = null

  if (env) {
    envs = env.split(',')
  } else {
    envs = await selectEnvs(appId)
  }

  if (!envs || !envs.length) return
  for (const env of envs) {
    if (env) {
      await deployVersion({appId, version, env})
    }
  }
}
