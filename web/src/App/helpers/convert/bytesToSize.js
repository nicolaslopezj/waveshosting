import parseInt from 'lodash/parseInt'

export default function bytesToSize(bytes) {
  var sizes = ['bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 bytes'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}
