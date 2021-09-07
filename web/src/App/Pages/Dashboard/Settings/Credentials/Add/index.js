import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import AutoForm from 'App/components/AutoForm'
import Button from 'orionsoft-parts/lib/components/Button'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import {withRouter} from 'react-router'
import HelpIcon from 'react-icons/lib/md/help'

@withMessage
@withRouter
export default class List extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    showMessage: PropTypes.func,
    onHome: PropTypes.bool,
    refetch: PropTypes.func
  }

  @autobind
  onSuccess() {
    this.props.showMessage('Your keys where saved')
    if (this.props.onHome) {
      this.props.refetch()
    } else {
      this.props.history.push('/settings/credentials')
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Section
          title="Add a new credential"
          description="Add a credential to use it in your apps"
          top>
          <a
            className={styles.help}
            href="https://support.waveshosting.com/getting-started/how-to-connect-your-amazon-web-services-account"
            target="_blank"
            rel="noopener noreferrer">
            <HelpIcon size={18} /> How to connect your Amazon Web Services account
          </a>
          <AutoForm mutation="createCredential" ref="form" onSuccess={this.onSuccess} />
          <br />
          {this.props.onHome ? null : (
            <Button to="/settings/credentials" style={{marginRight: 10}}>
              Cancel
            </Button>
          )}
          <Button onClick={() => this.refs.form.submit()} primary>
            Save
          </Button>
        </Section>
      </div>
    )
  }
}
