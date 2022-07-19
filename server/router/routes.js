const express = require('express')
const router = express.Router()

const shopRoutes = require('./shopsRoute')
const shoppingCartRoute = require('./shoppingCartRoute')

router.use('/shop', shopRoutes)
router.use('/shoppingCart', shoppingCartRoute)

module.exports = router
