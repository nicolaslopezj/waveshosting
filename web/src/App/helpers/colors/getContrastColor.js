import hexToRGB from './hexToRGB'

export default function(hex) {
  let rgb = hexToRGB(hex)
  // Strip everything except the integers eg. "rgb(" and ")" and " "
  rgb = rgb.split(/\(([^)]+)\)/)[1].replace(/ /g, '')

  // map RGB values to variables
  let r = parseInt(rgb.split(',')[0], 10)
  let g = parseInt(rgb.split(',')[1], 10)
  let b = parseInt(rgb.split(',')[2], 10)

  // calculate contrast of color (standard grayscale algorithmic formula)
  const contrast = (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000
  return contrast >= 128 ? 'black' : 'white'
}
