const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goodsSchema = new Schema({
  name: { type: String, required: true },
  photoUrl: { type: String, required: true },
  price: { type: Number, required: true },
  shopId: { type: String, required: true },
})

module.exports = mongoose.model('Goods', goodsSchema)
