import React from 'react'
import styles from './styles.css'
import NumberField from 'orionsoft-parts/lib/components/fields/numeral/Number'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import {Field, WithValue} from 'simple-react-form'
import Options from './Options'

const scalingOptions = [
  {label: 'CPU', value: 'cpu'},
  {label: 'Latency', value: 'latency'},
  {label: 'Number of requests', value: 'requestCount'}
]

export default class Scaling extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <div className="label">Minimum instances</div>
            <Field fieldName="minInstances" type={NumberField} />
            <div className="description">
              Minimum number of instances you want in your Auto Scaling group
            </div>
          </div>
          <div className="col-xs-12 col-sm-4">
            <div className="label">Maximum instances</div>
            <Field fieldName="maxInstances" type={NumberField} />
            <div className="description">
              Maximum number of instances you want in your Auto Scaling group
            </div>
          </div>
          <div className="col-xs-12 col-sm-4">
            <div className="label">Scaling cooldown</div>
            <Field fieldName="scalingCooldown" type={NumberField} />
            <div className="description">
              Cooldown periods help to prevent Auto Scaling from initiating additional scaling
              activities before the effects of previous activities are visible
            </div>
          </div>
        </div>
        <div className="label">Scale by</div>
        <Field fieldName="scalingMetric" type={Select} options={scalingOptions} />
        <WithValue>
          {({scalingMetric}) => (scalingMetric ? <Options scalingMetric={scalingMetric} /> : null)}
        </WithValue>
      </div>
    )
  }
}
