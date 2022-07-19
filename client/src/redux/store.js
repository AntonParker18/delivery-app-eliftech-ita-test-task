import { combineReducers, createStore } from 'redux'
import shopReducer from './shopReduser'
import shoppingCartReducer from './shoppingCartReduser'

const redusers = combineReducers({
  shopPage: shopReducer,
  shoppingCartPage: shoppingCartReducer,
})

const store = createStore(
  redusers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
