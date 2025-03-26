import { useContext } from 'react'
import Product from '../../types/product.types'
import CustomButton from '../custom-button/custom-buttom.component'
import {
  ProductContainer,
  ProductImage,
  ProductInfo
} from './product-item.style'

import { BsCartPlus } from 'react-icons/bs'
import { CartContext } from '../../contexts/cart.context'

interface ProductItemProps {
  product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { addProductToCart } = useContext(CartContext)
  const handleAddToCartClick = () => {
    addProductToCart(product)
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
