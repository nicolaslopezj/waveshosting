import React from 'react'
import styles from './styles.css'
import {Form, Field} from 'simple-react-form'
import DateField from './DateField'
import TextField from './TextField'
import PropTypes from 'prop-types'
import LiveField from './LiveField'

export default class FormLogs extends React.Component {
  static propTypes = {
    state: PropTypes.object,
    onChange: PropTypes.func
  }

  render() {
    const {state} = this.props
    return (
      <Form state={this.props.state} onChange={this.props.onChange} onSubmit={() => {}}>
        <div className={styles.container}>
          <Field fieldName="live" type={LiveField} />
          {!state.live ? <Field fieldName="startDate" type={DateField} /> : null}
          {!state.live ? <Field fieldName="filter" type={TextField} /> : null}
        </div>
      </Form>
    )
  }
}
