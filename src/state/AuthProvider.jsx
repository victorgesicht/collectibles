import { useCallback, useMemo, useState } from 'react'
import {
  authenticate,
  createAccount,
  getSessionUser,
  signOut as clearSession,
} from '../lib/auth'
import { AuthContext } from './auth-context'

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSessionUser())

  const signUp = useCallback(async (details) => {
    const nextUser = await createAccount(details)
    setUser(nextUser)
    return nextUser
  }, [])

  const signIn = useCallback(async (details) => {
    const nextUser = await authenticate(details)
    setUser(nextUser)
    return nextUser
  }, [])

  const signOut = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, signUp, signIn, signOut }),
    [user, signUp, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
