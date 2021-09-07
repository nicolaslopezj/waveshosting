export default async function(environment) {
  if (!environment.bucketName) return

  const s3 = await environment.s3()

  try {
    await s3.deleteBucket({Bucket: environment.bucketName}).promise()
  } catch (e) {}
  await environment.update({$set: {bucketName: null}})
}
