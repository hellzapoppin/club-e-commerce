import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent
} from './payment-confirmation.styles'
import Header from '../../components/header/header.component'
import CustomButton from '../../components/custom-button/custom-buttom.component'
import {
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
  AiOutlineHome
} from 'react-icons/ai'
import Color from '../../theme/theme.colors'
import { useContext, useEffect } from 'react'
import { CartContext } from '../../contexts/cart.context'

const PaymentConfirmationPage = () => {
  const [searchParams] = useSearchParams()
  const status = searchParams.get('success')
  const isCanceled = searchParams.get('canceled')
  const navigate = useNavigate()
  const handleHomePageClick = () => {
    navigate('/')
  }
  const { clearProducts } = useContext(CartContext)

  useEffect(() => {
    if (status === 'true') {
      clearProducts()
    }
  }, [status])
  return (
    <>
      <Header />
      <PaymentConfirmationContainer>
        <PaymentConfirmationContent>
          {status === 'true' && (
            <>
              <AiOutlineCheckCircle size={120} color={Color.success} />
              <p>Sua compro foi realizada com sucesso</p>
            </>
          )}
          {status === 'false' ||
            (isCanceled && (
              <>
                <AiOutlineCloseCircle size={120} color={Color.error} />
                <p>
                  Ocorreu um erro ao finalizar sua compra. Favor tente
                  novamente!
                </p>
              </>
            ))}
          <CustomButton
            startIcon={<AiOutlineHome />}
            onClick={handleHomePageClick}
          >
            Ir para a página inicial
          </CustomButton>
        </PaymentConfirmationContent>
      </PaymentConfirmationContainer>
    </>
  )
}

export default PaymentConfirmationPage
