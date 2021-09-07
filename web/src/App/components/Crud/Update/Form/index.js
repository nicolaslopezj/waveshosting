import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import AutoForm from 'App/components/AutoForm'
import WithParams from 'orionjs-react-autoform/lib/WithParams'
import Button from 'orionsoft-parts/lib/components/Button'
import {withRouter} from 'react-router'
import BackIcon from 'react-icons/lib/md/arrow-back'
import SaveIcon from 'react-icons/lib/md/save'
import DeleteIcon from 'react-icons/lib/md/delete'

@withRouter
export default class UpdateForm extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    item: PropTypes.object,
    itemId: PropTypes.string,
    fragment: PropTypes.any,
    onSuccess: PropTypes.func,
    singular: PropTypes.string,
    history: PropTypes.object,
    basePath: PropTypes.string
  }

  getDoc({params}) {
    const idField = this.getIdField({params})
    const docField = this.getItemField({params})
    return {
      [idField]: this.props.itemId,
      [docField]: this.props.item
    }
  }
  getIdField({params}) {
    const keys = Object.keys(params)
    return keys.find(key => key.includes('Id'))
  }

  getItemField({params}) {
    const keys = Object.keys(params)
    return keys.find(key => !key.includes('Id'))
  }

  render() {
    return (
      <div className={styles.container}>
        <WithParams name={this.props.name}>
          {queryInfo => (
            <div>
              <AutoForm
                mutation={this.props.name}
                ref={form => (this.form = form)}
                doc={this.getDoc(queryInfo)}
                only={this.getItemField(queryInfo)}
                onSuccess={this.props.onSuccess}
                fragment={this.props.fragment}
              />
              <br />
              <Button icon={BackIcon} onClick={() => this.props.history.push(this.props.basePath)}>
                Back
              </Button>
              <Button
                icon={DeleteIcon}
                danger
                onClick={() =>
                  this.props.history.push(`${this.props.basePath}/${this.props.itemId}/delete`)
                }>
                Delete
              </Button>
              <Button icon={SaveIcon} onClick={() => this.form.submit()} primary>
                Save {this.props.singular}
              </Button>
            </div>
          )}
        </WithParams>
      </div>
    )
  }
}
