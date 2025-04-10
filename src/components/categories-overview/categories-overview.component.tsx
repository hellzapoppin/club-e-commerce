import { useEffect } from 'react'
import { Container } from './categories-overview.styles'
import CategoryOverview from '../category-overview/category-overview.component'
import Loading from '../loading/loading.component'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/redux.hook'
import { fetchCategories } from '../../store/toolkit/category/category.slice'

const CategoriesOverview = () => {
  const { categories, isLoading } = useAppSelector(
    (state) => state.categoryReducer
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories() as any)
    }
  }, [])

  if (isLoading) return <Loading />

  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview key={category.id} category={category} />
      ))}
    </Container>
  )
}

export default CategoriesOverview
