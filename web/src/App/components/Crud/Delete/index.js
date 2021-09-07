import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Button from 'orionsoft-parts/lib/components/Button'
import BackIcon from 'react-icons/lib/md/arrow-back'
import DeleteIcon from 'react-icons/lib/md/delete'
import {withRouter} from 'react-router'
import WithMutation from './WithMutation'
import WithParams from './WithParams'
import getFragment from '../getFragment'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'

@withRouter
@withMessage
export default class Delete extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    title: PropTypes.node,
    basePath: PropTypes.string,
    itemId: PropTypes.string,
    singular: PropTypes.string,
    name: PropTypes.string,
    fragment: PropTypes.any
  }

  getFragment(queryInfo) {
    return this.props.fragment || getFragment(queryInfo)
  }

  async delete(mutate) {
    try {
      await mutate(this.props.itemId)
      this.props.showMessage(`${this.props.singular} deleted`)
      this.props.history.push(this.props.basePath)
    } catch (error) {
      this.props.showMessage(error)
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="content">
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.text}>
            Are you sure you want to delete this {this.props.singular}
          </div>
          <br />
          <WithParams name={this.props.name}>
            {queryInfo => (
              <WithMutation
                mutation={this.props.name}
                params={queryInfo.params}
                fragment={this.getFragment(queryInfo)}>
                {mutate => (
                  <div>
                    <Button
                      icon={BackIcon}
                      onClick={() =>
                        this.props.history.push(`${this.props.basePath}/${this.props.itemId}`)
                      }>
                      Back
                    </Button>
                    <Button icon={DeleteIcon} danger onClick={() => this.delete(mutate)}>
                      Delete {this.props.singular}
                    </Button>
                  </div>
                )}
              </WithMutation>
            )}
          </WithParams>
        </div>
      </div>
    )
  }
}
