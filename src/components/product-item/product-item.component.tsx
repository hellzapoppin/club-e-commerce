// Library
import { BsCartPlus } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

// Styles
import {
  ProductContainer,
  ProductImage,
  ProductInfo
} from './product-item.style'

// Components
import CustomButton from '../custom-button/custom-buttom.component'

// Utilities
import Product from '../../types/product.types'
import { addProductToCart } from '../../store/toolkit/cart/cart.slice'

interface ProductItemProps {
  product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useDispatch()
  const handleAddToCartClick = () => {
    dispatch(addProductToCart(product))
  }
  return (
    <ProductContainer>
      <ProductImage $imageUrl={product.imageUrl}>
        <CustomButton
          startIcon={<BsCartPlus size={14} />}
          onClick={handleAddToCartClick}
        >
          Adicionar ao carrinho
        </CustomButton>
      </ProductImage>
      <ProductInfo>
        <p>{product.name}</p>
        <p>{product.price}</p>
      </ProductInfo>
    </ProductContainer>
  )
}

export default ProductItem
