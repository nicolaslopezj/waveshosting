import React from 'react'
import Loading from 'orionsoft-parts/lib/components/Loading'
import styles from './styles.css'

export default class DynamicComponent extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    )
  }
}
