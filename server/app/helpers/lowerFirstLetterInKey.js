import isPlainObject from 'lodash/isPlainObject'
import isArray from 'lodash/isArray'

export default function lowerFirst(object) {
  const newObject = {}
  for (const key of Object.keys(object)) {
    const [first, ...others] = key
    const newKey = [first.toLowerCase(), ...others].join('')
    if (isPlainObject(object[key])) {
      newObject[newKey] = lowerFirst(object[key])
    } else if (isArray(object[key]) && isPlainObject(object[key][0])) {
      const newArray = []
      for (let i = 0; i < object[key].length; i++) {
        newArray[i] = lowerFirst(object[key][i])
      }
      newObject[newKey] = newArray
    } else {
      newObject[newKey] = object[key]
    }
  }
  return newObject
}
