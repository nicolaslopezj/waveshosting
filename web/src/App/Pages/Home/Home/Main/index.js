import React from 'react'
import styles from './styles.css'
import Navbar from 'App/Pages/Dashboard/Navbar/Content'
import withUserId from 'App/helpers/auth/withUserId'
import PropTypes from 'prop-types'
import Button from 'orionsoft-parts/lib/components/Button'

@withUserId
export default class Main extends React.Component {
  static propTypes = {
    userId: PropTypes.string
  }

  renderButtons() {
    if (this.props.userId) {
      return (
        <div className={styles.buttons}>
          <Button to="/dashboard">Dashboard</Button>
        </div>
      )
    } else {
      return (
        <div className={styles.buttons}>
          <Button to="/login" style={{marginRight: 10}}>
            Login
          </Button>
          <Button to="/register" primary>
            Create an account
          </Button>
          <div className={styles.freeText}>
            You can have one application in your account without introducing a credit card forever
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.navbar}>
            <Navbar />
          </div>
          <div className={styles.main}>
            <div className={styles.title}>Waves hosting</div>
            <div className={styles.text}>Cloud application platform in your AWS account</div>
            {this.renderButtons()}
          </div>
        </div>
      </div>
    )
  }
}
