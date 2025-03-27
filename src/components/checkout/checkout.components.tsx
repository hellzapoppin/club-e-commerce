import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal
} from './checkout.styles'
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-buttom.component'

import { BsBagCheck } from 'react-icons/bs'

const Checkout = () => {
  const { products, productsTotalPrice } = useContext(CartContext)
  return (
    <>
      <CheckoutContainer>
        <CheckoutTitle>Checkout</CheckoutTitle>

        {products.length > 0 ? (
          <>
            {' '}
            <CheckoutProducts>
              {products.map((product) => (
                <CartItem product={product} key={product.id}></CartItem>
              ))}
            </CheckoutProducts>
            <CheckoutTotal>
              Total:{' '}
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(productsTotalPrice)}
            </CheckoutTotal>
            <CustomButton startIcon={<BsBagCheck />}>
              Finalizar Compra
            </CustomButton>
          </>
        ) : (
          <>
            <p>Seu carrinho está vazio</p>
          </>
        )}
      </CheckoutContainer>
    </>
  )
}

export default Checkout
