import React from 'react'
import Limit from './Limit'
import Page from './Page'
import PropTypes from 'prop-types'

export default class Pagination extends React.Component {

  static propTypes = {
    result: PropTypes.object,
    page: PropTypes.number,
    limit: PropTypes.number,
    setPage: PropTypes.func.isRequired,
    setLimit: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='paginated-pagination'>
        <div className='paginated-pagination-limit'>
          <Limit {...this.props} />
        </div>
        <div className='paginated-pagination-pages'>
          <Page {...this.props} />
        </div>
      </div>
    )
  }

}
