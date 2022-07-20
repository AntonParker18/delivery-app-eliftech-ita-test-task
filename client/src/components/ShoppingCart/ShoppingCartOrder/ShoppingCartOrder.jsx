import React from 'react'
import { useState } from 'react'
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { adjustItemQty, deleteOrder } from '../../../redux/shoppingCartReduser'
import { connect } from 'react-redux'

import s from './ShoppingCartOrder.module.scss'

const ShoppingCartOrder = ({ order, adjustQty, deleteItem }) => {
  const [input, setInput] = useState(order.qty)

  const onChangeHandler = e => {
    setInput(e.target.value)
    adjustQty(order._id, e.target.value)
  }

  const deleteBtn = () => {
    deleteItem(order)
  }

  return (
    <div className={s.wrapper}>
      <Box sx={{ flexGrow: '2' }}>
        <CardContent sx={{ alignItems: 'center' }}>
          <CardMedia
            component='img'
            sx={{ width: '160px', height: '106px', m: '0 auto' }}
            image={order.photoUrl}
          />
        </CardContent>
      </Box>
      <div className={s.orderParams}>
        <Typography component='div' variant='h5'>
          {order.name}
        </Typography>
        <Typography component='div' variant='h5'>
          Price {order.price + '$'}
        </Typography>
        <Typography component='div' variant='h5'>
          <div className={s.cartItem__qty}>
            <input
              min='1'
              type='number'
              id='qty'
              name='qty'
              value={input}
              onChange={onChangeHandler}
            />
          </div>
        </Typography>
      </div>
      <div className={s.deleteBtn}>
        {/* <ClearIcon sx={{ gap: '2em' }} /> */}
        <Button variant='contained' onClick={deleteBtn}>
          Delete
        </Button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
    deleteItem: order => dispatch(deleteOrder(order)),
  }
}

export default connect(null, mapDispatchToProps)(ShoppingCartOrder)
