import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import autobind from 'autobind-decorator'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'

@withMutation(gql`
  mutation setDescription($tokenId: ID, $name: String) {
    setTokenName(tokenId: $tokenId, name: $name) {
      _id
      name
    }
  }
`)
@withMessage
export default class Name extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    token: PropTypes.object,
    app: PropTypes.object,
    setDescription: PropTypes.func
  }

  state = {editing: false}

  @autobind
  async setDescription(name) {
    if (name === this.props.token.name) return
    this.setState({loading: true})
    try {
      await this.props.setDescription({
        tokenId: this.props.token._id,
        name
      })
      this.props.showMessage('The name was saved correctly')
    } catch (error) {
      this.props.showMessage(error)
    }
    this.setState({loading: false})
  }

  @autobind
  onChange(event) {
    this.setState({name: event.target.value})
  }

  @autobind
  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.onBlur()
    }
  }

  @autobind
  onBlur() {
    this.setDescription(this.state.name)
    this.setState({editing: false, name: null})
  }

  @autobind
  edit() {
    this.setState({name: this.props.token.name, editing: true})
    setImmediate(() => {
      this.refs.input.focus()
    })
  }

  renderLabel() {
    if (this.state.editing) return
    if (this.state.loading) {
      return <span className={styles.addLabel}>Saving...</span>
    } else if (this.props.token.name) {
      return (
        <div className={styles.labelContainer} onClick={this.edit}>
          <Tooltip content="Click to change the name">
            <span className={styles.label}>{this.props.token.name}</span>
          </Tooltip>
        </div>
      )
    } else {
      return (
        <div className={styles.labelContainer} onClick={this.edit}>
          <Tooltip content="Click to add a name">
            <span className={styles.addLabel} onClick={this.edit}>
              Add a name to this token
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
        value={this.state.name === null ? this.props.token.name || '' : this.state.name}
        className={styles.input}
        placeholder="Add a name"
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
