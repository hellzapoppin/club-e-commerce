import Product from '../../types/product.types'
import {
  ProductContainer,
  ProductImage,
  ProductInfo
} from './product-item.style'

interface ProductItemProps {
  product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <ProductContainer>
      <ProductImage $imageUrl={product.imageUrl} />
      <ProductInfo>
        <p>{product.name}</p>
        <p>{product.price}</p>
      </ProductInfo>
    </ProductContainer>
  )
}

export default ProductItem
