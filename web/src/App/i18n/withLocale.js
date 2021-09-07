import React from 'react'
import PropTypes from 'prop-types'

export default function(ComposedComponent) {
  return class WithLanguage extends React.Component {
    static contextTypes = {
      language: PropTypes.string,
      setLanguage: PropTypes.func
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return this.context.language !== nextContext.language
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          language={this.context.language}
          setLanguage={this.context.setLanguage}
        />
      )
    }
  }
}
