import React from 'react'
import Layout from '../Layout'
import Terminate from './Terminate'
import PropTypes from 'prop-types'

export default class Configuration extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  render() {
    return (
      <Layout>
        <Terminate {...this.props.match.params} />
      </Layout>
    )
  }
}
