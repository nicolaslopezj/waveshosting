import React from 'react'
import ReactGA from 'react-ga'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import getEnv from './getEnv'

@withRouter
export default class GoogleAnalytics extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }

  componentDidMount() {
    if (getEnv() !== 'prod') return
    ReactGA.initialize('UA-127071934-1')
    ReactGA.pageview(this.props.history.location.pathname)
  }

  componentDidUpdate(prevProps) {
    if (this.props.history.location.pathname === prevProps.history.location.pathname) return
    if (getEnv() !== 'prod') return
    ReactGA.pageview(this.props.history.location.pathname)
  }

  render() {
    return <div />
  }
}
