import {resolversSchemas} from '@orion-js/graphql'
import Auth from './Auth'
import Users from './Users'
import Credentials from './Credentials'
import Apps from './Apps'
import Info from './Info'
import Environment from './Environment'
import Certificates from './Certificates'
import Subscription from './Subscription'
import StaticWebsite from './StaticWebsite'
import StaticWebsiteEnvironments from './StaticWebsiteEnvironments'
import Tokens from './Tokens'

export default {
  ...Tokens,
  ...StaticWebsiteEnvironments,
  ...StaticWebsite,
  ...Subscription,
  ...Certificates,
  ...Environment,
  ...Info,
  ...Apps,
  ...Credentials,
  ...resolversSchemas,
  ...Auth,
  ...Users
}
