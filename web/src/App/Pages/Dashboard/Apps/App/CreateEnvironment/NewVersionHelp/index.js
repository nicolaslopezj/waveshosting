import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import HelpIcon from 'react-icons/lib/md/help'
import Button from 'orionsoft-parts/lib/components/Button'

export default class NewVersionHelp extends React.Component {
  static propTypes = {
    appId: PropTypes.string
  }

  render() {
    const {appId} = this.props
    return (
      <div>
        <div className={styles.welcomeTitle}>But first...</div>
        <div className={styles.welcomeText}>
          We need to upload a version to create this environment
        </div>
        <div>
          <div className={styles.cliInstructions}>
            <div>yarn global add waves-cli</div>
            <div>waves deploy {appId}</div>
          </div>
        </div>
        <a
          className={styles.help}
          href="https://support.waveshosting.com/getting-started/how-to-upload-a-new-version-of-your-app"
          target="_blank"
          rel="noopener noreferrer">
          <HelpIcon size={18} /> How to upload a new version of your app
        </a>
        <span className={styles.moreHelp}>If you need more help just ask!</span>
        <div>
          <Button to={`/dashboard/apps/${appId}`}>Go Back</Button>
        </div>
      </div>
    )
  }
}
