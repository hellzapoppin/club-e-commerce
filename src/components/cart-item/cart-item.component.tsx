// Library
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

// Utilities
import CartProduct from '../../types/cart.types'
import {
  decreaseCartProductQuantity,
  increaseCartProductQuantity,
  removeProductFromCart
} from '../../store/reducers/cart/cart.actions'

// Styles
import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton
} from './cart-item-styles'

interface CartItemProps {
  product: CartProduct
}

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useDispatch()

  const handleRemoveProductFromCartClick = () => {
    dispatch(removeProductFromCart(product.id))
  }
  const handleIncreaseProductQuantityClick = () => {
    dispatch(increaseCartProductQuantity(product.id))
  }
  const handleDescreaseProductQuantityClick = () => {
    dispatch(decreaseCartProductQuantity(product.id))
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
