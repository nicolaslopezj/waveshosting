export const getArguments = function(params) {
  const keys = Object.keys(params)
  return keys
    .map(key => {
      const field = params[key]
      return `$${key}: ${field.__graphQLType}`
    })
    .join(', ')
}

export const getParams = function(params) {
  const keys = Object.keys(params)
  return keys
    .map(key => {
      return `${key}: $${key}`
    })
    .join(', ')
}
