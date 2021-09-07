import React from 'react'
import {Form, Field} from 'simple-react-form'
import Text from '../Text'
import PropTypes from 'prop-types'

export default class Filter extends React.Component {
  static propTypes = {
    variables: PropTypes.object,
    setVariable: PropTypes.func
  }

  render() {
    return (
      <Form
        state={this.props.variables}
        onChange={({filter}) => this.props.setVariable('filter', filter)}>
        <Field fieldName="filter" type={Text} placeholder="Search" />
      </Form>
    )
  }
}
