import React from 'react'
import PropTypes from 'prop-types'

export default class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    children: PropTypes.func
  }

  render() {
    return this.props.children(this.props.item)
  }
}
