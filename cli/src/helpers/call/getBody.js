export default function({query, variables}) {
  return JSON.stringify(
    {
      query,
      variables: variables || null
    },
    null,
    2
  )
}
