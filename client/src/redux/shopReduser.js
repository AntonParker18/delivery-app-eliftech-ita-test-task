import { api } from '../api/api'

const SET_RESTORANS = 'shops/SET_RESTORANS'
const SET_RESTOTAN_PODUCT = 'shops/SET_RESTOTAN_PODUCT'

const initialState = {
  restoran: [],
  currentShopProducts: [],
}

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESTORANS:
      return { ...state, restoran: action.restoran }
    case SET_RESTOTAN_PODUCT:
      return { ...state, currentShopProducts: action.currentShopProducts }
    default:
      return state
  }
}

export const setRestoransAction = restoran => ({
  type: SET_RESTORANS,
  restoran,
})

export const setRestoranProductsAction = currentShopProducts => ({
  type: SET_RESTOTAN_PODUCT,
  currentShopProducts,
})

// export const getRestoran = async dispatch => {

// }

export const RestoranThunkCreator = () => {
  return async dispatch => {
    const restorans = await api.getRestorans()
    dispatch(setRestoransAction(restorans))
  }
}

export const RestoranProductsThunkCreator = id => {
  return async dispatch => {
    const goods = await api.getRestoranMenu(id).then(res => {
      return res
    })
    dispatch(setRestoranProductsAction(goods))
  }
}

export default shopReducer
