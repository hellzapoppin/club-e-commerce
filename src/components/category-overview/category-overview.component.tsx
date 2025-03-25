import Category from '../../types/category.types'
import ProductItem from '../product-item/product-item.component'
import {
  CategoryContainer,
  CategoryTitle,
  ProductContainer
} from './category-overview.styles'

interface CategoryOverviewProps {
  category: Category
}

const CategoryOverview = ({ category }: CategoryOverviewProps) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>
      <ProductContainer>
        {category.products.slice(0, 4).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductContainer>
    </CategoryContainer>
  )
}

export default CategoryOverview
