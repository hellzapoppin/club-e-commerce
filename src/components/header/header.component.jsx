import './header.style.css'
import { BsCart3 } from 'react-icons/bs'
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleSignupClick = () => {
    navigate('/sign-up')
  }
  return (
    <HeaderContainer>
      <HeaderTitle>Club Clothing</HeaderTitle>
      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
        <HeaderItem onClick={handleSignupClick}>Criar Conta</HeaderItem>
        <HeaderItem>
          <BsCart3 size={25} /> (5)
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
