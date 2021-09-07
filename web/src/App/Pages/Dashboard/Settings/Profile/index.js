import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import Button from 'orionsoft-parts/lib/components/Button'
import AutoForm from 'App/components/AutoForm'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import PropTypes from 'prop-types'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'

const fragment = gql`
  fragment setUserProfileFragment on User {
    _id
    profile {
      name
      firstName
      lastName
    }
  }
`

@withGraphQL(gql`
  query getMyProfile {
    me {
      ...setUserProfileFragment
    }
  }
  ${fragment}
`)
@withMessage
export default class Profile extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    showMessage: PropTypes.func
  }

  state = {}

  render() {
    if (!this.props.me) return
    return (
      <div className={styles.container}>
        <Section top title="Profile" description="Update your personal information">
          <AutoForm
            mutation="setUserProfile"
            ref="form"
            doc={{userId: this.props.me._id, profile: this.props.me.profile}}
            onSuccess={() => this.props.showMessage('Tu perfil fue guardado')}
            fragment={fragment}
            omit={['userId']}
          />
          <br />
          <Button onClick={() => this.refs.form.submit()} primary>
            Save
          </Button>
        </Section>
      </div>
    )
  }
}
