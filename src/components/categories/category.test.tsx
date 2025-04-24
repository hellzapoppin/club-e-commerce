import * as firestore from 'firebase/firestore'
import { renderWithRedux } from '../../helpers/test.helpers'
import Categories from './categories.component'
import { waitFor } from '@testing-library/dom'

jest.mock('firebase/firestore')

describe('Category', () => {
  it('should fetch and show categories', async () => {
    const mockedFirestore = firestore as any
    mockedFirestore.getDocs.mockReturnValue([
      {
        data() {
          return {
            id: '1',
            displayName: 'Lorem Ipsum'
          }
        }
      }
    ])

    mockedFirestore.collection.mockReturnValue({
      withConverter: () => {}
    })

    const { getByText, findByText } = renderWithRedux(<Categories />, {})

    await findByText(/lorem ipsum/i)
    //ou
    await waitFor(() => {
      getByText(/lorem ipsum/i)
    })
    getByText(/explorar/i)
  })
})
