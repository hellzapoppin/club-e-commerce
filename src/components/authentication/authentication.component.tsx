import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/user.context'
import { useNavigate } from 'react-router-dom'
import Header from '../header/header.component'
import Loading from '../loading/loading.component'

interface AuthenticationProps {
  children: React.ReactElement
}

const Authentication = ({ children }: AuthenticationProps) => {
  const { isAuthenticated } = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [])

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

export default Authentication
