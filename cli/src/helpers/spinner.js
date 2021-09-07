import ora from 'ora'
import cliSpinners from 'cli-spinners'

let spinner = null

export const startSpinner = function(text) {
  if (!spinner) {
    spinner = ora()
  }
  spinner.text = text
  spinner.spinner = cliSpinners.dots

  spinner.start()
}

export const stopSpinner = function(error) {
  if (!spinner) return
  if (error) {
    spinner.fail()
  } else {
    spinner.stop()
  }

  spinner = null
}
