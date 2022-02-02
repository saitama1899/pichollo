// Para poder leer las variables de entorno del .env
require('dotenv').config()
// Conexion a DB
require('./mongo')

const { checkear } = require('./functions/infoExtractor')

checkear('maresme', 700)
