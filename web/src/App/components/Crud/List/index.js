import React from 'react'
import styles from './styles.css'
import Paginated from './Paginated'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import WithParams from './WithParams'
import Button from 'orionsoft-parts/lib/components/Button'
import CreateIcon from 'react-icons/lib/md/add'

@withRouter
export default class List extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    name: PropTypes.string,
    fields: PropTypes.array,
    title: PropTypes.string,
    basePath: PropTypes.string,
    singular: PropTypes.node,
    canCreate: PropTypes.bool,
    canUpdate: PropTypes.bool,
    allowSearch: PropTypes.bool
  }

  static defaultProps = {
    title: 'List',
    fields: [{title: 'ID', name: '_id'}],
    basePath: ''
  }

  @autobind
  onSelect({_id, amount}) {
    this.props.history.push(`${this.props.basePath}/${_id}`)
  }

  @autobind
  renderCenter() {
    if (!this.props.canCreate) return <span />
    return (
      <div>
        <Button
          icon={CreateIcon}
          onClick={() => this.props.history.push(`${this.props.basePath}/create`)}>
          Create {this.props.singular}
        </Button>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="content no-padding">
          <WithParams name={this.props.name}>
            {({params}) => (
              <Paginated
                headTitle={this.props.title}
                queryName={this.props.name}
                fields={this.props.fields}
                onPress={this.onSelect}
                params={params}
                headCenterComponent={this.renderCenter}
                headRightComponent={this.props.allowSearch ? undefined : () => <span />}
              />
            )}
          </WithParams>
        </div>
      </div>
    )
  }
}
