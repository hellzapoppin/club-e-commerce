import { render } from '@testing-library/react'
import InputErrorMessage from './input-error-message.component'
import Color from '../../theme/theme.colors'

describe('Input Error Message', () => {
  it('should show message with error color', () => {
    const { getByText } = render(
      <InputErrorMessage message='Lorem ipsum'></InputErrorMessage>
    )

    const message = getByText('Lorem ipsum')

    expect(message).toHaveStyle({ color: Color.error })
  })
})
