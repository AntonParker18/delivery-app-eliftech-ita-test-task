const ShoppingCart = require('../models/ShoppingCart')

exports.createOrder = async (req, res) => {
  const newOrder = new ShoppingCart({
    userName: req.body.userName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    totalPrice: req.body.totalPrice,
    products: req.body.products,
  })

  try {
    const createdOrder = await newOrder.save()
    res.json({ success: true, order: createdOrder._doc })
  } catch (err) {
    res.json({ success: false })
    console.log(err)
  }
}
