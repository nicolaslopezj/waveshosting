import React from 'react'
import styles from './styles.css'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'

export default function Description(props) {
  const {instance} = props
  if (!instance) return null
  return (
    <div className={styles.info}>
      <div className="row">
        <div className="col-xs-6 col-sm-3">
          <Tooltip
            content={`Aproximate monthly cost based on $${Number(instance.cost * 0.01).toFixed(
              4
            )} per hour`}>
            <div className={styles.value}>${Number(instance.cost * 0.01 * 24 * 30).toFixed(2)}</div>
            <div className={styles.label}>Monthly cost</div>
          </Tooltip>
        </div>
        <div className="col-xs-6 col-sm-3">
          <Tooltip content="RAM memory of the server">
            <div className={styles.value}>{instance.memory} GB</div>
            <div className={styles.label}>Memory</div>
          </Tooltip>
        </div>
        <div className="col-xs-6 col-sm-3">
          <Tooltip content="Virtual CPU">
            <div className={styles.value}>{instance.vcpu} vCPUs</div>
            <div className={styles.label}>Computation</div>
          </Tooltip>
        </div>
        <div className="col-xs-6 col-sm-3">
          <div className={styles.value}>{instance.networkPerformance}</div>
          <div className={styles.label}>Network performance</div>
        </div>
      </div>
    </div>
  )
}
