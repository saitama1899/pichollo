const notificationsRouter = require('express').Router()
const webpush = require('../webpush')
let pushSubscription

notificationsRouter.post('/', async (req, res) => {
  pushSubscription = req.body
  res.status(200).json()
})

notificationsRouter.post('/novedad', async (req, res) => {
  const { portal, url, zona, precio } = req.body

  const payload = JSON.stringify({
    title: 'Pichollo',
    message: `${portal}: Hay una novedad en ${zona} por menos de ${precio}€`,
    url
  })

  try {
    await webpush.sendNotification(pushSubscription, payload)
  } catch (e) { console.error(e) }
})

module.exports = notificationsRouter
