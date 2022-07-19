import React from 'react'
import Restoran from './Restoran/Restoran'
import Goods from './Goods'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography } from '@mui/material'
import { setRestoran, setRestoranProducts } from '../../redux/shopReduser'
import { useEffect } from 'react'

import s from './Shops.module.scss'

const Shops = () => {
  const shops = useSelector(state => state.shopPage)
  const dispatch = useDispatch()

  const openGoods = id => {
    setRestoranProducts(dispatch, id)
  }

  useEffect(() => {
    setRestoran(dispatch)
  }, [])

  return (
    <div className={s.contentWrapper}>
      <nav className={s.navContainer}>
        <div>
          <Typography>Restorans:</Typography>
        </div>
        <div className={s.buttons}>
          {shops.restoran.map(shop => {
            return <Restoran openGoods={openGoods} key={shop._id} shop={shop} />
          })}
        </div>
      </nav>

      <div className={s.shopContainer}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
          sx={{ alignContent: 'baseline' }}
        >
          {shops.currentShopProducts.length &&
            [...shops.currentShopProducts].map(g => (
              <Grid key={g._id} item xs={2} sm={4}>
                <Goods goods={g} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  )
}

export default Shops
