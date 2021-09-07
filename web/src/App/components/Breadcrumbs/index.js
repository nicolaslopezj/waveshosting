import React from 'react'
import styles from './styles.css'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import RightIcon from 'react-icons/lib/md/keyboard-arrow-right'
import Container from 'orionsoft-parts/lib/components/Container'

export default class Breadcrumbs extends React.Component {
  static propTypes = {
    past: PropTypes.object,
    children: PropTypes.node,
    right: PropTypes.object,
    useContainer: PropTypes.bool
  }

  static defaultProps = {
    useContainer: true
  }

  getPast() {
    if (!this.props.past) return []
    return Object.keys(this.props.past).map(path => {
      const title = this.props.past[path]
      return {
        path,
        title
      }
    })
  }

  renderPast() {
    const past = this.getPast()
    return past.map((item, index) => {
      const isLast = index === past.length - 1
      const renderArrow = this.props.children || !isLast
      const renderLink = typeof item.title === 'string'
      return (
        <span key={item.path}>
          {renderLink ? <Link to={item.path}>{item.title}</Link> : item.title}{' '}
          {renderArrow ? (
            <span className="bread-divider">
              <RightIcon />
            </span>
          ) : null}
        </span>
      )
    })
  }

  renderRight() {
    if (!this.props.right) return
    return <div className={styles.right}>{this.props.right}</div>
  }

  renderContent() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          {this.renderPast()}
          {this.props.children ? <span className="last">{this.props.children}</span> : null}
        </div>
        <div className={styles.right}>{this.renderRight()}</div>
      </div>
    )
  }

  render() {
    if (this.props.useContainer) {
      return <Container>{this.renderContent()}</Container>
    } else {
      return this.renderContent()
    }
  }
}
