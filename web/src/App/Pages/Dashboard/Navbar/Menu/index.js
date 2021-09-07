import React from 'react'
import styles from './styles.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import AdminIcon from 'react-icons/lib/md/control-point'
import LoginIcon from 'react-icons/lib/md/open-in-browser'
import AddCountIcon from 'react-icons/lib/md/person-add'
import OpenMenuIcon from 'react-icons/lib/md/keyboard-arrow-down'
import SettingsIcon from 'react-icons/lib/md/settings'
import SupportIcon from 'react-icons/lib/md/help'
import LogoutIcon from 'react-icons/lib/md/exit-to-app'
import autobind from 'autobind-decorator'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import PropTypes from 'prop-types'
import {withRouter, Link} from 'react-router-dom'
import logout from 'App/helpers/auth/logout'
import withUserId from 'App/helpers/auth/withUserId'
import includes from 'lodash/includes'
import logoutSavingSession from 'App/helpers/auth/logoutSavingSession'
import OtherSessions from './OtherSessions'

@withGraphQL(
  gql`
    query getMe {
      me {
        _id
        name
        email
        roles
      }
    }
  `,
  {
    loading: null
  }
)
@withUserId
@withRouter
export default class User extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    me: PropTypes.object,
    userId: PropTypes.string
  }

  state = {open: false}

  componentDidMount() {
    window.addEventListener('mouseup', this.closeMenu, false)
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.closeMenu)
  }

  @autobind
  async closeMenu(event) {
    if (!this.state.open) return true
    await sleep(100)
    this.setState({open: false})
  }

  @autobind
  toggleMenu() {
    this.setState({open: !this.state.open})
  }

  @autobind
  async logout() {
    await logout()
  }

  @autobind
  async logoutSavingSession() {
    await logoutSavingSession(this.props.me)
  }

  @autobind
  login() {
    this.props.history.push('/login')
  }

  renderAdmin() {
    if (!this.props.me.roles) return
    if (!includes(this.props.me.roles, 'admin')) return
    return (
      <Link to="/admin" className={styles.menuLink}>
        <AdminIcon size={20} />
        <span>Admin</span>
      </Link>
    )
  }

  renderMenu() {
    if (!this.props.me) return
    if (!this.state.open) return
    return (
      <div className={styles.menu} key="menu">
        <Link to="/dashboard" className={styles.account}>
          <div className={styles.name}>{this.props.me.name || 'Account'}</div>
          <div className={styles.email}>{this.props.me.email}</div>
        </Link>
        <a
          href="https://support.waveshosting.com/"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.menuLink}>
          <SupportIcon size={20} />
          <span>Support</span>
        </a>
        <Link to="/settings" className={styles.menuLink}>
          <SettingsIcon size={20} />
          <span>Settings</span>
        </Link>

        <OtherSessions me={this.props.me} />
        <div className={styles.logoutIcons}>
          <a onClick={this.logoutSavingSession} className={styles.menuLink}>
            <AddCountIcon size={20} />
            <div>Add acount</div>
          </a>
          <a onClick={this.logout} className={styles.menuLink}>
            <LogoutIcon size={20} />
            <div>Sign Out</div>
          </a>
        </div>
      </div>
    )
  }

  renderIcon() {
    if (this.props.me) {
      return (
        <div className={styles.menuText} onClick={this.toggleMenu}>
          {this.props.me.name || 'Account'} <OpenMenuIcon />
        </div>
      )
    } else if (!this.props.userId) {
      return <LoginIcon className={styles.icon} size={25} onClick={this.login} />
    }
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderIcon()}
        <ReactCSSTransitionGroup
          transitionName="user-menu"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {this.renderMenu()}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
