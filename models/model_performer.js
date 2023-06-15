const mongoose = require('mongoose')

const Schema = mongoose.Schema

const performerSchema = new Schema({
  name: { type: String, required: true, unique: true },
  experience: { type: Number, required: true },
  workers: { type: Number, required: true },
})

module.exports = mongoose.model('Performer', performerSchema, 'performer')
