import CustomButton from '../../components/custom-button/custom-buttom.component'
import Header from '../../components/header/header.component'
import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'
import CustomInput from '../../components/custom-input/custom-input.component'
import { useForm } from 'react-hook-form'

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const handleSubmitPress = (data: any) => {
    console.log(data)
  }

  console.log({ errors })
  return (
    <>
      <Header />

      <LoginContainer>
        <LoginContent onSubmit={handleSubmit(handleSubmitPress)}>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>
          <CustomButton startIcon={<BsGoogle size={18} />}>
            Entrar com o Google
          </CustomButton>
          <LoginSubtitle>ou entre com seu e-mail</LoginSubtitle>
          <LoginInputContainer>
            <CustomInput
              label='E-mail'
              placeholder='Digite seu e-mail'
              {...register('email', { required: true })}
              hasError={!!errors?.email}
            />
          </LoginInputContainer>
          <LoginInputContainer>
            <CustomInput
              label='Senha'
              placeholder='Digite sua senha'
              {...register('password', { required: true })}
              hasError={!!errors?.password}
            />
          </LoginInputContainer>
          <CustomButton startIcon={<FiLogIn size={18} />}>Entrar</CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
