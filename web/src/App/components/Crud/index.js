import React from 'react'
import Create from './Create'
import Update from './Update'
import List from './List'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import Delete from './Delete'
import includes from 'lodash/includes'

export default class CrudComponent extends React.Component {
  static propTypes = {
    path: PropTypes.string,
    singular: PropTypes.string,
    plural: PropTypes.string,
    listQuery: PropTypes.string,
    listFields: PropTypes.array,
    itemQuery: PropTypes.string,
    updateMutation: PropTypes.string,
    deleteMutation: PropTypes.string,
    createMutation: PropTypes.string,
    omit: PropTypes.array,
    allowSearch: PropTypes.bool
  }

  static defaultProps = {
    omit: []
  }

  renderList() {
    if (includes(this.props.omit, 'list')) return <span />
    return (
      <List
        title={this.props.plural}
        singular={this.props.singular}
        name={this.props.listQuery || this.props.plural.toLowerCase()}
        basePath={this.props.path}
        fields={this.props.listFields}
        allowSearch={this.props.allowSearch}
        canCreate={!includes(this.props.omit, 'create')}
        canUpdate={!includes(this.props.omit, 'update')}
      />
    )
  }

  renderUpdate({match}) {
    if (includes(this.props.omit, 'update')) return <span />
    return (
      <Update
        title={`Update ${this.props.singular}`}
        name={this.props.itemQuery || this.props.singular.toLowerCase()}
        basePath={this.props.path}
        itemId={match.params.itemId}
        singular={this.props.singular}
        updateMutation={this.props.updateMutation || `update${this.props.singular}`}
      />
    )
  }

  renderCreate() {
    if (includes(this.props.omit, 'create')) return <span />
    return (
      <Create
        title={`Create ${this.props.singular}`}
        basePath={this.props.path}
        singular={this.props.singular}
        createMutation={this.props.createMutation || `create${this.props.singular}`}
      />
    )
  }

  renderDelete({match}) {
    if (includes(this.props.omit, 'delete')) return <span />
    return (
      <Delete
        title={`Delete ${this.props.singular}`}
        basePath={this.props.path}
        itemId={match.params.itemId}
        singular={this.props.singular}
        name={this.props.deleteMutation || `delete${this.props.singular}`}
      />
    )
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path={this.props.path} exact component={params => this.renderList(params)} />
          <Route
            path={this.props.path + '/create'}
            component={params => this.renderCreate(params)}
          />
          <Route
            path={this.props.path + '/:itemId'}
            exact
            component={params => this.renderUpdate(params)}
          />
          <Route
            path={this.props.path + '/:itemId/delete'}
            exact
            component={params => this.renderDelete(params)}
          />
        </Switch>
      </div>
    )
  }
}
