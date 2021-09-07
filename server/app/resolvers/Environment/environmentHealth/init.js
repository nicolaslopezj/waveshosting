import model from './returns'
import lowerFirstLetterInKey from 'app/helpers/lowerFirstLetterInKey'

export default function(awsRawData) {
  const data = lowerFirstLetterInKey(awsRawData)
  return model.initItem(data)
}
