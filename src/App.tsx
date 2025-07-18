// Library
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useDispatch } from 'react-redux'

// Pages
import CategoryDetailsPage from './pages/category-details/category-details.page'
import CheckoutPage from './pages/checkout/checkout.pages'
import ExplorePage from './pages/explore/explore.page'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import PaymentConfirmationPage from './pages/payment-confirmation/payment-confirmation.page'
import SignUpPage from './pages/sign-up/sign-up.page'

// Components
import AuthenticationGuard from './guards/authetication.guard'
import Cart from './components/cart/cart.component'
import Loading from './components/loading/loading.component'

// Utilities
import { auth, db } from './config/firebase.config'
import { userConverter } from './converters/firestore.converters'
import { loginUser, logoutUser } from './store/toolkit/user/user.slice'
import { useAppSelector } from './hooks/redux.hook'

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true)

  const dispatch = useDispatch()

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const isSigningOut = isAuthenticated && !user

      if (isSigningOut) {
        dispatch(logoutUser())
        // dispatch({ type: 'user/logout' })

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

        dispatch(loginUser(userFromFirebase))
        // dispatch({ type: 'user/login', payload: userFromFirebase })
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
