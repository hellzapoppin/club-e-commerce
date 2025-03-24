import CustomButton from '../../components/custom-button/custom-buttom.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import Header from '../../components/header/header.component'
import {
  SignUpContainer,
  SignupContent,
  SignUpHeadLine,
  SignUpInputContainer
} from './sign-up.styles'
import { FiLogIn } from 'react-icons/fi'

import { useForm } from 'react-hook-form'
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'

interface SignUpForm {
  name: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

const SignUpPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm<SignUpForm>()
  const handleSignUpClick = (data: SignUpForm) => {
    console.log(data)
  }
  return (
    <>
      <Header />
      <SignUpContainer>
        <SignupContent onSubmit={handleSubmit(handleSignUpClick)}>
          <SignUpHeadLine>Crie sua conta</SignUpHeadLine>
          <SignUpInputContainer>
            <p>Nome:</p>
            <CustomInput
              placeholder='Digite seu nome'
              {...register('name', { required: 'Nome obrigatório' })}
              hasError={!!errors?.name}
            ></CustomInput>
            {errors?.name && (
              <InputErrorMessage message={errors?.name?.message} />
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Sobrenome:</p>
            <CustomInput
              placeholder='Digite seu sobrenome'
              {...register('lastName', { required: 'Sobrenome obrigatório' })}
              hasError={!!errors?.lastName}
            ></CustomInput>
            {errors?.lastName && (
              <InputErrorMessage message={errors?.lastName?.message} />
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>E-mail:</p>
            <CustomInput
              placeholder='Digite seu e-mail'
              {...register('email', {
                required: 'E-mail obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Endereço de e-mail inválido'
                }
              })}
              hasError={!!errors?.email}
            ></CustomInput>
            {errors?.email && (
              <InputErrorMessage message={errors?.email?.message} />
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Senha:</p>
            <CustomInput
              type='password'
              placeholder='Digite seu senha'
              {...register('password', { required: 'Senha obrigatório' })}
              hasError={!!errors?.password}
            ></CustomInput>
            {errors?.password && (
              <InputErrorMessage message={errors?.password?.message} />
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Confirmação de senha</p>
            <CustomInput
              type='passwordConfirmation'
              placeholder='Digite novamente sua senha'
              {...register('passwordConfirmation', {
                required: 'Confirmação de senha obrigatório',
                validate: (value) => {
                  return value === getValues('password')
                    ? true
                    : 'Senhas não conferem'
                }
              })}
              hasError={!!errors?.passwordConfirmation}
            ></CustomInput>
            {errors?.passwordConfirmation && (
              <InputErrorMessage
                message={errors?.passwordConfirmation?.message}
              />
            )}
          </SignUpInputContainer>
          <CustomButton startIcon={<FiLogIn size={18} />}>
            Criar Conta
          </CustomButton>
        </SignupContent>
      </SignUpContainer>
    </>
  )
}

export default SignUpPage
