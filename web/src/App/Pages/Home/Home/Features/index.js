import React from 'react'
import styles from './styles.css'
import FastIcon from 'react-icons/lib/md/fast-forward'

const features = [
  {
    icon: FastIcon,
    title: 'Deploy apps',
    description: `Deploy your apps and websites just with one command.`
  },
  {
    icon: FastIcon,
    title: 'Easy configuration',
    description: `Achieve the full potential of your deployments with the easy to use dashboard.`
  },
  {
    icon: FastIcon,
    title: 'Health checks and monitoring',
    description: `All in one place, health checks and monitoring are available on the environment
    section.`
  },
  {
    icon: FastIcon,
    title: 'Support multiple AWS accounts',
    description: `We support multiple AWS credentials in one account. You can manage different
    projects from the same place and for the same price.`
  },
  {
    icon: FastIcon,
    title: 'Versioning',
    description: `Keep all the versions and deploy any of them to any app environment with just one
    click.`
  },
  {
    icon: FastIcon,
    title: 'Frameworks support',
    description: `We support the main frameworks on the market and we are constantly working to support
    new ones.`
  }
]

export default class Features extends React.Component {
  static propTypes = {}

  renderFeatures() {
    return features.map((feature, index) => {
      const Icon = feature.icon
      return (
        <div key={index} className="col-xs-6 col-sm-4">
          <div className={styles.feature}>
            <div className={styles.icon}>
              <Icon size={30} />
            </div>
            <div className={styles.title}>{feature.title}</div>
            <div className={styles.description}>{feature.description}</div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="row">{this.renderFeatures()}</div>
      </div>
    )
  }
}
