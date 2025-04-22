import Header from './header.component'
import { renderWithRedux } from '../../helpers/test.helpers'
import cartReducer from '../../store/reducers/cart/cart.reducer'
import CartProduct from '../../types/cart.types'

describe('Header', () => {
  it('should show sign out button if user is authenticated', () => {
    const { getByText } = renderWithRedux(<Header />, {
      preloadedState: { userReducer: { isAuthenticated: true } } as any
    })

    getByText(/sair/i)
  })

  it('should show sign in and sign up if user is not authenticated', () => {
    const { getByText } = renderWithRedux(<Header />, {
      preloadedState: { userReducer: { isAuthenticated: false } } as any
    })

    getByText(/login/i)
    getByText(/criar conta/i)
  })

  it('should show correct cart products count', () => {
    const products: CartProduct[] = [
      {
        id: '1',
        name: 'Boné',
        imageUrl: 'image_url',
        price: 100,
        quantity: 10
      },
      {
        id: '2',
        name: 'Jaqueta',
        imageUrl: 'image_url',
        price: 100,
        quantity: 12
      }
    ]

    const { getByText } = renderWithRedux(<Header />, {
      preloadedState: { cartReducer: { products } }
    } as any)

    getByText('(22)')
  })
})
