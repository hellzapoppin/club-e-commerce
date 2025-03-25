import Category from '../../types/category.types'
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
      <ProductContainer></ProductContainer>
    </CategoryContainer>
  )
}

export default CategoryOverview
