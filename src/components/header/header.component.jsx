// Library
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { BsCart3 } from 'react-icons/bs'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

// Utilities
import { CartContext } from '../../contexts/cart.context'
import { auth } from '../../config/firebase.config'
import { logout } from '../../store/reducers/user/user.actions'

// Styles
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'

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
    dispatch(logout)
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
