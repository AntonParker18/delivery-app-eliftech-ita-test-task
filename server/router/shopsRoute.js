const express = require('express')
const router = express.Router()
const shopsController = require('../controllers/shops.controller')

router.post('/shops', shopsController.RestoranModel)
router.post('/shop-product', shopsController.GoodsModel)

router.get('/shops', shopsController.getAllRestorans)
router.get('/shop-product/:shopId', shopsController.getProductsById)

module.exports = router
