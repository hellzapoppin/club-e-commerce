const UserActionTypes = {
  LOGIN: 'user/login' as const, // o as const infere ao invés do tipo do valor, no caso string, utilize a "palavra" como tipo, no caso "user/login"
  LOGOUT: 'user/logout' as const
}

export default UserActionTypes
