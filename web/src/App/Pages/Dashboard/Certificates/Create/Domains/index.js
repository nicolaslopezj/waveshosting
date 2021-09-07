import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import clone from 'lodash/clone'
import Button from 'orionsoft-parts/lib/components/Button'
import autobind from 'autobind-decorator'
import IconButton from 'orionsoft-parts/lib/components/IconButton'
import DeleteIcon from 'react-icons/lib/md/delete'

export default class Domains extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func
  }

  @autobind
  add() {
    const docVal = clone(this.props.value) || []
    docVal.push('')
    this.props.onChange(docVal)
  }

  @autobind
  delete(index) {
    const docVal = clone(this.props.value) || []
    docVal.splice(index, 1)
    this.props.onChange(docVal)
  }

  @autobind
  onChange(value, index) {
    const docVal = clone(this.props.value) || []
    docVal[index] = value
    this.props.onChange(docVal)
  }

  renderInputs() {
    const docVal = this.props.value || ['']
    return docVal.map((value, index) => {
      return (
        <div key={index} className={styles.domain}>
          <div className={styles.input}>
            <Text
              placeholder="Domain"
              value={value}
              onChange={value => this.onChange(value, index)}
            />
          </div>
          <div className={styles.icon}>
            {docVal.length === 1 ? null : (
              <IconButton icon={DeleteIcon} onPress={() => this.delete(index)} />
            )}
          </div>
        </div>
      )
    })
  }

  renderAdd() {
    return <Button onClick={this.add}>Add domain</Button>
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderInputs()}
        <div style={{height: 10}} />
        {this.renderAdd()}
      </div>
    )
  }
}
