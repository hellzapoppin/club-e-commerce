import './header.style.css'
import { BsCart3 } from 'react-icons/bs'
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'

const Header = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  )

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

  const handleSignOutClick = () => {
    dispatch({ type: 'LOGOUT_USER' })
    signOut(auth)
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
          <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
        )}
        <HeaderItem onClick={toggleCart}>
          <BsCart3 size={25} /> ({productsCount})
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
