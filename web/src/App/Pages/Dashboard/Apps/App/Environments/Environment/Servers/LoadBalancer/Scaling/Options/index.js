import React from 'react'
import styles from './styles.css'
import NumberField from 'orionsoft-parts/lib/components/fields/numeral/Number'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import {Field} from 'simple-react-form'

@withGraphQL(gql`
  query getAutoScalingMetricOptions($scalingMetric: String) {
    options: autoScalingMetricOptions(scalingMetric: $scalingMetric) {
      unit
      description
    }
  }
`)
export default class Options extends React.Component {
  static propTypes = {
    options: PropTypes.object
  }

  render() {
    const {description, unit} = this.props.options
    return (
      <div className={styles.container}>
        <div className="description">{description}</div>
        <br />
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="label">Lower threshold ({unit})</div>
            <Field fieldName="lowerThreshold" type={NumberField} />
            <div className="description">
              If the measurement is lower than this number, a server will be removed from your
              environment
            </div>
          </div>
          <div className="col-xs-12 col-sm-6">
            <div className="label">Upper threshold ({unit})</div>
            <Field fieldName="upperThreshold" type={NumberField} />
            <div className="description">
              If the measurement is higher than this number, a server will be added to your
              environment
            </div>
          </div>
        </div>
      </div>
    )
  }
}
