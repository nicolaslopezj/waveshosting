import React from 'react'
import styles from './styles.css'
import Invite from './Invite'
import Header from '../Header'
import Content from 'App/components/Content'

export default function Access(props) {
  const {appId} = props.match.params
  return (
    <div className={styles.container}>
      <Header />
      <Content>
        <Invite appId={appId} />
      </Content>
    </div>
  )
}
