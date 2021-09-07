import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Content from 'App/components/Content'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Tabs from 'orionsoft-parts/lib/components/Tabs'

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.node,
    past: PropTypes.object,
    right: PropTypes.node,
    tabs: PropTypes.array
  }

  renderHeader() {
    const {past, title, right} = this.props
    return (
      <Breadcrumbs past={past} right={right}>
        {title}
      </Breadcrumbs>
    )
  }

  renderTabs() {
    if (!this.props.tabs) return
    return (
      <div className={styles.tabs}>
        <Tabs items={this.props.tabs} />
      </div>
    )
  }

  renderDivider() {
    if (this.props.tabs) return
    return <div className="divider" />
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderHeader()}
        {this.renderTabs()}
        {this.renderDivider()}
        <Content>{this.props.children}</Content>
      </div>
    )
  }
}
