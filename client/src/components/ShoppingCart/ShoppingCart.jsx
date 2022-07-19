import React, { useEffect, useState, useCallback } from 'react'
import ShoppingCartForm from './ShopingCartForm/ShoppingCartForm'
import ShoppingCartOrder from './ShoppingCartOrder/ShoppingCartOrder'
import { Alert, Button, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { orderSuccess, orderSuccessDB } from '../../redux/shoppingCartReduser'
import { useJsApiLoader } from '@react-google-maps/api'

import s from './ShoppingCart.module.scss'

const API_KEY = process.env.REACT_APP_API_KEY

const defaultCenter = {
  lat: 49.232788,
  lng: 28.467502,
}

const defaultValues = {
  userName: '',
  email: '',
  phoneNumber: '',
  address: '',
}

const ShoppingCart = () => {
  const basket = useSelector(state => state.shoppingCartPage.basket)

  const restorans = useSelector(state => state.shopPage.restoran)
  const currentShopId = useSelector(
    state => state.shoppingCartPage.currentShopId
  )

  useEffect(() => {
    const restoran = restorans.find(item => item._id === currentShopId.shopId)
    if (basket.length > 0) {
      setRestoransCoordinates({
        lat: restoran.location.lat[0],
        lng: restoran.location.lng[0],
      })
    }
  }, [currentShopId.shopId, restorans])

  const [userCoordinates, setUsersCoordinates] = useState(defaultCenter)
  const [restoransCoordinates, setRestoransCoordinates] =
    useState(defaultCenter)

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  const dispatch = useDispatch()

  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    control,
    reset,
  } = useForm({ defaultValues })

  const onSubmit = data => {
    dispatch(orderSuccess(data, basket, totalPrice, onSuccess))
    reset({ defaultValues })
  }

  const onSuccess = useCallback(
    async order => {
      await orderSuccessDB(order)
    },
    [isSubmitSuccessful, basket]
  )

  // useEffect(() => {
  //   let items = 0
  //   let price = 0

  //   basket.forEach(item => {
  //     items += item.qty
  //     price += item.qty * item.price
  //   })

  //   setTotalItems(items)
  //   setTotalPrice(price)
  // }, [basket, totalPrice, totalItems, setTotalPrice, setTotalItems])

  useEffect(() => {
    const { qty, price } = basket.reduce(
      (acc, item) => {
        return {
          qty: acc.qty + item.qty,
          price: acc.price + item.qty * item.price,
        }
      },
      { qty: 0, price: 0 }
    )

    setTotalItems(qty)
    setTotalPrice(price)
  }, [basket, totalPrice, totalItems, setTotalPrice, setTotalItems])

  const libraries = ['places']

  const libRef = React.useRef(libraries)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries: libRef.current,
  })

  const onPlaceSelect = useCallback(coordinates => {
    setUsersCoordinates(coordinates)
  }, [])

  return (
    <form className={s.wrapper} onSubmit={handleSubmit(onSubmit)}>
      {isSubmitSuccessful && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity='success'>
            This is a success alert — check it out!
          </Alert>
        </Stack>
      )}

      <div className={s.wrapperOrder}>
        <ShoppingCartForm
          restoransCoordinates={restoransCoordinates}
          userCoordinates={userCoordinates}
          defaultCenter={defaultCenter}
          onSelect={onPlaceSelect}
          isLoaded={isLoaded}
          control={control}
          reset={reset}
          errors={errors}
        />
        <div className={s.shoppingCartOrderContainer}>
          {basket.map(order => {
            return <ShoppingCartOrder key={order._id} order={order} />
          })}
        </div>
      </div>
      <div className={s.submit}>
        <Typography component='div' variant='h5' sx={{ paddingBottom: '10px' }}>
          Total count: {totalPrice.toFixed(2)}$
        </Typography>
        <Button disabled={!basket.length} variant='contained' type='submit'>
          Submit
        </Button>
      </div>
    </form>
  )
}

export default ShoppingCart
