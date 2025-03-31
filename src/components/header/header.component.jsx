// Library
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { BsCart3 } from 'react-icons/bs'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'

// Utilities
import { CartContext } from '../../contexts/cart.context'
import { auth } from '../../config/firebase.config'
import { logoutUser } from '../../store/reducers/user/user.actions'
import { useAppSelector } from '../../hooks/redux.hook'

// Styles
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'
import { toggleCart } from '../../store/reducers/cart/cart.actions'

const Header = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )

  const { productsCount } = useContext(CartContext)
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
    dispatch(logoutUser())
    signOut(auth)
  }

  const handleCartClick = () => {
    dispatch(toggleCart())
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
        <HeaderItem onClick={handleCartClick}>
          <BsCart3 size={25} /> ({productsCount})
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
