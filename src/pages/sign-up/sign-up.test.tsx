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
})
