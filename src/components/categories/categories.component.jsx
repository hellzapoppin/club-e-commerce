import { useState } from 'react'
import('../../types/category.types').Category
import './categories.styles.css'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  return (
    <div className='categories-container'>
      <div className='categories-content'></div>
    </div>
  )
}

export default Categories
