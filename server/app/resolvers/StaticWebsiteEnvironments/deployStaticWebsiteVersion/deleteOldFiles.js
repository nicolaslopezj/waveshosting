export default async function({s3, bucketName}) {
  const listResult = await s3.listObjects({Bucket: bucketName}).promise()
  if (listResult.Contents.length === 0) return

  await s3
    .deleteObjects({
      Bucket: bucketName,
      Delete: {
        Objects: listResult.Contents.map(file => {
          return {Key: file.Key}
        })
      }
    })
    .promise()
}
