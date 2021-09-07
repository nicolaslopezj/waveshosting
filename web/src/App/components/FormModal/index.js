import React from 'react'
import withModal from 'orionsoft-parts/lib/decorators/withModal'
import PropTypes from 'prop-types'
import Button from 'orionsoft-parts/lib/components/Button'
import autobind from 'autobind-decorator'
import AutoForm from 'App/components/AutoForm'

@withModal
export default class FormModal extends React.Component {
  static propTypes = {
    showModal: PropTypes.func,
    label: PropTypes.node,
    title: PropTypes.node,
    confirmText: PropTypes.node,
    mutation: PropTypes.string,
    doc: PropTypes.object,
    only: PropTypes.any,
    omit: PropTypes.any,
    onSuccess: PropTypes.func,
    primary: PropTypes.bool,
    danger: PropTypes.bool
  }

  static defaultProps = {
    confirmText: 'Guardar',
    onSuccess: () => {}
  }

  @autobind
  async submit() {
    const {error} = await this.form.submit()
    return !error
  }

  @autobind
  renderForm() {
    return (
      <AutoForm
        mutation={this.props.mutation}
        ref={form => (this.form = form)}
        doc={this.props.doc}
        only={this.props.only}
        omit={this.props.omit}
        onSuccess={this.props.onSuccess}
      />
    )
  }

  @autobind
  async open() {
    await this.props.showModal({
      title: this.props.title,
      confirm: this.submit,
      confirmText: this.props.confirmText,
      cancelText: 'Cancel',
      render: this.renderForm
    })
  }

  renderButton() {
    return (
      <Button primary={this.props.primary} danger={this.props.danger} onClick={this.open}>
        {this.props.label}
      </Button>
    )
  }

  render() {
    return this.renderButton()
  }
}
