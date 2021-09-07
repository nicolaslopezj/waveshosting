export default function(hex) {
  var bigint = parseInt(hex.replace('#', ''), 16)
  var r = (bigint >> 16) & 255
  var g = (bigint >> 8) & 255
  var b = bigint & 255

  return `rgb(${r}, ${g}, ${b})`
}
