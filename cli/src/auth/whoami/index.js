import call from '../../helpers/call'

export default async function(options) {
  const {me} = await call(`query { me {email} }`)

  if (me) {
    console.log(`You are logged in as ${me.email}`)
  } else {
    console.log('You are not logged in')
  }
}
