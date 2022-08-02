import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import shopReducer from './shopReduser'
import shoppingCartReducer from './shoppingCartReduser'

const reducers = combineReducers({
  shopPage: shopReducer,
  shoppingCartPage: shoppingCartReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
