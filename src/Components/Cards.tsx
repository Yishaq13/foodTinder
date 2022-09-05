import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import { Product } from '../Types/Product'
import './Cards.css'

interface CardProps {
  product: Product
}
function Cards(props: CardProps) {
  const [people, SetPeople] = useState([
    {
      name: 'MSD',
      url: 'https://cdn.pixabay.com/photo/2020/12/16/06/01/mahendra-singh-dhoni-5835730__340.png',
    },
    {
      name: 'Virat',
      url: 'https://cdn.pixabay.com/photo/2020/12/16/06/08/virat-kohli-5835741__340.png',
    },
  ])

  const swiped = (direction: string, nameToDelete: string) => {
    console.log('removing: ' + nameToDelete)
    console.log(direction)
  }
  const outOfFrame = (name: string) => {
    console.log(name + 'left the screen!')
  }

  return (
    <TinderCard
      className='swipe'
      key={props.product.id}
      preventSwipe={['up', 'down']}
      onSwipe={(dir: string) => swiped(dir, props.product.name)}
      onCardLeftScreen={() => outOfFrame(props.product.name)}
    >
      <Card sx={{ width: 400, height: 500 }} variant='outlined'>
        <CardMedia
          component='img'
          height='200'
          image={props.product.imageSet[0].url}
          alt={props.product.name}
          sx={{ objectFit: 'contain', margin: 2 }}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {props.product.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {props.product.shortDescription}
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              Price
            </Grid>
            <Grid item xs={6}>
              {props.product.price}
            </Grid>
            <Grid item xs={6}>
              Category
            </Grid>
            <Grid item xs={6}>
              {props.product.category.name}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </TinderCard>
  )
}
export default Cards
