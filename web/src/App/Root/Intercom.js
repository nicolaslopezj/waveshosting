import React from 'react'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import isEqual from 'lodash/isEqual'
import getEnv from './getEnv'

const appId = getEnv() === 'prod' ? 'lgrw58ef' : 'qnwwl6al'

@withGraphQL(
  gql`
    query getUserForIntercom {
      me {
        _id
        email
        name
        profile {
          firstName
          lastName
        }
        createdAt
        intercomHash
      }
    }
  `,
  {loading: null}
)
export default class IntercomProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    me: PropTypes.object
  }

  state = {}

  getUser() {
    const user = this.props.me
    if (!user) return
    return {
      user_id: user._id,
      email: user.email,
      created_at: Math.round(new Date(user.createdAt) * 0.001),
      name: user.name,
      first_name: user.profile.firstName,
      last_name: user.profile.lastName,
      user_hash: user.intercomHash
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.me, this.props.me)) {
      this.updateIntercom()
    }
  }

  componentDidMount() {
    window.Intercom('boot', {
      app_id: appId,
      ...this.getUser()
    })
  }

  updateIntercom() {
    window.Intercom('shutdown')
    window.Intercom('boot', {
      app_id: appId,
      ...this.getUser()
    })
  }

  render() {
    return this.props.children
  }
}
