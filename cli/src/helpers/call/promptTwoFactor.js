import inquirer from 'inquirer'

export default async function() {
  const {code} = await inquirer.prompt([{name: 'code', message: 'Two factor code'}])

  return code
}
