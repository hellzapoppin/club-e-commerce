// Components
import CustomButton from '../../components/custom-button/custom-buttom.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import Header from '../../components/header/header.component'
import Loading from '../../components/loading/loading.component'
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'

// Styles
import {
  SignUpContainer,
  SignupContent,
  SignUpHeadLine,
  SignUpInputContainer
} from './sign-up.styles'
import { FiLogIn } from 'react-icons/fi'

// Utilities
import { auth, db } from '../../config/firebase.config'
import { useAppSelector } from '../../hooks/redux.hook'

// Library
import { useForm } from 'react-hook-form'
import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SignUpForm {
  firstName: string
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
    getValues,
    setError
  } = useForm<SignUpForm>()

  const [isLoading, setIsLoading] = useState(false)

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSignUpClick = async (data: SignUpForm) => {
    try {
      setIsLoading(true)
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      await addDoc(collection(db, 'users'), {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
        fistName: data.firstName,
        lastName: data.lastName,
        provider: 'firebase'
      })
    } catch (error) {
      console.log(error)
      const _error = error as AuthError
      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError('email', {
          message: 'E-mail já cadastrado'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />

      {isLoading && <Loading />}

      <SignUpContainer>
        <SignupContent onSubmit={handleSubmit(handleSignUpClick)}>
          <SignUpHeadLine>Crie sua conta</SignUpHeadLine>
          <SignUpInputContainer>
            <p>Nome:</p>
            <CustomInput
              placeholder='Digite seu nome'
              {...register('firstName', { required: 'Nome obrigatório' })}
              hasError={!!errors?.firstName}
            ></CustomInput>
            {errors?.firstName && (
              <InputErrorMessage message={errors?.firstName?.message} />
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
              {...register('password', {
                required: 'Senha obrigatório',
                minLength: {
                  value: 6,
                  message: 'A senha deve conter, no mínimo, 6 caracteres'
                }
              })}
              hasError={!!errors?.password}
            ></CustomInput>
            {errors?.password && (
              <InputErrorMessage message={errors?.password?.message} />
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Confirmação de senha</p>
            <CustomInput
              type='password'
              placeholder='Digite novamente sua senha'
              {...register('passwordConfirmation', {
                required: 'Confirmação de senha obrigatório',
                minLength: {
                  value: 6,
                  message:
                    'A confirmação de senha deve conter, no mínimo, 6 caracteres'
                },
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
