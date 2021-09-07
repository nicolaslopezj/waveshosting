import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import autobind from 'autobind-decorator'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'

@withMutation(gql`
  mutation setDescription($staticWebsiteId: ID, $versionNumber: Float, $description: String) {
    setStaticWebsiteVersionDescription(
      staticWebsiteId: $staticWebsiteId
      versionNumber: $versionNumber
      description: $description
    ) {
      _id
      label
      description
    }
  }
`)
@withMessage
export default class Description extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    version: PropTypes.object,
    staticWebsite: PropTypes.object,
    setDescription: PropTypes.func
  }

  state = {editing: false}

  @autobind
  async setDescription(description) {
    if (description === this.props.version.description) return
    this.setState({loading: true})
    try {
      await this.props.setDescription({
        staticWebsiteId: this.props.staticWebsite._id,
        versionNumber: this.props.version.number,
        description
      })
      this.props.showMessage('The description was saved correctly')
    } catch (error) {
      this.props.showMessage(error)
    }
    this.setState({loading: false})
  }

  @autobind
  onChange(event) {
    this.setState({description: event.target.value})
  }

  @autobind
  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.onBlur()
    }
  }

  @autobind
  onBlur() {
    this.setDescription(this.state.description)
    this.setState({editing: false, description: null})
  }

  @autobind
  edit() {
    this.setState({description: this.props.version.description, editing: true})
    setImmediate(() => {
      this.refs.input.focus()
    })
  }

  renderLabel() {
    if (this.state.editing) return
    if (this.state.loading) {
      return <span className={styles.addLabel}>Saving...</span>
    } else if (this.props.version.description) {
      return (
        <div className={styles.labelContainer} onClick={this.edit}>
          <Tooltip content="Click to change the description">
            <span className={styles.label}>{this.props.version.description}</span>
          </Tooltip>
        </div>
      )
    } else {
      return (
        <div className={styles.labelContainer} onClick={this.edit}>
          <Tooltip content="Click to add a description">
            <span className={styles.addLabel} onClick={this.edit}>
              Add a description
            </span>
          </Tooltip>
        </div>
      )
    }
  }

  renderForm() {
    if (!this.state.editing) return
    return (
      <input
        ref="input"
        value={
          this.state.description === null
            ? this.props.version.description || ''
            : this.state.description
        }
        className={styles.input}
        placeholder="Add a description"
        type="text"
        onChange={this.onChange}
        onBlur={this.onBlur}
        onKeyPress={this.onKeyPress}
      />
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderLabel()}
        {this.renderForm()}
      </div>
    )
  }
}
