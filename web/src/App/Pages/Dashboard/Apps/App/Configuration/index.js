import React from 'react'
import styles from './styles.css'
import Delete from './Delete'
import Header from '../Header'
import Content from 'App/components/Content'
import PropTypes from 'prop-types'
import Transfer from './Transfer'

export default class Configuration extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  render() {
    const {appId} = this.props.match.params
    return (
      <div className={styles.container}>
        <Header />
        <Content>
          <Transfer appId={appId} />
          <Delete appId={appId} />
        </Content>
      </div>
    )
  }
}
