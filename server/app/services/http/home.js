import {route} from '@orion-js/app'
import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'
import React from 'react'

route('/', async function() {
  return 'Hello world'
})

route('/test-email', async function() {
  await sendEmailWithMessage({
    to: 'nicolaslopezj@me.com',
    subject: 'Credit was added to your account',
    content: (
      <div>
        <p>Hi, ${2000 * 0.01} where added to your account.</p>
        <p>{'message'}</p>
      </div>
    )
  })
})
