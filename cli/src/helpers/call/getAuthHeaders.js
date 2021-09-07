import JSSHA from 'jssha'

export default function(body, credential) {
  const {publicKey, secretKey} = credential
  if (!publicKey || !secretKey) return {}

  const nonce = new Date().getTime()
  const shaObj = new JSSHA('SHA-512', 'TEXT')
  shaObj.setHMACKey(secretKey, 'TEXT')
  shaObj.update(nonce + body)
  const signature = shaObj.getHMAC('HEX')

  return {
    'X-ORION-NONCE': nonce,
    'X-ORION-PUBLICKEY': publicKey,
    'X-ORION-SIGNATURE': signature
  }
}
