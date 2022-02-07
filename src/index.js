// Para poder leer las variables de entorno del .env
require('dotenv').config()
// Conexion a DB
require('./mongo')
// Servidor
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const busquedas = require('./busquedas')
const { checkear } = require('./functions/infoExtractor')
const { delay, between } = require('./functions/utils')
const notificationsRouter = require('./controllers/notifications')

const app = express()
app.use(cors())

// Middlewares
app.use(morgan('dev'))

// Para datos que llegan desde un formulario
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())

// Controladores
app.use('/api/notifications', notificationsRouter)

// Static content
app.use(express.static(path.join(__dirname, '/public')))

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Cronjob
setInterval(() => {
  busquedas.forEach(async busqueda => {
    await delay(between(10000, 20000))
    await checkear(busqueda.zona, busqueda.limite)
  })
}, between(300000, 400000))
