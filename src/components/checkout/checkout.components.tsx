import { useContext, useState } from 'react'
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
import axios from 'axios'
import Loading from '../loading/loading.component'

const Checkout = () => {
  const { products, productsTotalPrice } = useContext(CartContext)

  const [isLoading, setIsLoading] = useState(false)

  const handleFinishPurchaseCLick = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/create-checkout-session`,
        {
          products
        }
      )
      window.location.href = data.url
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <CheckoutContainer>
        {isLoading && <Loading />}
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
            <CustomButton
              startIcon={<BsBagCheck />}
              onClick={handleFinishPurchaseCLick}
            >
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
