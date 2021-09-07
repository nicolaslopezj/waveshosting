import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import Container from 'orionsoft-parts/lib/components/Container'

export default class Content extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  state = {}

  componentDidMount() {
    this.setMinHeight()
  }

  setMinHeight() {
    const positionTop = this.refs.container.getBoundingClientRect().top
    const minHeight = window.innerHeight - positionTop - 80
    this.setState({minHeight})
  }

  render() {
    const minHeight = this.state.minHeight || window.innerHeight - 200
    return (
      <div className={styles.container} ref="container" style={{minHeight}}>
        <Container>{this.props.children}</Container>
      </div>
    )
  }
}
