import React, { createContext, FunctionComponent, useState } from 'react'
import User from '../types/user.types'

interface UserContextInterface {
  currentUser: User | null
  isAuthenticated: boolean
  loginUser(user: User): void
  logoutUser(): void
}

export const UserContext = createContext<UserContextInterface>({
  currentUser: null,
  isAuthenticated: false,
  loginUser: () => {},
  logoutUser: () => {}
})

interface UserContextProps {
  children: React.ReactNode
}

const UserContextProvider: FunctionComponent<UserContextProps> = ({
  children
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const isAuthenticated = currentUser !== null

  const loginUser = (user: User) => {
    setCurrentUser(user)
  }

  const logoutUser = () => {
    setCurrentUser(null)
  }

  return (
    <UserContext.Provider
      value={{ currentUser, isAuthenticated, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
