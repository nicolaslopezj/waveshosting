export default function(error) {
  const printableErrors = Object.keys(error.validationErrors)
    .map(key => {
      return `${key}: ${error.validationErrors[key]}`
    })
    .join(', ')
  const message = `{${printableErrors}}`
  throw new Error(message)
}
