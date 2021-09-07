import React, {Fragment} from 'react'
import SuspenseLoading from 'App/components/SuspenseLoading/Loading'
import styles from './styles.css'

export default function Layout(props) {
  return (
    <Fragment>
      <div className={styles.navbar} />
      <SuspenseLoading height="calc(100vh - 46px)" />
    </Fragment>
  )
}
