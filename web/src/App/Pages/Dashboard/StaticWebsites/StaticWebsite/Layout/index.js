import React from 'react'
import MainLayout from '../../Layout'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'

@withRouter
export default class Layout extends React.Component {
  static propTypes = {
    router: PropTypes.object,
    match: PropTypes.object,
    title: PropTypes.node,
    past: PropTypes.object
  }

  render() {
    const {staticWebsiteId} = this.props.match.params
    if (this.props.title) {
      const past = {
        '/dashboard/static-websites': 'Static Websites',
        ['/dashboard/static-websites/' + staticWebsiteId]: staticWebsiteId,
        ...this.props.past
      }
      return <MainLayout {...this.props} past={past} />
    } else {
      const past = {
        '/dashboard/static-websites': 'Static Websites'
      }
      const getPath = ending => `/dashboard/static-websites/${staticWebsiteId}${ending}`
      const tabs = [
        {title: 'Environments', path: getPath('')},
        {title: 'Versions', path: getPath('/versions')},
        {title: 'Configuration', path: getPath('/configuration')}
      ]
      return <MainLayout title={staticWebsiteId} {...this.props} past={past} tabs={tabs} />
    }
  }
}
