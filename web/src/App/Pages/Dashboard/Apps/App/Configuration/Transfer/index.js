import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import PropTypes from 'prop-types'
import Button from 'orionsoft-parts/lib/components/Button'
import AutoForm from 'App/components/AutoForm'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import LoadingSection from 'App/components/LoadingSection'
import MutationButton from 'App/components/MutationButton'

@withGraphQL(
  gql`
    query getAppTransfer($appId: ID) {
      app(appId: $appId) {
        _id
        transferToId
      }
    }
  `,
  {loading: <LoadingSection top />}
)
@withMessage
export default class Transfer extends React.Component {
  static propTypes = {
    app: PropTypes.object,
    showMessage: PropTypes.func,
    appId: PropTypes.string
  }

  state = {}

  renderForm() {
    if (this.props.app.transferToId) return
    if (!this.state.transfering) return
    return (
      <div>
        <AutoForm
          mutation="transferApp"
          ref="form"
          doc={{appId: this.props.appId}}
          omit="appId"
          onSuccess={({name}) => this.props.showMessage('The transfer request was sent')}
        />
        <br />
        <div>
          <Button onClick={() => this.setState({transfering: false})}>Cancel</Button>
          <Button onClick={() => this.refs.form.submit()} primary>
            Confirm transfer
          </Button>
        </div>
      </div>
    )
  }

  renderStartTransfer() {
    if (this.props.app.transferToId) return
    if (this.state.transfering) return
    return <Button onClick={() => this.setState({transfering: true})}>Transfer app</Button>
  }

  renderTransferring() {
    if (!this.props.app.transferToId) return
    return (
      <div>
        <div>There is a pending transfer request for this app</div>
        <br />
        <MutationButton
          mutation="cancelAppTransfer"
          label="Cancel transfer"
          message={
            <span>
              Are you sure you want to cancel the transfer of the application{' '}
              <b>{this.props.app._id}</b>?
            </span>
          }
          title="Cancel transfer"
          confirmText="Cancel transfer"
          params={{appId: this.props.app._id}}
          danger
        />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <Section top title="Transfer app" description="Transfer this app to other account">
          <div>
            Transfer the app <b>{this.props.appId}</b> to other account
          </div>
          <br />
          {this.renderTransferring()}
          {this.renderStartTransfer()}
          {this.renderForm()}
        </Section>
      </div>
    )
  }
}
