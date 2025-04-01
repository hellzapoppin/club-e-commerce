// Library
import { useNavigate } from 'react-router-dom'
import { BsCartCheck } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

// Components
import CustomButton from '../custom-button/custom-buttom.component'
import CartItem from '../cart-item/cart-item.component'

// Styles
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal
} from './cart.styles'

// Utilities
import { toggleCart } from '../../store/reducers/cart/cart.actions'
import { useAppSelector } from '../../hooks/redux.hook'
import {
  selectProductsCount,
  selectProductsTotalPrice
} from '../../store/reducers/cart/cart.selectors'

const Cart = () => {
  const navigate = useNavigate()

  const productsTotalPrice = useAppSelector(selectProductsTotalPrice)
  const productsCount = useAppSelector(selectProductsCount)

  const { isVisible, products } = useAppSelector(
    (rootReducer) => rootReducer.cartReducer
  )
  const dispatch = useDispatch()

  const handleEscapeAreaClick = () => {
    toggleCart()
    navigate('/checkout')
  }

  const handleToggleClick = () => {
    dispatch(toggleCart())
  }
  return (
    <CartContainer $isVisible={isVisible}>
      <CartEscapeArea onClick={handleToggleClick} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {productsCount === 0 && <p>Seu carrinho está vazio</p>}

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCount > 0 && (
          <CartTotal>
            Total:{' '}
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(productsTotalPrice)}
          </CartTotal>
        )}

        {productsCount > 0 && (
          <CustomButton
            startIcon={<BsCartCheck />}
            onClick={handleEscapeAreaClick}
          >
            Ir para o Checkout
          </CustomButton>
        )}
      </CartContent>
    </CartContainer>
  )
}

export default Cart
