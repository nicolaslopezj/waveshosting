import React from 'react'
import Element from './Element'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import './styles.css'
import moment from 'moment'

export default class TextField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any
  }

  state = {}

  render() {
    return (
      <DatePicker
        selected={this.props.value ? moment(this.props.value) : null}
        customInput={<Element parent={this} />}
        onChange={date => this.props.onChange(date ? date.toDate() : null)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={1}
        dateFormat="LLL"
        timeCaption="time"
        minDate={moment().subtract(7, 'days')}
        maxDate={moment()}
      />
    )
  }
}
