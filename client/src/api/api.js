import * as axios from 'axios'

export const api = {
  async getRestorans() {
    return await axios.get(`http://localhost:5000/api/shop/shops`).then(res => {
      return res.data
    })
  },

  async getRestoranMenu(id) {
    return await axios
      .get(`http://localhost:5000/api/shop/shop-product/${id}`)
      .then(res => {
        return res.data
      })
  },

  async sendOrder(order) {
    try {
      await axios.post('http://localhost:5000/api/shoppingCart/order', order)
    } catch (err) {
      return err.response.data
    }
  },
}
