import { useContext } from 'react'
import CustomButton from '../custom-button/custom-buttom.component'
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal
} from './cart.styles'
import { BsCartCheck } from 'react-icons/bs'
import { CartContext } from '../../contexts/cart.context'

const Cart = () => {
  const { isVisible, toggleCart } = useContext(CartContext)
  return (
    <>
      <CartContainer $isVisible={isVisible}>
        <CartEscapeArea onClick={toggleCart} />
        <CartContent>
          <CartTitle>Seu Carrinho</CartTitle>
          <CartTotal>Total: R$ 0,00</CartTotal>
          <CustomButton startIcon={<BsCartCheck />}>
            Ir para o Checkout
          </CustomButton>
        </CartContent>
      </CartContainer>
    </>
  )
}

export default Cart
