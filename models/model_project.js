const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shopSchema = new Schema({
  name: { type: String, required: true, unique: true },
  customerId: { type: String, required: true, unique: true },
  minExp: { type: Number, required: true },
})

module.exports = mongoose.model('Shop', shopSchema, 'shop')
