import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Text from 'orionsoft-parts/lib/components/fields/Text'
import cloneDeep from 'lodash/cloneDeep'
import IconButton from 'orionsoft-parts/lib/components/IconButton'
import DeleteIcon from 'react-icons/lib/md/delete'
import AutoForm from 'App/components/AutoForm'
import {ErrorMessagesContext} from 'simple-react-form'

export default class EnvironmentVariables extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    basicEnvironmentVariables: PropTypes.object,
    errorMessage: PropTypes.string
  }

  addVariable({name = '', value = ''}) {
    const items = cloneDeep(this.props.value) || []
    items.push({name, value})
    this.props.onChange(items)
    setImmediate(() => {
      const index = items.length - 1
      const key = name ? `name_${index}` : `value_${index}`
      this.refs[key].refs.input.focus()
    })
  }

  removeVariable(index) {
    const items = cloneDeep(this.props.value) || []
    items.splice(index, 1)
    this.props.onChange(items)
  }

  updateVariableName(name, index) {
    const items = cloneDeep(this.props.value) || []
    items[index].name = name
    this.props.onChange(items)
  }

  updateVariableValue(value, index) {
    const items = cloneDeep(this.props.value) || []
    items[index].value = value
    this.props.onChange(items)
  }

  updateBasicVariableValue(value, key) {
    const items = cloneDeep(this.props.value) || []
    let exists = false
    for (let i = 0; i < items.length; i++) {
      const {name} = items[i]
      if (name === key) {
        items[i].value = value
        exists = true
      }
    }
    if (!exists) {
      items.push({name: key, value})
    }
    this.props.onChange(items)
  }

  getBasicVariableValueIndex(key) {
    const items = this.props.value || []
    for (let i = 0; i < items.length; i++) {
      const {name} = items[i]
      if (name === key) {
        return i
      }
    }
    return null
  }

  getBasicVariableValue(key) {
    const items = this.props.value || []
    for (let i = 0; i < items.length; i++) {
      const {name, value} = items[i]
      if (name === key) {
        return value
      }
    }
  }

  isInBasic(name) {
    const {basicEnvironmentVariables: basic} = this.props
    if (!basic) return
    if (!basic[name]) return
    return true
  }

  renderVariables() {
    return (this.props.value || []).map((variable, index) => {
      if (this.isInBasic(variable.name)) return null
      return (
        <div className={styles.row} key={index}>
          <div className={styles.input}>
            <Text
              ref={`name_${index}`}
              value={variable.name}
              placeholder="Name"
              onChange={name => this.updateVariableName(name, index)}
            />
          </div>
          <div className={styles.input}>
            <Text
              ref={`value_${index}`}
              value={variable.value}
              placeholder="Value"
              onChange={value => this.updateVariableValue(value, index)}
            />
          </div>
          <div className={styles.delete}>
            <IconButton
              icon={DeleteIcon}
              tooltip="Delete"
              onPress={() => this.removeVariable(index)}
            />
          </div>
        </div>
      )
    })
  }

  renderNewVariable() {
    return (
      <div className={styles.row}>
        <div className={styles.input}>
          <Text placeholder="Name" onChange={value => this.addVariable({name: value})} />
        </div>
        <div className={styles.input}>
          <Text placeholder="Value" onChange={value => this.addVariable({value})} />
        </div>
        <div className={styles.delete} />
      </div>
    )
  }

  renderBasicVariable(key, errorMessages) {
    const {basicEnvironmentVariables: basic} = this.props
    const field = basic[key]
    const Component = AutoForm.getFieldComponent(field)
    const index = this.getBasicVariableValueIndex(key)
    const message = (errorMessages || {})[`environmentVariables.${index}`]
    return (
      <div>
        <div className="label">{field.label}</div>
        <Component
          value={this.getBasicVariableValue(key)}
          onChange={value => {
            this.updateBasicVariableValue(value, key)
          }}
          {...field.fieldOptions}
        />
        <div className="description">{field.description}</div>
        <div className="os-input-error">
          {(message || '').replace(/^undefined /, "This variable's value ")}
        </div>
      </div>
    )
  }

  renderBasicVariables() {
    const {basicEnvironmentVariables: basic} = this.props
    if (!basic) return
    const items = Object.keys(basic).map(key => {
      return (
        <div key={key}>
          <ErrorMessagesContext.Consumer>
            {errorMessages => this.renderBasicVariable(key, errorMessages)}
          </ErrorMessagesContext.Consumer>
          <br />
        </div>
      )
    })
    return (
      <div>
        <div className={styles.basicTitle}>Platform variables</div>
        {items}
        <div className={styles.basicTitle}>Custom variables</div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderBasicVariables()}
        {this.renderVariables()}
        {this.renderNewVariable()}
        <div className="os-input-error">{this.props.errorMessage}</div>
      </div>
    )
  }
}
