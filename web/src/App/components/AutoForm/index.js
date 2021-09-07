import createAutoform from 'orionjs-react-autoform'
import fields from '../fields'
import translate from 'App/i18n/translate'

const Autoform = createAutoform({
  fields,
  onError: error => alert(error.message),
  getErrorText: (code, field) => {
    return translate(`errors.${code}`, field)
  }
})

export default Autoform
