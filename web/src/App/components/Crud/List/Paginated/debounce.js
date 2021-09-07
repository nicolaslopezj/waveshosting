import React from 'react'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'

export default function(Child) {
  return class Debounce extends React.Component {
    static propTypes = {
      variables: PropTypes.object
    }

    constructor(props) {
      super(props)
      this.deboucedDidRecieveProps = debounce(this.didRecieveProps, 100)
      this.state = {props}
    }

    didRecieveProps(props) {
      this.setState({props, debouncing: false})
    }

    componentWillReceiveProps(nextProps) {
      if (isEqual(nextProps.variables, this.props.variables)) {
        this.didRecieveProps(nextProps)
      } else {
        this.setState({debouncing: true})
        this.deboucedDidRecieveProps(nextProps)
      }
    }

    render() {
      return <Child ref="child" debouncing={this.state.debouncing} {...this.state.props} />
    }
  }
}
