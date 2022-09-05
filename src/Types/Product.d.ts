export interface Product {
  id: number
  name: string
  price: number
  shortDescription: string
  imageSet: ProductImage[]
  category: Category
}

export interface ProductsResponse {
  name: string
  machineProducts: Product[]
}

export interface ProductImage {
  id: string
  title: string
  url: string
}

export interface Category {
  id: string
  name: string
}
