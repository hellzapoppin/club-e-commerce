import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './config/firebase.config'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { userConverter } from './converters/firestore.converters'
import Loading from './components/loading/loading.component'
import ExplorePage from './pages/explore/explore.page'
import CategoryDetailsPage from './pages/category-details/category-details.page'
import Cart from './components/cart/cart.component'
import CheckoutPage from './pages/checkout/checkout.pages'
import AuthenticationGuard from './guards/authetication.guard'
import PaymentConfirmationPage from './pages/payment-confirmation/payment-confirmation.page'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true)

  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  )

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const isSigningOut = isAuthenticated && !user

      if (isSigningOut) {
        dispatch({ type: 'LOGOUT_USER' })

        return setIsInitializing(false)
      }
      const isSigningIn = !isAuthenticated && user
      if (isSigningIn) {
        const querySnapshot = await getDocs(
          query(
            collection(db, 'users'),
            where('id', '==', user.uid)
          ).withConverter(userConverter)
        )
        const userFromFirebase = querySnapshot.docs[0]?.data()

        dispatch({ type: 'LOGIN_USER', payload: userFromFirebase })
        return setIsInitializing(false)
      }
      setIsInitializing(false)
    })
  }, [dispatch])

  if (isInitializing) return <Loading />
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/category/:id' element={<CategoryDetailsPage />} />
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route
          path='/checkout'
          element={
            <AuthenticationGuard>
              <CheckoutPage />
            </AuthenticationGuard>
          }
        />
        <Route
          path='/payment-confirmation'
          element={<PaymentConfirmationPage />}
        />
      </Routes>
      <Cart />
    </BrowserRouter>
  )
}

export default App
