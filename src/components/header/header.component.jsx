import './header.style.css'
import { BsCart3 } from 'react-icons/bs'
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'
import { useContext } from 'react'
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

const Header = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(UserContext)
  const { toggleCart, productsCount } = useContext(CartContext)
  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleSignupClick = () => {
    navigate('/sign-up')
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleExploreClick = () => {
    navigate('/explore')
  }
  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleLogoClick}>Club Clothing</HeaderTitle>
      <HeaderItems>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignupClick}>Criar Conta</HeaderItem>
          </>
        )}
        {isAuthenticated && (
          <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        )}
        <HeaderItem onClick={toggleCart}>
          <BsCart3 size={25} /> ({productsCount})
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
