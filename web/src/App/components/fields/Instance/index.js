import React, {useState} from 'react'
import styles from './styles.css'
import useQuery from 'apollo-hooks/lib/useQuery'
import gql from 'graphql-tag'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import uniqBy from 'lodash/uniqBy'
import Description from './Description'

export default function Instance(props) {
  const [tier, setTier] = useState(props.value ? props.value.split('.')[0] : null)
  const {instanceTypes} = useQuery(
    gql`
      query getInstanceTypesForApp($appId: ID, $environmentName: ID) {
        instanceTypes(appId: $appId, environmentName: $environmentName) {
          code
          name
          memory
          vcpu
          networkPerformance
          cost
          familyName
          familyCode
        }
      }
    `,
    {appId: props.appId, environmentName: props.environmentName}
  )

  const options = instanceTypes
    .filter(instance => instance.familyCode === tier)
    .map(instance => {
      return {
        label: (
          <span>
            {instance.name}{' '}
            <span className={styles.optionCost}>
              ${Number(instance.cost * 0.01 * 24 * 30).toFixed(2)}
            </span>
          </span>
        ),
        value: instance.code
      }
    })

  const tiers = uniqBy(instanceTypes, 'familyCode').map(instance => {
    return {
      label: instance.familyName,
      value: instance.familyCode
    }
  })

  return (
    <div className={styles.container}>
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <Select
            label="Tier"
            placeholder="Select the family"
            value={tier}
            options={tiers}
            onChange={setTier}
          />
        </div>
        <div className="col-xs-12 col-sm-6">
          <Select
            label="Instance"
            placeholder="Select the instance"
            value={props.value}
            onChange={instanceType => {
              if (instanceType !== props.value) {
                props.onChange(instanceType)
              }
            }}
            options={options}
          />
        </div>
      </div>
      {props.value ? (
        <Description instance={instanceTypes.find(item => item.code === props.value)} />
      ) : null}
    </div>
  )
}
