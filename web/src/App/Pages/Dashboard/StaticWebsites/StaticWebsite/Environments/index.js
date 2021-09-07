import React from 'react'
import Layout from '../Layout'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import Button from 'orionsoft-parts/lib/components/Button'
import List from './List'

@withRouter
export default class Environments extends React.Component {
  static propTypes = {
    router: PropTypes.object,
    match: PropTypes.object
  }

  render() {
    const {staticWebsiteId} = this.props.match.params
    return (
      <Layout>
        <List staticWebsiteId={staticWebsiteId} />
        <Button to={`/dashboard/static-websites/${staticWebsiteId}/create`}>
          Create a new environment
        </Button>
      </Layout>
    )
  }
}
