import userEvent from '@testing-library/user-event'
import { renderWithRedux } from '../../helpers/test.helpers'
import SignUpPage from './sign-up.page'

describe('Sign Up', () => {
  it('should show errors when trying to submit without filling all required fields', async () => {
    const { getByText, findByText } = renderWithRedux(<SignUpPage />, {})

    const submitButton = getByText(/criar conta/i, { selector: 'button' })

    userEvent.click(submitButton)

    await findByText(/^Nome obrigatório$/i)
    getByText(/Sobrenome obrigatório/i)
    getByText(/E-mail obrigatório/i)
    getByText(/^Senha obrigatório$/i)
    getByText(/Confirmação de senha obrigatório/i)
  })

  it('should show errors when filling an invalid email', async () => {
    const { getByText, findByText, getByPlaceholderText } = renderWithRedux(
      <SignUpPage />,
      {}
    )

    const emailInput = getByPlaceholderText(/digite seu e-mail/i)
    userEvent.type(emailInput, 'invalid_email')

    const submitButton = getByText(/criar conta/i, { selector: 'button' })

    userEvent.click(submitButton)

    await findByText(/^Endereço de e-mail inválido$/i)
  })

  it('should show errors when password and password confirmation are different', async () => {
    const { getByText, findByText, getByPlaceholderText } = renderWithRedux(
      <SignUpPage />,
      {}
    )

    const passwordInput = getByPlaceholderText(/digite seu senha/i)
    userEvent.type(passwordInput, '123456')
    const passwordConfirmationInput = getByPlaceholderText(
      /digite novamente sua senha/i
    )
    userEvent.type(passwordConfirmationInput, '1234567')

    const submitButton = getByText(/criar conta/i, { selector: 'button' })

    userEvent.click(submitButton)

    await findByText(/^Senhas não conferem$/i)
  })
})
