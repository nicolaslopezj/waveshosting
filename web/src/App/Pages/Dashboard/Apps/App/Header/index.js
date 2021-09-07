import React from 'react'
import styles from './styles.css'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Tabs from 'orionsoft-parts/lib/components/Tabs'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import Loading from 'orionsoft-parts/lib/components/Loading'

@withRouter
export default class Header extends React.Component {
  static propTypes = {
    router: PropTypes.object,
    children: PropTypes.node,
    match: PropTypes.object,
    status: PropTypes.string
  }

  renderChildren() {
    const {appId} = this.props.match.params
    if (this.props.children) {
      return (
        <Breadcrumbs past={{'/dashboard': 'My Apps', [`/dashboard/apps/${appId}`]: appId}}>
          {this.props.children}
        </Breadcrumbs>
      )
    } else {
      return <Breadcrumbs past={{'/dashboard': 'My Apps'}}>{appId}</Breadcrumbs>
    }
  }

  renderStatus() {
    if (this.props.status !== 'Updating') return
    return (
      <div className={styles.updating}>
        <Loading size={18} color="#666" />
        <div className={styles.updatingText}>Your app is updating</div>
      </div>
    )
  }

  render() {
    const {appId} = this.props.match.params
    if (this.props.children) {
      return (
        <Breadcrumbs
          right={this.renderStatus()}
          past={{'/dashboard': 'My Apps', [`/dashboard/apps/${appId}`]: appId}}>
          {this.props.children}
        </Breadcrumbs>
      )
    }

    const getPath = ending => `/dashboard/apps/${appId}${ending}`
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{'/dashboard': 'My Apps'}} right={this.renderStatus()}>
          {appId}
        </Breadcrumbs>
        <br />
        <Tabs
          items={[
            {title: 'Environments', path: getPath('')},
            {title: 'Versions', path: getPath('/versions')},
            {title: 'Access', path: getPath('/access')},
            {title: 'Configuration', path: getPath('/configuration')}
          ]}
        />
      </div>
    )
  }
}
