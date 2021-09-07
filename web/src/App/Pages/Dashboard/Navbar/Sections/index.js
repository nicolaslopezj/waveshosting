import React from 'react'
import styles from './styles.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import OpenMenuIcon from 'react-icons/lib/md/keyboard-arrow-down'
import autobind from 'autobind-decorator'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import PropTypes from 'prop-types'
import {withRouter, Link} from 'react-router-dom'
import AppsIcon from 'react-icons/lib/md/dns'
import WebsitesIcon from 'react-icons/lib/md/language'
import CertificatesIcon from 'react-icons/lib/md/https'

const links = [
  {
    icon: <AppsIcon size={20} />,
    title: 'Apps',
    path: '/dashboard/apps'
  },
  {
    icon: <WebsitesIcon size={20} />,
    title: 'Static Websites',
    path: '/dashboard/static-websites'
  },
  {
    icon: <CertificatesIcon size={20} />,
    title: 'Certificates',
    path: '/dashboard/certificates'
  }
]

@withRouter
export default class User extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
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

  renderMenu() {
    if (!this.state.open) return
    return (
      <div className={styles.menu} key="menu">
        {links.map(link => (
          <Link key={link.path} to={link.path} className={styles.menuLink}>
            {link.icon}
            <span>{link.title}</span>
          </Link>
        ))}
      </div>
    )
  }

  renderTitle() {
    const active = links.find(link => this.props.location.pathname.startsWith(link.path))
    return (
      <div className={styles.menuText} onClick={this.toggleMenu}>
        {active ? active.title : 'Platform'} <OpenMenuIcon />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderTitle()}
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
