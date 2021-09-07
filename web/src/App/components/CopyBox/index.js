import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Button from 'orionsoft-parts/lib/components/Button'
import CopyIcon from 'react-icons/lib/md/content-copy'
import copy from 'App/helpers/misc/copy'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'

@withMessage
export default class CopyBox extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    value: PropTypes.string
  }

  state = {}

  @autobind
  copy() {
    copy(this.props.value)
    this.setState({copied: true})
    this.props.showMessage('Copied correctly')
    setTimeout(() => this.setState({copied: false}), 500)
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="os-input-container">
          <div className={styles.box}>
            <div className={styles.boxLabel}>{this.props.value}</div>
            <div className={styles.copy}>
              <Button
                primary
                key={this.state.copied ? 'a' : 'b'}
                onClick={this.copy}
                tooltip={this.state.copied ? 'Copied' : 'Copy'}>
                <CopyIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
