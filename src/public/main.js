const PUBLIC_VAPID_KEY = 'BJ6R1K9eaXn3vX7liHFqhCoJS05yVkUKJcnUSzS2h6lETSlt-NjQzdvFS0VGQk4EOmZEVwKArOx4LsCNOLurm8A'

const delay = (time) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}
function urlBase64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const subscription = async () => {
  // Service worker
  const register = await navigator.serviceWorker.register('/serviceWorker.js', {
    scope: '/'
  })

  // Listen push notifications
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  }).then((res) => {
    return res
  })
  await delay(10000)
  // Send notification
  await fetch('/api/notifications', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(subscription),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

;(async () => {
  await subscription()
})()
