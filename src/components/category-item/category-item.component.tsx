import { FunctionComponent } from 'react'
import Category from '../../types/category.types'
import './category-item.style.css'
import { CategoryItemContainer, CategoryName } from './category-item.style'

interface CategoryitemProps {
  category: Category
}

const CategoryItem: FunctionComponent<CategoryitemProps> = ({ category }) => {
  return (
    <CategoryItemContainer backgroundImage={category.imageUrl}>
      <CategoryName>
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </CategoryName>
    </CategoryItemContainer>
  )
}

export default CategoryItem
