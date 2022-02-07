const notificationsRouter = require('express').Router()
const webpush = require('../webpush')
const User = require('../models/User')
const { getUsers } = require('../functions/utils')

// notificationsRouter.post('/', async (req, res, next) => {
//   console.log('Inicio guardar token notificacion')
//   const pushSubscription = req.body
//   await User.find({ token: JSON.stringify(pushSubscription) }).then(async (response) => {
//     if (!response) {
//       try {
//         const pushToSave = new User({ token: JSON.stringify(pushSubscription) })
//         const savedPush = await pushToSave.save()
//         console.log('Token guardado correctamente.')
//         res.status(201).json(savedPush)
//       } catch (e) {
//         console.error(e)
//         res.status(400)
//         next(e)
//       }
//     } else {
//       console.log('Token almacenado con anterioridad.')
//       res.status(200)
//     }
//   })
// })
notificationsRouter.post('/', async (req, res, next) => {
  console.log('Inicio guardar token notificacion')
  const pushSubscription = req.body
  console.log(pushSubscription)
  try {
    const subscripcionExiste = await User.find({ token: JSON.stringify(pushSubscription) }).then(result => {
      console.log(result)
    })
    if (!subscripcionExiste) {
      console.log(subscripcionExiste)
      const pushToSave = new User({ token: JSON.stringify(pushSubscription) })
      const savedPush = await pushToSave.save()
      console.log('Token guardado correctamente.')
      res.status(201).json(savedPush)
    } else {
      console.log('Token almacenado con anterioridad.')
      res.status(200).json(subscripcionExiste)
    }
  } catch (e) {
    console.error(e)
    res.status(400)
    next(e)
  }
})

notificationsRouter.post('/novedad', async (req, res) => {
  console.log('Inicio request para mandar la notificacion')
  const { portal, url, zona, limite } = req.body.info
  const payload = JSON.stringify({
    title: 'Pichollo',
    message: `${portal}: Hay una novedad en ${zona} por menos de ${limite}€`,
    url
  })

  try {
    await getUsers().then((res) => {
      res.forEach(async (user) => {
        const { token } = user
        const pushSubscription = JSON.parse(token)
        await webpush.sendNotification(pushSubscription, payload)
        console.log('Fin request para mandar la notificacion')
      })
    })
  } catch (e) { console.error(e) }
})

module.exports = notificationsRouter
