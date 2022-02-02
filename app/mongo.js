const mongoose = require('mongoose')

// La uri te la indica al crear una db en cloud mongodb
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

// Conexión a mongodb
mongoose.connect(connectionString)
  .then(() => {
    console.log('DB connected')
  }).catch(e => {
    console.error(e)
  })

process.on('uncaughtException', e => {
  console.error(e)
  mongoose.disconnect()
})
