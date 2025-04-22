import { getByText } from '@testing-library/dom'
import { renderWithRedux } from '../../helpers/test.helpers'
import CartProduct from '../../types/cart.types'
import Cart from './cart.component'
import userEvent from '@testing-library/user-event'

describe('Cart', () => {
  it('should show correct cart products', () => {
    const products: CartProduct[] = [
      {
        id: '1',
        imageUrl: 'image_url',
        name: 'Boné',
        price: 100,
        quantity: 2
      }
    ]
    const { getByText } = renderWithRedux(<Cart />, {
      preloadedState: { cartReducer: { products } } as any
    })

    getByText(/boné/i)
    getByText('R$ 100')
    getByText('2')
    getByText('Total: R$ 200,00')
    getByText(/ir para o checkout/i)
  })

  it('should not show checkout button and should shown an empty message if cart is empty', () => {
    const products: CartProduct[] = []
    const { getByText, queryByText } = renderWithRedux(<Cart />, {
      preloadedState: { cartReducer: { products } } as any
    })

    getByText('Seu carrinho está vazio')
    expect(queryByText(/ir para o checkout/i)).toBeNull()
  })

  it('should increase product quantity on increase click', () => {
    const products: CartProduct[] = [
      {
        id: '1',
        imageUrl: 'image_url',
        name: 'Boné',
        price: 100,
        quantity: 2
      }
    ]
    const { getByLabelText, getByText } = renderWithRedux(<Cart />, {
      preloadedState: { cartReducer: { products } } as any
    })

    const increaseButton = getByLabelText(/increase quantity of boné/i)

    userEvent.click(increaseButton)

    getByText('3')
  })

  it('should decrease product quantity on decrease click', () => {
    const products: CartProduct[] = [
      {
        id: '1',
        imageUrl: 'image_url',
        name: 'Boné',
        price: 100,
        quantity: 2
      }
    ]
    const { getByLabelText, getByText } = renderWithRedux(<Cart />, {
      preloadedState: { cartReducer: { products } } as any
    })

    const decreaseButton = getByLabelText(/decrease quantity of boné/i)

    userEvent.click(decreaseButton)

    getByText('1')
  })
})
