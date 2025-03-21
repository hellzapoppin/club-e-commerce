import CustomButton from '../../components/custom-button/custom-buttom.component'
import Header from '../../components/header/header.component'
// import { BsGoogle } from 'react-icons/bs'
// import { FiLogIn } from 'react-icons/fi'
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
          <CustomButton>Entrar com o Google</CustomButton>
          <LoginSubtitle>ou entre com seu e-mail</LoginSubtitle>
          <LoginInputContainer>{/* email input */}</LoginInputContainer>
          <LoginInputContainer>{/* password input */}</LoginInputContainer>
          <CustomButton>Entrar</CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
