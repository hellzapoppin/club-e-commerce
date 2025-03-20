import { useEffect, useState } from 'react'

import './categories.styles.css'
import axios from 'axios'
import env from '../../config/env.config'
import Category from '../../types/category.types'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${env.apiURL}/api/category`)
      console.log(categories)
      setCategories(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <div className='categories-container'>
      <div className='categories-content'></div>
    </div>
  )
}

export default Categories
