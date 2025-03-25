interface User {
  id: string
  fistName: string
  lastName: string
  email: string
  provider: 'firebase' | 'google'
}

export default User
