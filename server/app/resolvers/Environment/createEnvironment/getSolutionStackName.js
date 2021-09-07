export default async function({app}) {
  const platform = await app.platform()
  const solutionStacks = await platform.solutionStacks({appId: app._id})

  return solutionStacks[0]
}
