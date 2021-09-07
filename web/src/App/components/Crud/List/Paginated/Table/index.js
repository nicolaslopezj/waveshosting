import React from 'react'
import dot from 'dot-object'
import Sort from './Sort'
import PropTypes from 'prop-types'

export default class Table extends React.Component {

  static propTypes = {
    items: PropTypes.array,
    fields: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    sortBy: PropTypes.string,
    sortType: PropTypes.string,
    setSort: PropTypes.func.isRequired,
    selectedItemId: PropTypes.string
  }

  getSortProps (field) {
    const isActive = this.props.sortBy === field.name
    const isUp = this.props.sortType === 'ASC'
    return {
      isActiveUp: isActive && isUp,
      isActiveDown: isActive && !isUp
    }
  }

  toggleSort (field) {
    const isActive = this.props.sortBy === field.name
    const isUp = this.props.sortType === 'ASC'
    const type = isActive ? (isUp ? 'DESC' : 'ASC') : (typeof field.sort === 'string' ? field.sort : 'ASC')
    this.props.setSort(field.name, type)
  }

  renderHead () {
    const cols = this.props.fields.map(field => {
      const sort = field.sort ? <Sort {...this.getSortProps(field)} /> : null
      const style = field.sort ? 'paginated-th-sort' : ''
      const onClick = field.sort ? () => this.toggleSort(field) : undefined
      return (
        <th key={field.name} className={style} onClick={onClick}>
          {sort}
          {field.title}
        </th>
      )
    })
    return <tr>{cols}</tr>
  }

  renderValue (item, field, index) {
    const value = dot.pick(field.name, item)

    if (field.render) {
      try {
        return field.render(item, value, index)
      } catch (error) {
        console.error(`Error rendering field "${field.name}":`, error)
        return <span><i>Error</i></span>
      }
    }

    return value
  }

  renderBody () {
    return this.props.items.map((item, index) => {
      const isSelected = this.props.selectedItemId === item._id
      const cols = this.props.fields.map(field => {
        return (
          <td key={field.name}>
            {this.renderValue(item, field, index)}
          </td>
        )
      })
      return (
        <tr key={item._id} className={isSelected ? 'paginated-table-row selected' : 'paginated-table-row'} onClick={() => this.props.onSelect(item, index)}>
          {cols}
        </tr>
      )
    })
  }

  render () {
    return (
      <div className='paginated-table table hoverable'>
        <table>
          <thead>
            {this.renderHead()}
          </thead>
          <tbody>
            {this.renderBody()}
          </tbody>
        </table>
      </div>
    )
  }

}
