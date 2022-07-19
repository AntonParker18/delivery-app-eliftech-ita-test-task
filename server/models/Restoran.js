const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restoranSchema = new Schema({
  shopName: { type: String, required: true },
  location: {
    lat: { type: [Number], require: true },
    lng: { type: [Number], require: true },
  },
})

module.exports = mongoose.model('Restoran', restoranSchema)
