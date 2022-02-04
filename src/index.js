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
const { checkear } = require('./functions/infoExtractor')
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
app.use(express.static(path.join(__dirname, 'public')))

checkear('maresme', 700)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
