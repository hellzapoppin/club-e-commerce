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
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'
import {
  AuthError,
  AuthErrorCodes,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '../../config/firebase.config'

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm<LoginForm>()

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      console.log(userCredentials)
    } catch (error) {
      console.log(error)
      const _error = error as AuthError
      if (_error.code === AuthErrorCodes.INVALID_IDP_RESPONSE) {
        return setError('password', { message: 'E-mail e/ou senha inválidos' })
      }
    }
  }

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
            <p>E-mail</p>
            <CustomInput
              placeholder='Digite seu e-mail'
              {...register('email', {
                required: 'O e-mail é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Endereço de e-mail inválido'
                }
              })}
              hasError={!!errors?.email}
            />
            {errors?.email && (
              <InputErrorMessage message={errors?.email?.message} />
            )}
          </LoginInputContainer>
          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput
              type='password'
              placeholder='Digite sua senha'
              {...register('password', {
                required: 'A senha é obrigatória',
                validate: (value) => {
                  return value.trim() !== ''
                    ? true
                    : 'O campo senha não pode ser vazio'
                }
              })}
              hasError={!!errors?.password}
            />
            {errors?.password && (
              <InputErrorMessage message={errors?.password?.message} />
            )}
          </LoginInputContainer>
          <CustomButton startIcon={<FiLogIn size={18} />}>Entrar</CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
