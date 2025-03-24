interface User {
  fistName: string
  lastName: string
  email: string
  provider: 'firebase' | 'google'
}

export default User
