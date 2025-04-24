import { renderWithRedux } from '../../helpers/test.helpers'
import CartProduct from '../../types/cart.types'
import Checkout from './checkout.components'

describe('Checkout', () => {
  it('should show correct products and total price', () => {
    const cartItems: CartProduct[] = [
      {
        id: '1',
        name: 'Product 1',
        imageUrl: 'image_url',
        price: 100,
        quantity: 1
      }
    ]
    const { getByText } = renderWithRedux(<Checkout />, {
      preloadedState: { cartReducer: { products: cartItems, isVisible: false } }
    })

    getByText('Total: R$ 100,00')
    getByText(/finalizar compra/i)
    getByText(/checkout/i)
  })

  it('should show empty message if cart is empty and not show checkout button', () => {
    const cartItems: CartProduct[] = []
    const { getByText, queryByText } = renderWithRedux(<Checkout />, {
      preloadedState: { cartReducer: { products: cartItems, isVisible: false } }
    })

    getByText(/seu carrinho está vazio/i)
    expect(queryByText(/finalizar comprar/i)).toBeNull()
  })
})
