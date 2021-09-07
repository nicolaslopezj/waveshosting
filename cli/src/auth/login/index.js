import inquirer from 'inquirer'
import call from '../../helpers/call'
import addCredential from '../../helpers/call/addCredential'

export default async function() {
  const {email, password} = await inquirer.prompt([
    {name: 'email', message: 'Email'},
    {name: 'password', message: 'Password', type: 'password'}
  ])

  const query = `mutation login($email: String, $password: String) {
    credentials: loginWithPassword(email: $email, password: $password) {
      _id
      publicKey
      secretKey
      user {
        _id
        name
        email
      }
    }
  }`

  const {credentials} = await call(query, {email, password}, {skipSession: true})

  console.log('Logged in correctly')

  addCredential(credentials)
}
