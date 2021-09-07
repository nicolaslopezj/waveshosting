import React from 'react'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Content from 'App/components/Content'
import App from 'App/Pages/Dashboard/Apps/List/App'

@withGraphQL(gql`
  query getAllApps {
    apps {
      items {
        _id
        region
        credential {
          _id
          name
        }
        platform {
          _id
          name
          color
        }
        user {
          _id
          email
        }
      }
    }
  }
`)
export default class Apps extends React.Component {
  static propTypes = {
    apps: PropTypes.object
  }

  renderApps() {
    return this.props.apps.items.map(app => {
      return (
        <div key={app._id} className="col-xs-12 col-sm-4">
          <App app={app} />
          <div className={styles.email}>by {app.user.email}</div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumbs>Apps</Breadcrumbs>
        <div className="divider" />
        <Content>
          <div className={styles.content}>
            <div className="row">{this.renderApps()}</div>
          </div>
        </Content>
      </div>
    )
  }
}
