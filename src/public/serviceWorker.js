console.log('Service worker works')

self.addEventListener('push', e => {
  const data = e.data.json()
  console.log('Notificacion recibida')
  console.log(data)
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: './piso.png',
    actions: [{ action: 'open_url', title: 'Ver mas' }]
  })
})

self.addEventListener('notificationclick', e => {
  const data = e.data.json()
  window.location.replace(data.url)
  e.notification.close()
})
