const { Schema, model } = require('mongoose')

const infoSchema = new Schema({
  portal: String,
  zona: String,
  limite: String,
  info: Number
  // novedad: Boolean
})

const Info = model('Info', infoSchema)

module.exports = Info
