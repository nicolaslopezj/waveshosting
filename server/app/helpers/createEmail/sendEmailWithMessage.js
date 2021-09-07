import {sendEmail} from '@orion-js/mailing'
import createEmail from './index'

export default async function({content, ...options}) {
  return await sendEmail({
    ...options,
    text: null,
    html: await createEmail(content)
  })
}
