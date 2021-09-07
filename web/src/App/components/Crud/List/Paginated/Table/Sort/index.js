import React from 'react'
import UpIcon from 'react-icons/lib/md/arrow-drop-up'
import DownIcon from 'react-icons/lib/md/arrow-drop-down'
import PropTypes from 'prop-types'

export default class Sort extends React.Component {

  static propTypes = {
    isActiveUp: PropTypes.bool,
    isActiveDown: PropTypes.bool
  }

  render () {
    const up = this.props.isActiveUp ? 'paginated-sort-arrow-up active' : 'paginated-sort-arrow-up'
    const down = this.props.isActiveDown ? 'paginated-sort-arrow-down active' : 'paginated-sort-arrow-down'
    return (
      <span className='paginated-sort'>
        <UpIcon className={up} />
        <DownIcon className={down} />
      </span>
    )
  }

}
