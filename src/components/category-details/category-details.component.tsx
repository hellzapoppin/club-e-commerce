import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { BiChevronLeft } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

// Utilities
import { db } from '../../config/firebase.config'
import { categoryConverter } from '../../converters/firestore.converters'
import Category from '../../types/category.types'

// Components
import Loading from '../loading/loading.component'
import ProductItem from '../product-item/product-item.component'

// Styles
import {
  CategoryTitle,
  Container,
  IconContainer,
  ProductsContainer
} from './category-details.styles'

interface CategoryDetailsProps {
  categoryId: string
}

const CategoryDetails = ({ categoryId }: CategoryDetailsProps) => {
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleGoBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true)

        const querySnapshot = await getDocs(
          query(
            collection(db, 'categories').withConverter(categoryConverter),
            where('id', '==', categoryId)
          )
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
