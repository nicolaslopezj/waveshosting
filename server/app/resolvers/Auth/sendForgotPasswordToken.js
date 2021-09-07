import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'
import React from 'react'

export default async function(user, token) {
  const url = `${process.env.CLIENT_URL}/reset/${token}`

  await sendEmailWithMessage({
    to: await user.email(),
    subject: 'Recover your password',
    content: (
      <div>
        <p>Hi, to create a new password go to the following site</p>
        <a className="button" href={url}>
          Recover password
        </a>
      </div>
    )
  })
}
