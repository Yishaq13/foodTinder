import { ReactElement, useEffect, useState } from 'react'
import { ProductHttpService } from './Http/Product.http.service'
import Cards from './Components/Cards'
import { Product } from './Types/Product.d'
import { Box } from '@mui/material'

export default function App(): ReactElement {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    ProductHttpService.getProducts().then((data) => {
      setProducts(data)
    })
  }, [])

  return (
    <Box display='flex' justifyContent='center' mt={8}>
      {products.map((product) => (
        <Cards key={product.id} product={product} />
      ))}
    </Box>
  )
}
