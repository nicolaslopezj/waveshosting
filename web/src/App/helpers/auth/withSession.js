import React from 'react'
import {getSession} from '@orion-js/graphql-client'
import autobind from 'autobind-decorator'

export default function(ComposedComponent) {
  class WithSession extends React.Component {
    componentDidMount() {
      global.apolloClient.onResetStore(this.onResetStore)
    }

    @autobind
    onResetStore() {
      try {
        this.forceUpdate()
      } catch (e) {}
    }

    render() {
      const session = getSession() || {}
      return <ComposedComponent {...this.props} session={session} />
    }
  }

  return WithSession
}
