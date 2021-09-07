import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import getFragment from '../getFragment'
import autobind from 'autobind-decorator'
import Form from './Form'
import {withRouter} from 'react-router'

@withMessage
@withRouter
export default class CreateItem extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    showMessage: PropTypes.func,
    name: PropTypes.string,
    createMutation: PropTypes.string,
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
  onSuccess({_id: itemId}) {
    this.props.showMessage(`The ${this.props.singular} profile was saved`)
    this.props.history.push(`${this.props.basePath}/${itemId}`)
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="content">
          <div className={styles.title}>{this.props.title}</div>
          <br />
          <Form
            name={this.props.createMutation}
            itemId={this.props.itemId}
            singular={this.props.singular}
            onSuccess={this.onSuccess}
            basePath={this.props.basePath}
          />
        </div>
      </div>
    )
  }
}
