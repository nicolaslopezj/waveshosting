import React from 'react'
import apolloClient from './apollo'
import {ApolloProvider} from 'react-apollo'
import OrionsoftProvider from 'orionsoft-parts/lib/components/Provider'
import './locale'
import PropTypes from 'prop-types'
import Intercom from './Intercom'
import HooksApolloProvider from 'apollo-hooks/lib/ApolloProvider'
import TwoFactorPromptProvider from './TwoFactorPromptProvider'
import './versionHelper'
import GA from './GA'
import ApolloErrorHandler from 'App/components/ApolloErrorHandler'

export default class Root extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <HooksApolloProvider client={apolloClient}>
          <ApolloErrorHandler>
            <OrionsoftProvider meProvider={false}>
              <Intercom>
                <TwoFactorPromptProvider>{this.props.children}</TwoFactorPromptProvider>
              </Intercom>
            </OrionsoftProvider>
            <GA />
          </ApolloErrorHandler>
        </HooksApolloProvider>
      </ApolloProvider>
    )
  }
}
