import dot from 'dot-object'
import keys from 'lodash/keys'
import zipObject from 'lodash/zipObject'

const getStringValue = function (key, value) {
  if (value === '*') {
    return key
  } else {
    const inside = keys(value).map(key => {
      return getStringValue(key, value[key])
    }).join('\n')
    return `${key} {
      ${inside}
    }`
  }
}

export default function (fields, extra) {
  extra = extra || []
  const fieldsNames = ['_id', ...extra]
  fields.forEach(field => {
    fieldsNames.push(field.name)
  })
  const dotFields = zipObject(fieldsNames, fieldsNames.map(_ => '*'))
  dot.object(dotFields)
  return getStringValue('', dotFields)
}
