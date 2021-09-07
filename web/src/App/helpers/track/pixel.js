export default function(eventType, data) {
  if (eventType === 'view') {
    window.fbq('track', 'PageView')
  } else if (eventType === 'register') {
    window.fbq('track', 'CompleteRegistration')
  } else {
    window.fbq('trackCustom', eventType, data)
  }
}
