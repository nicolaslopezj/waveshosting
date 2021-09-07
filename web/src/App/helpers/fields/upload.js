import fileUpload from './fileUpload'

export default async function(file) {
  return new Promise(function(resolve, reject) {
    fileUpload.upload({
      file,
      onProgress: function(progress) {},
      onReady: resolve,
      onError: function(message) {
        reject(new Error(message))
      }
    })
  })
}
