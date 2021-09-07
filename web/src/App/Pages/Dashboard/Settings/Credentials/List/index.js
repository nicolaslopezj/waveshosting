import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import Button from 'orionsoft-parts/lib/components/Button'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import IconButton from 'orionsoft-parts/lib/components/IconButton'
import DeleteIcon from 'react-icons/lib/md/close'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'

@withMutation(gql`
  mutation deleteCredential($credentialId: ID) {
    deleteCredential(credentialId: $credentialId)
  }
`)
@withGraphQL(gql`
  query getMyCredentials {
    credentials {
      _id
      name
    }
  }
`)
@withMessage
export default class List extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    credentials: PropTypes.object,
    deleteCredential: PropTypes.func,
    refetch: PropTypes.func
  }

  @autobind
  async deleteCredential(credentialId) {
    try {
      await this.props.deleteCredential({credentialId})
      await this.props.refetch()
      this.props.showMessage('The credential was deleted')
    } catch (error) {
      this.props.showMessage(error)
    }
  }

  renderCredentials() {
    return this.props.credentials.map(credential => {
      return (
        <div key={credential._id} className="col-xs-12 col-sm-6">
          <div className={styles.credential}>
            <div className={styles.credentialName}>{credential.name}</div>
            <div>
              <IconButton
                icon={DeleteIcon}
                tooltip="Delete credential"
                onPress={() => this.deleteCredential(credential._id)}
              />
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <Section title="Credentials" description="Your AWS access keys" top>
          <div className="row">{this.renderCredentials()}</div>
          <br />
          <div>
            <Button to="/settings/credentials/add">Add a new credential</Button>
          </div>
        </Section>
      </div>
    )
  }
}
