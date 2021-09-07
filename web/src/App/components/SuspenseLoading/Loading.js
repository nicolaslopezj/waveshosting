import React from 'react'
import styles from './styles.css'

export default function DefaultLoading(props) {
  const height = props.height || 200
  return <div className={styles.container} style={{height}} />
}
