import { FunctionComponent } from 'react'
import Category from '../../types/category.types'
import './category-item.style.css'

interface CategoryitemProps {
  category: Category
}

const CategoryItem: FunctionComponent<CategoryitemProps> = ({ category }) => {
  return (
    <div
      className='category-item-container'
      style={{ backgroundImage: category.imageUrl }}
    >
      <div className='category-name'>
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </div>
    </div>
  )
}

export default CategoryItem
