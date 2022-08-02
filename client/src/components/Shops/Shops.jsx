import React from 'react'
import Restoran from './Restoran/Restoran'
import Goods from './Goods'
import { connect, useSelector } from 'react-redux'
import { Grid, Typography } from '@mui/material'
import {
  RestoranThunkCreator,
  RestoranProductsThunkCreator,
} from '../../redux/shopReduser'
import { useEffect } from 'react'

import s from './Shops.module.scss'

const Shops = ({ setRestoran, setProducts }) => {
  const shops = useSelector(state => state.shopPage)

  const openGoods = id => {
    setProducts(id)
  }

  useEffect(() => {
    setRestoran()
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

const mapDispatchToProps = dispatch => {
  return {
    setRestoran: (id, value) => dispatch(RestoranThunkCreator(id, value)),
    setProducts: order => dispatch(RestoranProductsThunkCreator(order)),
  }
}

export default connect(null, mapDispatchToProps)(Shops)
