import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'
import React from 'react'

export default async function(user, token) {
  const url = `${process.env.CLIENT_URL}/verify-email/${token}`

  await sendEmailWithMessage({
    to: await user.email(),
    subject: 'Verify your email in waves',
    content: (
      <div>
        <p>Hi, Welcome to Waves Hosting. Please verify your email by going to the following site</p>
        <a className="button" href={url}>
          Verify email
        </a>
      </div>
    )
  })
}
