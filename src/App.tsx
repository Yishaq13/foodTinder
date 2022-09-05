import { ReactElement, useEffect, useState } from 'react'
import { ProductHttpService } from './Http/Product.http.service'
import Cards from './Components/Cards'
import { Product } from './Types/Product.d'
import { Box, Button } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import { Voting } from './Types/Voting'

export default function App(): ReactElement {
  const [products, setProducts] = useState<Product[]>([])
  const [votedItems, setVotedItems] = useState<Voting[]>([])
  const [refresh, setRefresh] = useState<boolean>(false)

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
    ProductHttpService.getProducts().then((data) => {
      const productsToDisplay = data
        .filter((food) => food.category.name === 'Speisen - Food' && !votedIds.includes(food.id))
        .sort((item1, item2) => item1.id.localeCompare(item2.id))
      setProducts(productsToDisplay)
    })
  }, [refresh])

  useEffect(() => {
    if (votedItems.length) {
      window.sessionStorage.setItem('votedItems', JSON.stringify(votedItems))
    }
  }, [votedItems.length])

  const HandleSwipe = (vote: Voting) => {
    setVotedItems((prevState) => [...prevState, vote])
  }

  const HandleReset = () => {
    // reset storage and states
    window.sessionStorage.removeItem('votedItems')
    setVotedItems([])
    setRefresh((prevState) => !prevState)
  }

  return (
    <Box>
      <Box display='flex' justifyContent='center' mt={8} height={500}>
        {products.map((product) => (
          <Cards key={product.id} product={product} onSwipe={HandleSwipe} />
        ))}
      </Box>
      <Box display='flex' justifyContent='center' mt={4}>
        <Box display='flex' justifyContent='space-between' width={400}>
          <Button variant='contained' color='warning'>
            <ThumbDownOutlinedIcon />
          </Button>
          <Button variant='contained' onClick={() => HandleReset()}>
            <RestartAltOutlinedIcon />
          </Button>
          <Button variant='contained' color='success'>
            <ThumbUpOutlinedIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
;[]
