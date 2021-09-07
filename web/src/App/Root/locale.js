import numeral from 'numeral'
import moment from 'moment'

// import 'numeral/locales/es'
// import 'moment/locale/es'

moment.locale('en')
numeral.locale('en')

global.numeral = numeral
global.moment = moment
