import './header.style.css'
import { BsCart3 } from 'react-icons/bs'

const Header = () => {
  return (
    <div className='header-container'>
      <h1 className='header-title'>Club Clothing</h1>
      <div className='header-items'>
        <div className='header-item'>Explorar</div>
        <div className='header-item'>Login</div>
        <div className='header-item'>Criar Conta</div>
        <div className='header-item'>
          <BsCart3 size={25} /> (5)
        </div>
      </div>
    </div>
  )
}

export default Header
