import {spawn} from 'child-process-promise'

export default async function(command, options = {}) {
  const [first, ...args] = command.split(' ')
  return await spawn(first, args, options)
}
