const webpush = require('web-push')
const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env

webpush.setVapidDetails(
  'mailto:erc.lorien92@gmail.com',
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
)

module.exports = webpush
