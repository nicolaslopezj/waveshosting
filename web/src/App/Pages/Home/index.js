import React from 'react'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Footer from './Footer'

export default class MainHome extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
        <Footer />
      </div>
    )
  }
}
