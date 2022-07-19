const Restoran = require('../models/Restoran')
const Goods = require('../models/Goods')

exports.RestoranModel = async (req, res) => {
  const restorans = await Restoran.collection.insertOne(req.body)

  try {
    res.send(restorans)
  } catch (e) {
    console.log(e)
  }
}

exports.GoodsModel = async (req, res) => {
  const goods = await Goods.insertMany(req.body)

  try {
    res.send(goods)
  } catch (e) {
    console.log(e)
  }
}

exports.getAllRestorans = async (req, res) => {
  try {
    const restorans = await Restoran.find()
    res.status(200).json(restorans)
  } catch (e) {
    console.log(e)
  }
}

exports.getProductsById = async (req, res) => {
  try {
    const goods = await Goods.find({ shopId: req.params.shopId })
    res.status(200).json(goods)
  } catch (e) {
    console.log(e)
  }
}