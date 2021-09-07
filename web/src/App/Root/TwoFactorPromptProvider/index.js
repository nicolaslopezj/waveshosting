import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import Transition from 'react-transition-group/Transition'
import {Form, Field} from 'simple-react-form'
import SixDigitInput from 'App/components/fields/SixDigitInput'
import IconButton from 'orionsoft-parts/lib/components/IconButton'
import CloseIcon from 'react-icons/lib/md/close'

let instance = null

export default class Prompt extends React.Component {
  static propTypes = {
    children: PropTypes.object
  }

  static promptTwoFactor = function() {
    if (!instance) {
      throw new Error('TwoFactorPromptProvider is not mounted')
    }
    return instance.prompt()
  }

  state = {}

  componentDidMount() {
    instance = this
  }

  componentWillUnmount() {
    instance = null
  }

  @autobind
  prompt() {
    return new Promise(resolve => {
      this.setState({resolve, open: true, code: ''})
    })
  }

  clear() {
    this.setState({resolve: null, open: false})
  }

  @autobind
  confirm(code) {
    this.state.resolve(code)
    this.clear()
  }

  @autobind
  cancel() {
    this.state.resolve('')
    this.clear()
  }

  renderPrompt(state) {
    if (state === 'exited') return <span />
    return (
      <div className={styles.container + ' ' + styles['container_' + state]}>
        <div className={styles.dialog + ' ' + styles['dialog_' + state]}>
          <div className={styles.close}>
            <IconButton icon={CloseIcon} size={20} onPress={this.cancel} />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>Two factor authentication</div>
            <div className={styles.form}>
              <Form state={this.state} onChange={changes => this.setState(changes)}>
                <Field fieldName="code" type={SixDigitInput} onReady={this.confirm} />
              </Form>
            </div>
            <div className={styles.description}>
              Please introduce your the code in your authentication app to continue
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>{this.props.children}</div>
        <Transition in={this.state.open} timeout={500}>
          {state => this.renderPrompt(state)}
        </Transition>
      </div>
    )
  }
}
