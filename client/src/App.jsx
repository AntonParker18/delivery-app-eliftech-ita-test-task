import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Shops from './components/Shops/Shops'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Navigate replace to={'/shop'} />} />
          <Route path='/shop' element={<Shops />} />
          <Route path='/shoppingcart' element={<ShoppingCart />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
