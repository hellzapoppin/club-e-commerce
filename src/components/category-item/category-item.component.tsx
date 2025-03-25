import { FunctionComponent } from 'react'
import Category from '../../types/category.types'
import './category-item.style.css'
import { CategoryItemContainer, CategoryName } from './category-item.style'
import { useNavigate } from 'react-router-dom'
interface CategoryitemProps {
  category: Category
}

const CategoryItem: FunctionComponent<CategoryitemProps> = ({ category }) => {
  const navigate = useNavigate()
  const handleExploreClick = () => {
    navigate(`/category/${category.id}`)
  }
  return (
    <CategoryItemContainer backgroundImage={category.imageUrl}>
      <CategoryName onClick={handleExploreClick}>
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </CategoryName>
    </CategoryItemContainer>
  )
}

export default CategoryItem
