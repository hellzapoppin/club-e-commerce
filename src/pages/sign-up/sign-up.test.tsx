import userEvent from '@testing-library/user-event'
import * as firebaseAuth from 'firebase/auth'

import { renderWithRedux } from '../../helpers/test.helpers'
import SignUpPage from './sign-up.page'

jest.mock('firebase/auth')

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

  it('should show errors when password has less than 6 characteres', async () => {
    const { getByText, findByText, getByPlaceholderText } = renderWithRedux(
      <SignUpPage />,
      {}
    )

    const passwordInput = getByPlaceholderText(/digite seu senha/i)
    userEvent.type(passwordInput, '123')
    const passwordConfirmationInput = getByPlaceholderText(
      /digite novamente sua senha/i
    )
    userEvent.type(passwordConfirmationInput, '123')

    const submitButton = getByText(/criar conta/i, { selector: 'button' })

    userEvent.click(submitButton)

    await findByText(/^A senha deve conter, no mínimo, 6 caracteres$/i)
    getByText(/^A confirmação de senha deve conter, no mínimo, 6 caracteres$/i)
  })

  it('should show errors if email already exist', async () => {
    const { getByText, findByText, getByPlaceholderText } = renderWithRedux(
      <SignUpPage />,
      {}
    )

    const mockFirebaseAuth = firebaseAuth as any
    mockFirebaseAuth.createUserWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({ code: firebaseAuth.AuthErrorCodes.EMAIL_EXISTS })
    )

    const firstnameInput = getByPlaceholderText(/^digite seu nome$/i)
    const lastnameInput = getByPlaceholderText(/digite seu sobrenome/i)
    const emailInput = getByPlaceholderText(/digite seu e-mail/i)
    const passwordInput = getByPlaceholderText(/^digite seu senha$/i)
    const passwordConfirmationInput = getByPlaceholderText(
      /digite novamente sua senha/i
    )

    userEvent.type(firstnameInput, 'lorem')
    userEvent.type(lastnameInput, 'ipsum')
    userEvent.type(emailInput, 'lorem@ipsum.com')
    userEvent.type(passwordInput, '123456')
    userEvent.type(passwordConfirmationInput, '123456')

    const submitButton = getByText(/criar conta/i, { selector: 'button' })

    userEvent.click(submitButton)

    await findByText(/^E-mail já cadastrado$/i)
  })
})
