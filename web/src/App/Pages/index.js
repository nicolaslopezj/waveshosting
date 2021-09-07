import React, {lazy, Suspense} from 'react'
import authRouteRegex from './Auth/routeRegex'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'
import Home from './Home'
import Dashboard from './Dashboard'
import Loading from './Loading'

@withRouter
export default class Component extends React.Component {
  static propTypes = {
    location: PropTypes.object
  }

  renderComponent() {
    const {pathname} = this.props.location
    if (authRouteRegex.test(pathname)) {
      const Component = lazy(() => import('./Auth'))
      return <Component />
    } else if (pathname === '/') {
      return <Home />
    } else {
      return <Dashboard />
    }
  }

  render() {
    return <Suspense fallback={<Loading />}>{this.renderComponent()}</Suspense>
  }
}
