import Product from '../../types/product.types'
import ProductItem from './product-item.component'
import { renderWithRedux } from '../../helpers/test.helpers'

describe('Product Item', () => {
  it('should show correct product', () => {
    const product: Product = {
      id: '1',
      imageUrl: 'image_url',
      name: 'Boné',
      price: 100
    }

    const { getByText } = renderWithRedux(
      <ProductItem key={product.id} product={product} />,
      {}
    )

    getByText(/boné/i)
    getByText('R$ 100')
    getByText(/adicionar ao carrinho/i)
  })
})
