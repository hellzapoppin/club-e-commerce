import React, { useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/user.context'
import Header from '../components/header/header.component'
import Loading from '../components/loading/loading.component'
import { useSelector } from 'react-redux'

interface AuthenticationProps {
  children: React.ReactElement
}

const AuthenticationGuard = ({ children }: AuthenticationProps) => {
  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  )
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Loading message='Você precisa estar logado para acessar essa página. Você será redirecionado para a página de login em instante...' />
      </>
    )
  }

  return children
}

export default AuthenticationGuard
