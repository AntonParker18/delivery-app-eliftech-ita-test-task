import React from 'react'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'

import s from './../Shops.module.scss'

const Restoran = props => {
  const shoppingCart = useSelector(state => state.shoppingCartPage)

  const setGoods = () => {
    props.openGoods(props.shop._id)
  }

  return (
    <div className={s.restoran}>
      {shoppingCart.currentShopId.shopId !== props.shop._id &&
      shoppingCart.basket.length > 0 ? (
        <Button
          disabled
          onClick={setGoods}
          variant='outlined'
          sx={{ height: '3em' }}
        >
          {props.shop.shopName}
        </Button>
      ) : (
        <Button onClick={setGoods} variant='outlined' sx={{ height: '3em' }}>
          {props.shop.shopName}
        </Button>
      )}
    </div>
  )
}

export default Restoran
