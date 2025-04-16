import { render } from '@testing-library/react'
import CustomInput from './custom-input.component'
import Color from '../../theme/theme.colors'

describe('Custom Input', () => {
  it('should render with erro if hasError is true', () => {
    const { getByPlaceholderText } = render(
      <CustomInput placeholder='Lorem Ipsum' hasError={true} />
    )

    const input = getByPlaceholderText('Lorem Ipsum')

    expect(input).toHaveStyle({ border: `2px solid ${Color.error}` })
  })

  it('should render without erro if hasError is false', () => {
    const { getByPlaceholderText } = render(
      <CustomInput placeholder='Lorem Ipsum' hasError={false} />
    )

    const input = getByPlaceholderText('Lorem Ipsum')

    expect(input).toHaveStyle({ border: 'none' })
  })
})
