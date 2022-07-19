import { api } from '../api/api'

const SET_ORDER = 'shoppingCart/SET_ORDER'
const DELETE_ORDER = 'shoppingCart/DELETE_ORDER'
const ADJUST_ITEM_QTY = 'shoppingCart/ADJUST_ITEM_QTY'
const ORDER_SUCCESS = 'shoppingCart/ORDER_SUCCESS'

const initialState = {
  basket: [],
  products: [
    {
      _id: '62c5bcd4b898cc3b85220da6',
      name: 'Burger',
      photoUrl:
        'https://media.istockphoto.com/photos/hamburger-with-cheese-and-french-fries-picture-id1188412964?k=20&m=1188412964&s=612x612&w=0&h=Ow-uMeygg90_1sxoCz-vh60SQDssmjP06uGXcZ2MzPY=',
      price: 1.99,
    },
    {
      _id: '62c5bcd4b898cc3b85220da7',
      name: 'CocaCola',
      photoUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY75dM6fNgA-9GQGk4HxsXROQr8_zgClJKHJAej3pyzgunoFiD5Ndu0kyIR19zS9LOmf0&usqp=CAU',
      price: 1,
    },
    {
      _id: '62c5bcd4b898cc3b85220da8',
      name: 'Cheesburger',
      photoUrl:
        'https://cdn.vkuso.ru/uploads/chizburger-s-govyazhej-kotletkoj.jpg',
      price: 2.2,
    },
    {
      _id: '62c5bcd4b898cc3b85220da9',
      name: 'Chiken Nuggests',
      photoUrl:
        'https://t4.ftcdn.net/jpg/03/58/13/43/360_F_358134371_khxK6dinkXieNLUsRAtQ5bNMvZAuC6en.jpg',
      price: 2.99,
    },
    {
      _id: '62c5bd31b898cc3b85220dab',
      name: 'Burger',
      photoUrl:
        'https://media.istockphoto.com/photos/hamburger-with-cheese-and-french-fries-picture-id1188412964?k=20&m=1188412964&s=612x612&w=0&h=Ow-uMeygg90_1sxoCz-vh60SQDssmjP06uGXcZ2MzPY=',
      price: 1.99,
    },
    {
      _id: '62c5bd31b898cc3b85220dac',
      name: 'CocaCola',
      photoUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY75dM6fNgA-9GQGk4HxsXROQr8_zgClJKHJAej3pyzgunoFiD5Ndu0kyIR19zS9LOmf0&usqp=CAU',
      price: 1,
    },
    {
      _id: '62c5bd31b898cc3b85220dad',
      name: 'Cheesburger',
      photoUrl:
        'https://cdn.vkuso.ru/uploads/chizburger-s-govyazhej-kotletkoj.jpg',
      price: 2.2,
    },
    {
      _id: '62c5bd31b898cc3b85220dae',
      name: 'Chiken Nuggests',
      photoUrl:
        'https://t4.ftcdn.net/jpg/03/58/13/43/360_F_358134371_khxK6dinkXieNLUsRAtQ5bNMvZAuC6en.jpg',
      price: 2.99,
    },
  ],
  currentShopId: {},
  order: {},
}

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      const item = state.products.find(
        product => product._id === action.order._id
      )
      const inCart = state.basket.find(item =>
        item._id === action.order._id ? true : false
      )

      return {
        ...state,
        basket: inCart
          ? [...state.basket].map(item =>
              item._id === action.order._id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.basket, { ...item, qty: 1 }],
        currentShopId: { ...state.currentShopId, shopId: action.order.shopId },
      }

    case DELETE_ORDER:
      return {
        ...state,
        basket: [...state.basket].filter(item => item._id !== action.order._id),
        currentShopId: state.basket.length < 1 ? null : state.basket,
      }
    case ADJUST_ITEM_QTY:
      return {
        ...state,
        basket: [...state.basket].map(item =>
          item._id === action._id ? { ...item, qty: +action.qty } : item
        ),
      }
    case ORDER_SUCCESS:
      const product = action.basket.map(product => {
        return {
          productsName: product.name,
          productsPrice: product.price,
          qty: product.qty,
        }
      })

      const newOrder = {
        userName: action.data.userName,
        email: action.data.email,
        phoneNumber: action.data.phoneNumber,
        address: action.data.address,
        totalPrice: action.totalPrice,
        product: product,
      }

      action.onSuccess(newOrder)
      return {
        ...state,
        order: { ...state.order, newOrder },
        basket: (state.basket = []),
      }

    default:
      return state
  }
}

export const addOrder = order => ({
  type: SET_ORDER,
  order,
})

export const deleteOrder = order => ({
  type: DELETE_ORDER,
  order,
})

export const adjustItemQty = (itemID, qty) => ({
  type: ADJUST_ITEM_QTY,
  _id: itemID,
  qty,
})

export const orderSuccess = (data, basket, totalPrice, onSuccess) => ({
  type: ORDER_SUCCESS,
  data,
  basket,
  totalPrice,
  onSuccess,
})

export const orderSuccessDB = async order => {
  await api.sendOrder(order)
}

export default shoppingCartReducer
