import {getAuthResolvers} from '@orion-js/auth'
import Users from 'app/collections/Users'
import sendEmailVerificationToken from './sendEmailVerificationToken'
import sendForgotPasswordToken from './sendForgotPasswordToken'
import onCreateUser from './onCreateUser'

export default getAuthResolvers({
  Users,
  sendEmailVerificationToken,
  sendForgotPasswordToken,
  twoFactor: {
    issuer: 'Waves hosting'
  },
  onCreateUser,
  omitNonceCheck: true
})
