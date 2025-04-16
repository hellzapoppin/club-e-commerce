import { render } from '@testing-library/react'
import Loading from './loading.component'

describe('Loading', () => {
  it('should shows a message if there is one', () => {
    const { getByText } = render(<Loading message='Lorem ipsum' />)

    getByText('Lorem ipsum')
  })
})
