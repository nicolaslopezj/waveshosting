import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

export default class Section extends React.Component {
  static propTypes = {
    title: PropTypes.node,
    description: PropTypes.node,
    children: PropTypes.node,
    top: PropTypes.bool,
    useContainer: PropTypes.bool
  }

  static defaultProps = {
    useContainer: true
  }

  render() {
    return (
      <div className={this.props.top ? styles.containerNoBorder : styles.container}>
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <h3 className={styles.title}>{this.props.title}</h3>
            <div className={styles.description}>{this.props.description}</div>
          </div>
          <div className="col-xs-12 col-sm-8">
            <div className={this.props.useContainer ? styles.children : styles.childrenNoBorder}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
