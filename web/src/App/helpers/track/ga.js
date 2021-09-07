export default function(eventType, data) {
  if (eventType === 'view') {
    window.ga('send', 'pageview')
  } else {
    window.ga('send', 'event', eventType)
  }
}
