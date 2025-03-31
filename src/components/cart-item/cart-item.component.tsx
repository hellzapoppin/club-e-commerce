import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton
} from './cart-item-styles'
import CartProduct from '../../types/cart.types'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

interface CartItemProps {
  product: CartProduct
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    removeProductFromCart,
    increaseProductQuantity,
    descreaseProductQuantity
  } = useContext(CartContext)

  const handleRemoveProductFromCartClick = () => {
    removeProductFromCart(product.id)
  }
  const handleIncreaseProductQuantityClick = () => {
    increaseProductQuantity(product.id)
  }
  const handleDescreaseProductQuantityClick = () => {
    descreaseProductQuantity(product.id)
  }
  return (
    <CartItemContainer>
      <CartItemImage $imageUrl={product.imageUrl}></CartItemImage>
      <CartItemInfo>
        <p>{product.name}</p>
        <p>R$ {product.price}</p>
        <CartItemQuantity>
          <AiOutlineMinus
            size={20}
            onClick={handleDescreaseProductQuantityClick}
          />
          <p>{product.quantity}</p>
          <AiOutlinePlus
            size={20}
            onClick={handleIncreaseProductQuantityClick}
          />
        </CartItemQuantity>
      </CartItemInfo>
      <RemoveButton onClick={handleRemoveProductFromCartClick}>
        <AiOutlineClose size={25} />
      </RemoveButton>
    </CartItemContainer>
  )
}

export default CartItem
