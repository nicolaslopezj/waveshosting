import fs from 'fs'
import path from 'path'

const scripts = ['meteor', 'node', 'orionjs', 'rails', 'react']

const content = {}

for (const script of scripts) {
  const fileName = path.join(__dirname, '../../../../scripts/deploy', `${script}.sh`)
  const fileContent = fs.readFileSync(fileName).toString()
  content[script] = fileContent
}

export default content
