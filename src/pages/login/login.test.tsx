import userEvent from '@testing-library/user-event'
import { renderWithRedux } from '../../helpers/test.helpers'
import LoginPage from './login.page'
import * as firebaseAuth from 'firebase/auth'
import { AuthErrorCodes } from 'firebase/auth'

jest.mock('firebase/auth')

describe('Login', () => {
  it('should show errors when trying to submit without filling required fields', async () => {
    const { findByText, getByText } = renderWithRedux(<LoginPage />, {})

    const submitButton = getByText('Entrar')

    userEvent.click(submitButton)

    await findByText(/o e-mail é obrigatório/i)
    getByText(/A senha é obrigatória/i)
  })

  it('should show error if email is invalid', async () => {
    const { getByPlaceholderText, getByText, findByText } = renderWithRedux(
      <LoginPage />,
      {}
    )

    const emailInput = getByPlaceholderText(/digite seu e-mail/i)
    const submitButton = getByText('Entrar')

    userEvent.type(emailInput, 'invalid_email')
    userEvent.click(submitButton)

    await findByText(/Endereço de e-mail inválido/i)
  })

  it('should show a error if email or password is invalid', async () => {
    const mockFirebaseAuth = firebaseAuth as any

    mockFirebaseAuth.signInWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({ code: AuthErrorCodes.INVALID_IDP_RESPONSE })
    )

    const { getByPlaceholderText, getByText, findByText } = renderWithRedux(
      <LoginPage />,
      {}
    )

    const emailInput = getByPlaceholderText(/digite seu e-mail/i)
    userEvent.type(emailInput, 'lorem@ipsum.com')

    const passwordInput = getByPlaceholderText(/digite sua senha/i)
    userEvent.type(passwordInput, '123456')

    const submitButton = getByText('Entrar')
    userEvent.click(submitButton)

    await findByText(/E-mail e\/ou senha inválidos/i)
  })
})
