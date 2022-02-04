const axios = require('axios')

const { LOCAL_URL, PROD_URL, NODE_ENV, PORT } = process.env

const reqUrl = NODE_ENV === 'development'
  ? LOCAL_URL + `:${PORT}`
  : PROD_URL

const mandarNotificacion = (info) => {
  console.log('Mandar notificacion')
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  axios.post(`${reqUrl}/api/notifications/novedad`, {
    info,
    config
  })
}

module.exports = {
  mandarNotificacion
}
