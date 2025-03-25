import React, { createContext, FunctionComponent, useState } from 'react'
import Category from '../types/category.types'
import { collection, getDocs } from 'firebase/firestore'
import { categoryConverter } from '../converters/firestore.converters'
import { db } from '../config/firebase.config'

interface CategoryContextInterface {
  categories: Category[]
  isLoading: boolean
  fetchCategories(): Promise<void>
}

export const CategoryContext = createContext<CategoryContextInterface>({
  categories: [],
  isLoading: false,
  fetchCategories: () => Promise.resolve()
})

interface CategoryContextProps {
  children: React.ReactNode
}

const CategoryContextProvider: FunctionComponent<CategoryContextProps> = ({
  children
}) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchCategories = async () => {
    try {
      setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <CategoryContext.Provider
      value={{ categories, isLoading, fetchCategories }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextProvider
