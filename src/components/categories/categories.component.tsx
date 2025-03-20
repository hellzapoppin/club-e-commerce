import { useEffect, useState } from 'react'

import './categories.styles.css'
// import axios from 'axios'
// import env from '../../config/env.config'
import Category from '../../types/category.types'
import CATEGORIES from '../../constants/categories'
import CategoryItem from '../category-item/category-item.component'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const cats = CATEGORIES
  // const fetchCategories = async () => {
  //   try {
  //     const { data } = await axios.get(`${env.apiURL}/api/category`)
  //     console.log(categories)
  //     setCategories(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  useEffect(() => {
    setCategories(cats)
    console.log(categories)
  }, [])
  return (
    <div className='categories-container'>
      <div className='categories-content'>
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
    </div>
  )
}

export default Categories
