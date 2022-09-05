import axios from 'axios'
import { Product, ProductsResponse } from '../Types/Product'

export class ProductHttpService {
  public static async getProducts(): Promise<Product[]> {
    const response = await axios.get<{ data: ProductsResponse }>(
      'https://amperoid.tenants.foodji.io/machines/4bf115ee-303a-4089-a3ea-f6e7aae0ab94',
    )
    return response.data.data.machineProducts
      .sort((item1, item2) => item1.id.localeCompare(item2.id))
      .filter((food) => food.category.name === 'Speisen - Food')
  }
}
