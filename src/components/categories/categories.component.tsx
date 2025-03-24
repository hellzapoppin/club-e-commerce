import { useEffect, useState } from 'react'

import './categories.styles.css'
import Category from '../../types/category.types'
import CategoryItem from '../category-item/category-item.component'
import { CategoriesContainer, CategoriesContent } from './categories.style'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../config/firebase.config'
import { categoryConverter } from '../../converters/firestore.converters'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const fetchCategories = async () => {
    try {
      const categoriesFromFirestore: Category[] = []
      const queueSnapshot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )
      queueSnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })
      setCategories(categoriesFromFirestore)
    } catch (error) {
      console.log(error)
    }
  }
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
