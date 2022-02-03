console.log('Service worker works')

self.addEventListener('push', e => {
  const data = e.data.json()
  console.log('Notificacion recibida')
  console.log(data)
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: './piso.png'
  })
})
