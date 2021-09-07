#!/usr/bin/env node

import program from 'commander'
import deploy from './deploy'
import login from './auth/login'
import logout from './auth/logout'
import whoami from './auth/whoami'
import colors from 'colors/safe'
import checkVersion from './helpers/checkVersion'
import {stopSpinner} from './helpers/spinner'
import upload from './upload'

const run = function(action) {
  return async function(...args) {
    try {
      await checkVersion()
      await action(...args)
    } catch (error) {
      stopSpinner(true)
      if (process.env.WAVES_ENV === 'local') {
        console.error(colors.red(error.stack))
      } else {
        console.error(colors.red('Error: ' + error.message))
      }
    }
  }
}

program
  .command('deploy [appName]')
  .description('Deploys a new version of an app')
  .option(
    '--env [environment]',
    "Specify the app's environment to deploy the code, if it's not passed, the code will only be uploaded"
  )
  .option('--build [path]', 'Specify a custom build script')
  .option('--description [description]', 'Specify a description for this version')
  .action(run(deploy))

program
  .command('upload [websiteName]')
  .description('Uploads a new version of a static website')
  .option(
    '--env [environment]',
    "Specify the website's environment to deploy the content, if it's not passed, the content will only be uploaded"
  )
  .option('--build [path]', 'Specify a custom build script')
  .option('--description [description]', 'Specify a description for this version')
  .action(run(upload))

program
  .command('login')
  .description('Login with your waves account')
  .action(run(login))

program
  .command('logout')
  .description('Logout your account')
  .action(run(logout))

program
  .command('whoami')
  .description('Returns the logged in user')
  .action(run(whoami))

program.option('--account [account]', 'Specify a Waves account')
program.option('--token [token]', 'Specify a Waves token')

program.version(require('../package.json').version)

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
