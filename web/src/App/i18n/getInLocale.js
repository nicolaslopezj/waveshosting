import isPlainObject from 'lodash/isPlainObject'
import getLocale from './getLocale'

export default function getInLocale(objectOrString, locale = getLocale()) {
  if (!objectOrString) return ''
  if (typeof objectOrString === 'string') return objectOrString
  if (!isPlainObject(objectOrString)) return ''

  const inLocale = objectOrString[locale]
  if (inLocale) return inLocale
  return objectOrString[Object.keys(objectOrString)[0]] || ''
}
