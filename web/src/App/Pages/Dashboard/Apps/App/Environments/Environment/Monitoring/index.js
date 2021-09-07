import React from 'react'
import styles from './styles.css'
import Overview from './Overview'
import PropTypes from 'prop-types'
import {Form, Field} from 'simple-react-form'
import Select from 'orionsoft-parts/lib/components/fields/Select'

const periods = ['5-minutes', '15-minutes', '30-minutes', '1-hours', '6-hours', '1-day'].map(
  period => ({value: period, label: period.replace('-', ' ')})
)

export default class Monitoring extends React.Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {overviewPeriod: periods[0].value}

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Overview</div>
          <div className={styles.select}>
            <div className="description">Period</div>
            <Form state={this.state} onChange={changes => this.setState(changes)}>
              <Field fieldName="overviewPeriod" type={Select} options={periods} clearable={false} />
            </Form>
          </div>
        </div>
        <Overview {...this.props.match.params} period={this.state.overviewPeriod} />
      </div>
    )
  }
}
