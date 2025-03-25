import Category from '../../types/category.types'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase.config'
import { categoryConverter } from '../../converters/firestore.converters'
import Loading from '../loading/loading.component'
import {
  CategoryTitle,
  Container,
  IconContainer,
  ProductsContainer
} from './category-details.styles'

import { BiChevronLeft } from 'react-icons/bi'
import ProductItem from '../product-item/product-item.component'
import { useNavigate } from 'react-router-dom'

interface CategoryDetailsProps {
  categoryId: string
}

const CategoryDetails = ({ categoryId }: CategoryDetailsProps) => {
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true)
        const querySnapshot = await getDocs(
          query(
            collection(db, 'categories'),
            where('id', '==', categoryId)
          ).withConverter(categoryConverter)
        )
        const category = querySnapshot.docs[0]?.data()
        setCategory(category)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategory()
  }, [])

  const handleGoBackClick = () => {
    navigate(-1)
  }

  if (isLoading) return <Loading />

  return (
    <>
      <Container>
        <CategoryTitle>
          <IconContainer>
            <BiChevronLeft size={36} onClick={handleGoBackClick} />
          </IconContainer>
          <p>Explorar {category?.displayName}</p>
        </CategoryTitle>
        <ProductsContainer>
          {category?.products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ProductsContainer>
      </Container>
    </>
  )
}

export default CategoryDetails
