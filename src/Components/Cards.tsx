import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Product } from '../Types/Product'
import './Cards.css'

interface CardProps {
  product: Product
}

function ItemCard(props: CardProps) {
  return (
    <Card sx={{ width: 400, height: 500 }} variant='outlined' style={{ position: 'absolute' }}>
      <CardMedia
        component='img'
        height='200'
        image={props.product.imageSet[0].url}
        alt={props.product.name}
        sx={{ objectFit: 'contain', margin: 2 }}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>
          {props.product.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {props.product.shortDescription}
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={6}>
            <Typography fontWeight='800'>Price</Typography>
          </Grid>
          <Grid item xs={6}>
            {props.product.price} $
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight='800'> Category</Typography>
          </Grid>
          <Grid item xs={6}>
            {props.product.category.name}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
export default ItemCard
