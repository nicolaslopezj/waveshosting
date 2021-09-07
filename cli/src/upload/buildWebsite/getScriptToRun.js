import knownScripts from './knownScripts'
import downloadScript from './downloadScript'
import copyScript from './copyScript'

export default async function({build, buildDir}) {
  if (build.includes('http')) {
    return await downloadScript({url: build, buildDir})
  } else if (knownScripts[build]) {
    return await copyScript({content: knownScripts[build], buildDir})
  } else {
    return build
  }
}
