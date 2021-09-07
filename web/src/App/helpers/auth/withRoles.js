import React from 'react'
import withSession from './withSession'
import PropTypes from 'prop-types'

export default function(ComposedComponent) {
  class WithUserId extends React.Component {
    static propTypes = {
      session: PropTypes.object
    }

    render() {
      const {roles} = this.props.session
      return <ComposedComponent {...this.props} roles={roles || []} />
    }
  }

  return withSession(WithUserId)
}
