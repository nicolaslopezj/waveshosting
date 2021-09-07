import AdmZip from 'adm-zip'
import mime from 'mime'
import moment from 'moment'

export default async function ({s3, archive, bucketName}) {
  var zip = new AdmZip(archive.Body)
  var zipEntries = zip.getEntries() // an array of ZipEntry records

  const promises = zipEntries
    .filter(zipEntry => !zipEntry.entryName.endsWith('/'))
    .map(async function (zipEntry) {
      const contentType = mime.getType(zipEntry.entryName)

      const params = {
        Body: zipEntry.getData(),
        Bucket: bucketName,
        Key: zipEntry.entryName,
        ACL: 'public-read',
        ContentType: contentType
      }

      const metadata = {}
      if (zipEntry.entryName.startsWith('static/')) {
        const oneYearFromNow = moment().add(1, 'year').toDate()
        params['CacheControl'] = 'public, max-age=31536000, immutable' // maximum recommended value for max-age
        params['Expires'] = oneYearFromNow // `Expires` header requires HTTP-Date (which is the same as .toUTCString())
      }

      await s3.putObject(params).promise()
      return zipEntry.entryName
    })

  return await Promise.all(promises)
}
