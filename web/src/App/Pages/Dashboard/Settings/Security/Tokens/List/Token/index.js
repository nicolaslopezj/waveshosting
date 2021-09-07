import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import CopyBox from 'App/components/CopyBox'
import MutationButton from 'App/components/MutationButton'
import Name from './Name'
import moment from 'moment'

export default class Token extends React.Component {
  static propTypes = {
    token: PropTypes.object,
    refetch: PropTypes.func
  }

  renderLastCall() {
    const {token} = this.props
    if (token.lastCall === token.createdAt) {
      return 'Never used'
    } else {
      return 'Used ' + moment(token.lastCall).fromNow()
    }
  }

  render() {
    const {token} = this.props
    return (
      <div className={styles.container}>
        <div className={styles.lastCall}>{this.renderLastCall()}</div>
        <div className={styles.title}>Token</div>

        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <Name token={token} />
          </div>
          <div className={`col-xs-12 col-sm-4 ${styles.right}`}>
            <MutationButton
              mutation="deleteToken"
              label="Delete token"
              message="Are you sure you want to delete this token?"
              title="Delete token"
              confirmText="Delete token"
              params={{tokenId: token._id}}
              onSuccess={this.props.refetch}
              danger
              component={'a'}
            />
          </div>
        </div>

        <CopyBox value={token.key} />
      </div>
    )
  }
}
