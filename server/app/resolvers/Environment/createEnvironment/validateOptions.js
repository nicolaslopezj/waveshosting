import {validate, clean} from '@orion-js/schema'

export default async function(options, app) {
  if (!options) return {}

  const platform = await app.platform()
  const {createSchema} = platform

  const schema = {options: {type: createSchema}}

  const cleaned = await clean(schema, {options})

  await validate(schema, cleaned)
  return cleaned.options
}
