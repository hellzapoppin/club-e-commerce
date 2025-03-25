import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './config/firebase.config'
import { useContext, useState } from 'react'
import { UserContext } from './contexts/user.context'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { userConverter } from './converters/firestore.converters'

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true)
  const { currentUser, isAuthenticated, logoutUser, loginUser } =
    useContext(UserContext)
  console.log(currentUser)
  onAuthStateChanged(auth, async (user) => {
    const isSigningOut = isAuthenticated && !user

    if (isSigningOut) {
      logoutUser()
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
      loginUser(userFromFirebase)
      return setIsInitializing(false)
    }
    setIsInitializing(false)
    console.log(user)
  })
  if (isInitializing) return null
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
