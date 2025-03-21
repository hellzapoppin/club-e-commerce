import Header from '../../components/header/header.component'
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'

const LoginPage = () => {
  return (
    <>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>
          {/* button */}
          <LoginSubtitle>ou entre com seu e-mail</LoginSubtitle>
          <LoginInputContainer>{/* email input */}</LoginInputContainer>
          <LoginInputContainer>{/* password input */}</LoginInputContainer>
          {/* button */}
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
