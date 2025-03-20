import './header.style.css'
import { BsCart3 } from 'react-icons/bs'
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>Club Clothing</HeaderTitle>
      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <HeaderItem>Login</HeaderItem>
        <HeaderItem>Criar Conta</HeaderItem>
        <HeaderItem>
          <BsCart3 size={25} /> (5)
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
