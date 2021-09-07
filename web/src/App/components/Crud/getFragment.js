import gql from 'graphql-tag'

export default function({name, result, basicResultQuery, params}) {
  if (basicResultQuery === '') return
  const fragmentName = `${name}_crudfragment`
  const text = `fragment ${fragmentName} on ${result} ${basicResultQuery}`
  return gql([text])
}
