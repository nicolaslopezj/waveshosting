import strings from './strings'
import _ from 'underscore'
import getLocale from './getLocale'

const defaultLang = 'en'

const getString = function(key, lang) {
  const parts = key.split('.')
  let data = _.clone(strings)
  for (let i = 0; i < parts.length; i++) {
    const currentKey = parts[i]
    if (i === parts.length - 1) {
      const final = data[lang]
      if (!final) return
      const result = final[currentKey]
      return result
    } else {
      data = data[currentKey]
      if (!data) return
    }
  }
}

const generateStringTemplate = function(string) {
  var sanitized = string
    .replace(/\$\{([\s]*[^\s]+[\s]*)\}/g, function(_, match) {
      return `\${map.${match.trim()}}`
    })
    .replace(/(\$\{(?!map\.)[^}]+\})/g, '')

  // eslint-disable-next-line
  const fn = Function('map', `return \`${sanitized}\``)
  return fn
}

const evaluateString = function(string, params) {
  if (typeof string === 'function') {
    return string(params)
  } else {
    const template = generateStringTemplate(string)
    return template(params)
  }
}

const translate = function(key, params, lang) {
  lang = lang || getLocale()
  let string = getString(key, lang)
  if (!string) string = getString(key, defaultLang)
  if (!string) {
    console.warn(`No translation for "${key}" in lang "${lang}"`)
    return key
  }
  try {
    return evaluateString(string, params)
  } catch (e) {
    if (params) {
      console.log(`Error translating "${key}" in lang "${lang}" with params`, params, e)
    } else {
      console.log(`Error translating "${key}" in lang "${lang}"`, e)
    }
    return key
  }
}

global.translate = translate

export default translate
