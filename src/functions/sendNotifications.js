const axios = require('axios')

const { LOCAL_URL, PROD_URL, NODE_ENV, PORT } = process.env

const reqUrl = NODE_ENV === 'development'
  ? LOCAL_URL + `:${PORT}`
  : PROD_URL

const mandarNotificacion = async (info) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  await axios.post(`${reqUrl}/api/notifications/novedad`, {
    info,
    config
  })
}

module.exports = {
  mandarNotificacion
}