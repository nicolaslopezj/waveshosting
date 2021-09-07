import model from './returns'
import lowerFirstLetterInKey from 'app/helpers/lowerFirstLetterInKey'

export default function(items) {
  return items.map(item => {
    const data = lowerFirstLetterInKey(item)
    if (data.system.cPUUtilization) {
      data.system.cpuUtilization = data.system.cPUUtilization
      data.system.cpuUtilization.user = data.system.cpuUtilization.user * 0.01
      data.system.cpuUtilization.system = data.system.cpuUtilization.system * 0.01
      data.system.cpuUtilization.idle = data.system.cpuUtilization.idle * 0.01
    }

    return model.initItem(data)
  })
}
