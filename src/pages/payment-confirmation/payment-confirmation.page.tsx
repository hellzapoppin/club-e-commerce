// Library
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
  AiOutlineHome
} from 'react-icons/ai'
import { useDispatch } from 'react-redux'

// Styles
import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent
} from './payment-confirmation.styles'

// Components
import Header from '../../components/header/header.component'
import CustomButton from '../../components/custom-button/custom-buttom.component'

// Utilities
import Color from '../../theme/theme.colors'
import { clearCartProducts } from '../../store/reducers/cart/cart.actions'

const PaymentConfirmationPage = () => {
  const [searchParams] = useSearchParams()
  const status = searchParams.get('success')
  const isCanceled = searchParams.get('canceled')
  const navigate = useNavigate()
  const handleHomePageClick = () => {
    navigate('/')
  }
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'true') {
      dispatch(clearCartProducts())
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
