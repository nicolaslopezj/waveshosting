import React from 'react'
import Filter from './Filter'
import PropTypes from 'prop-types'

export default class Head extends React.Component {
  static propTypes = {
    bottomComponent: PropTypes.func,
    rightComponent: PropTypes.func,
    leftComponent: PropTypes.func,
    title: PropTypes.any,
    centerComponent: PropTypes.func.isRequired,
    variables: PropTypes.object,
    setVariable: PropTypes.func.isRequired
  }

  static defaultProps = {
    rightComponent: Filter
  }

  render() {
    return (
      <div className="paginated-head">
        <div className="paginated-head-container">
          <div className="paginated-head-left">
            {this.props.leftComponent ? (
              <this.props.leftComponent
                variables={this.props.variables}
                setVariable={this.props.setVariable}
              />
            ) : (
              <div className="paginated-head-title">{this.props.title}</div>
            )}
          </div>
          <div className="paginated-head-center">
            <this.props.centerComponent
              variables={this.props.variables}
              setVariable={this.props.setVariable}
            />
          </div>
          <div className="paginated-head-right">
            <this.props.rightComponent
              variables={this.props.variables}
              setVariable={this.props.setVariable}
            />
          </div>
        </div>
        <this.props.bottomComponent
          variables={this.props.variables}
          setVariable={this.props.setVariable}
        />
      </div>
    )
  }
}
