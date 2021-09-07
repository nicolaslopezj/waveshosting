export default function(eventType, data) {
  if (eventType === 'view') {
    window.Intercom('update')
  } else {
    window.Intercom('trackEvent', eventType, data)
  }
}
