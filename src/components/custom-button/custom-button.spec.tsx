import { render } from '@testing-library/react'
import CustomButton from './custom-buttom.component'

describe('Custom Button', () => {
  it('should render with correct children', () => {
    const { getByText } = render(<CustomButton>lorem ipsum</CustomButton>)

    getByText('lorem ipsum')
  })
})
