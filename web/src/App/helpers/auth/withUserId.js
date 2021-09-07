import React from 'react'
import withSession from './withSession'
import PropTypes from 'prop-types'

export default function(ComposedComponent) {
  class WithUserId extends React.Component {
    static propTypes = {
      session: PropTypes.object
    }

    render() {
      const {userId} = this.props.session
      return <ComposedComponent {...this.props} userId={userId} />
    }
  }

  return withSession(WithUserId)
}
