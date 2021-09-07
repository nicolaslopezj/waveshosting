import React from 'react'
import styles from './styles.css'
import WithItem from './WithItem'
import PropTypes from 'prop-types'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import WithParams from './WithParams'
import getFragment from '../getFragment'
import autobind from 'autobind-decorator'
import Form from './Form'

@withMessage
export default class Update extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    name: PropTypes.string,
    updateMutation: PropTypes.string,
    itemId: PropTypes.string,
    title: PropTypes.string,
    fragment: PropTypes.string,
    singular: PropTypes.string,
    basePath: PropTypes.string
  }

  getFragment(queryInfo) {
    return this.props.fragment || getFragment(queryInfo)
  }

  @autobind
  onSuccess() {
    this.props.showMessage(`The ${this.props.singular} was saved`)
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="content">
          <div className={styles.title}>{this.props.title}</div>
          <br />
          <WithParams name={this.props.name}>
            {queryInfo => (
              <WithItem
                queryInfo={queryInfo}
                fragment={this.getFragment(queryInfo)}
                itemId={this.props.itemId}>
                {item => (
                  <Form
                    name={this.props.updateMutation}
                    item={item}
                    itemId={this.props.itemId}
                    singular={this.props.singular}
                    onSuccess={this.onSuccess}
                    basePath={this.props.basePath}
                    fragment={this.getFragment(queryInfo)}
                  />
                )}
              </WithItem>
            )}
          </WithParams>
        </div>
      </div>
    )
  }
}
