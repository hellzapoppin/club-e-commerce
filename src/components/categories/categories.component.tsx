import { useContext, useEffect } from 'react'

import './categories.styles.css'
import CategoryItem from '../category-item/category-item.component'
import { CategoriesContainer, CategoriesContent } from './categories.style'
import { CategoryContext } from '../../contexts/category.context'

const Categories = () => {
  const { categories, fetchCategories } = useContext(CategoryContext)
  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <CategoriesContainer>
      <CategoriesContent>
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  )
}

export default Categories
