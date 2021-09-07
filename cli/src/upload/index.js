import compressDirectory from '../helpers/compressDirectory'
import deployVersion from './deployVersion'
import buildWebsite from './buildWebsite'
import isLoggedIn from '../helpers/call/isLoggedIn'
import login from '../auth/login'
import uploadStaticWebsite from './uploadStaticWebsite'
import {startSpinner, stopSpinner} from '../helpers/spinner'
import colors from 'colors'
import selectStaticWebsiteId from './selectStaticWebsiteId'
import selectEnvs from './selectEnvs'
import getBuildDir from '../deploy/getBuildDir'
import getStaticWebsite from './getStaticWebsite'
import program from 'commander'

export default async function (staticWebsiteId, {env, build: customBuildScript, description}) {
  if (!program.token && !(await isLoggedIn())) {
    console.log('First, login with your Waves account')
    await login()
  }

  if (!staticWebsiteId) {
    staticWebsiteId = await selectStaticWebsiteId()
  }

  const staticWebsite = await getStaticWebsite({staticWebsiteId})

  const buildDir = getBuildDir()
  const buildArchivePath = await buildWebsite({
    build: customBuildScript || staticWebsite.platformId,
    buildDir,
    staticWebsite
  })

  startSpinner('Compressing build...')
  const path = await compressDirectory(buildArchivePath, `${buildDir}/archive.zip`)
  stopSpinner()
  console.log(colors.bold('Build prepared'))

  const version = await uploadStaticWebsite({path, staticWebsiteId, description})

  let envs = null

  if (env) {
    envs = env.split(',')
  } else {
    envs = await selectEnvs(staticWebsiteId)
  }

  if (!envs || !envs.length) return
  for (const env of envs) {
    if (env) {
      await deployVersion({staticWebsiteId, version, env})
    }
  }
}
