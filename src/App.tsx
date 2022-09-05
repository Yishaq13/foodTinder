import { ReactElement, useEffect, useState } from 'react'
import { ProductHttpService } from './Http/Product.http.service'
import Cards from './Components/Cards'
import { Product } from './Types/Product.d'
import { Box, Button, Card, CardContent, Snackbar, Typography } from '@mui/material'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import { Voting } from './Types/Voting'

export default function App(): ReactElement {
  const [products, setProducts] = useState<Product[]>([])
  const [votedItems, setVotedItems] = useState<Voting[]>([])
  const [itemToVote, setItemsToVote] = useState<Product[]>([])
  const [displayError, setDisplayError] = useState(false)

  useEffect(() => {
    let itemsAlreadyVoted: Voting[] = []

    // check window storage to get alreadyVoted Items
    if (window.sessionStorage.getItem('votedItems')) {
      itemsAlreadyVoted = JSON.parse(window.sessionStorage.getItem('votedItems') || '[]')
      setVotedItems(itemsAlreadyVoted)
    }

    const votedIds = itemsAlreadyVoted.map((item: Voting) => item.id)

    // filter item which are already voted
    // filter items which are not 'Speisen - Food'
    ProductHttpService.getProducts()
      .then((data) => {
        const productsToDisplay = data.filter((food) => !votedIds.includes(food.id))
        setProducts(data)
        setItemsToVote(productsToDisplay)
      })
      .catch(() => {
        setDisplayError(true)
      })
  }, [])

  useEffect(() => {
    if (votedItems.length) {
      console.log('memory')
      window.sessionStorage.setItem('votedItems', JSON.stringify(votedItems))
    }
  }, [votedItems])

  const handleVote = (vote: string) => {
    console.log(vote, itemToVote[0].id)
    const voteId = itemToVote[0].id
    setVotedItems((prevState) => [...prevState, { id: voteId, vote: vote }])
    setItemsToVote((prevState) => [...prevState.filter((item) => item.id !== voteId)])
  }

  const HandleReset = () => {
    // reset storage and states
    console.log('reset called')
    window.sessionStorage.removeItem('votedItems')
    setVotedItems([])
    setItemsToVote(products)
  }

  return (
    <Box>
      <Box display='flex' justifyContent='center' mt={8} height={500}>
        {itemToVote[0] && <Cards product={itemToVote[0]} />}
        <Card sx={{ width: 400, height: 500 }} variant='outlined'>
          <CardContent>
            <Typography gutterBottom variant='h5' color='text.secondary'>
              Refresh to Continue.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box display='flex' justifyContent='center' mt={4}>
        <Box width={400} display='flex' flexDirection='row' justifyContent='space-between'>
          {itemToVote[0] && (
            <Button variant='contained' onClick={() => handleVote('Dislike')} color='error'>
              <ThumbDownAltOutlinedIcon />
            </Button>
          )}
          <Button
            variant='contained'
            onClick={() => HandleReset()}
            color='info'
            fullWidth={itemToVote.length ? false : true}
          >
            <RestartAltOutlinedIcon />
          </Button>
          {itemToVote[0] && (
            <Button variant='contained' onClick={() => handleVote('Like')} color='success'>
              <ThumbUpOutlinedIcon />
            </Button>
          )}
        </Box>
      </Box>
      <Snackbar
        open={displayError}
        autoHideDuration={6000}
        message='Something Went wrong. Please Refresh the page.'
      />
    </Box>
  )
}
