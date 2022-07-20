import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addOrder } from '../../redux/shoppingCartReduser'

import s from './Shops.module.scss'

const Goods = props => {
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(addOrder(props.goods))
  }

  return (
    <div className={s.goodsWrapper}>
      <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
        <CardMedia
          component='img'
          height='140'
          image={`${props.goods.photoUrl}`}
          alt='green iguana'
        />
        <CardContent sx={{ p: '10px' }}>
          <Typography variant='h6' component='div'>
            {props.goods.name}
          </Typography>
        </CardContent>
        <Grid container sx={{ p: '10px', textAlign: 'center' }}>
          <Grid item xs={6}>
            <Typography variant='h6' component='div'>
              Price {props.goods.price + '$'}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Button onClick={handleSubmit} variant='contained'>
              Buy
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default Goods
