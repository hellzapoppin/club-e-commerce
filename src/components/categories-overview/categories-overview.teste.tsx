import * as firestore from 'firebase/firestore'
import Category from '../../types/category.types'
import CategoriesOverview from './categories-overview.component'
import { renderWithRedux } from '../../helpers/test.helpers'

jest.mock('firebase/firestore')

describe('Category Overview', () => {
  it('should fetch and show categories', async () => {
    const mockedFirestore = firestore as any

    mockedFirestore.getDocs.mockImplementation(async () => [
      {
        data(): Category {
          return {
            id: '1',
            displayName: 'lorem ipsum',
            imageUrl: 'image_url',
            name: 'lorem-ipsum',
            products: [
              {
                id: '1',
                name: 'boné',
                price: 100,
                imageUrl: 'image_url'
              }
            ]
          }
        }
      }
    ])

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {}
    }))

    const { findByText, getByText } = renderWithRedux(
      <CategoriesOverview />,
      {}
    )

    await findByText(/boné/i)
    getByText(/lorem ipsum/i)
    getByText('R$ 100')
  })
})
