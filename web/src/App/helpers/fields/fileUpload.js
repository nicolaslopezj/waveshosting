import Evaporate from 'evaporate'
import random from 'random-gen'
import baseURL from '../../Root/url'
import File from 'orionsoft-parts/lib/components/fields/File'

const config = {
  awsSignatureVersion: '2',
  signerUrl: `${baseURL}/sign_s3`,
  logging: false
}

config.aws_key = ''
config.bucket = ''

const evaporate = new Evaporate(config)

const replaceS3Url = function(name) {
  return `https://s3.amazonaws.com/${config.bucket}/${name}`
}

const uploadFile = function({file, onProgress, onReady, onError}) {
  const id = random.alphaNum(10)
  const name = `${id}_${file.name}`

  evaporate.add({
    name: `static/${name}`,
    file,
    contentType: file.type,
    progress: onProgress,
    error: function(message) {
      console.log(message, 'error uploading file')
      onError(message)
    },
    complete: function(_xhr, awsKey) {
      onReady({
        url: replaceS3Url(awsKey),
        meta: {s3Path: '/' + awsKey}
      })
    }
  })
}

const deleteFile = function({file, onReady, onError}) {
  console.log('no delete function')
}

export default {
  type: File,
  upload: uploadFile,
  delete: deleteFile
}
