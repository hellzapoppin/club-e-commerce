import { renderWithRedux } from '../../helpers/test.helpers'
import Category from '../../types/category.types'
import CategoryOverview from './category-overview.component'

describe('Category Overview', () => {
  it('should show correct category and its products', () => {
    const category: Category = {
      id: '1',
      displayName: 'Lorem Ipsum',
      imageUrl: 'image_url',
      name: 'lorem-ipsum',
      products: [
        {
          id: '1',
          name: 'Product 1',
          imageUrl: 'image_url',
          price: 100
        },
        {
          id: '2',
          name: 'Product 2',
          imageUrl: 'image_url',
          price: 200
        },
        {
          id: '3',
          name: 'Product 3',
          imageUrl: 'image_url',
          price: 300
        },
        {
          id: '4',
          name: 'Product 4',
          imageUrl: 'image_url',
          price: 400
        },
        {
          id: '5',
          name: 'Product 5',
          imageUrl: 'image_url',
          price: 500
        }
      ]
    }
    const { getByText, queryByText } = renderWithRedux(
      <CategoryOverview category={category} />,
      {}
    )

    getByText(/lorem ipsum/i)

    getByText(/product 1/i)
    getByText('R$ 100')

    getByText(/product 2/i)
    getByText('R$ 200')

    getByText(/product 3/i)
    getByText('R$ 300')

    getByText(/product 4/i)
    getByText('R$ 400')

    expect(queryByText(/product 5/i)).toBeNull()
    expect(queryByText('R$ 500')).toBeNull()
  })
})
