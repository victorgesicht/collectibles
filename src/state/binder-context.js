import { createContext, useContext } from 'react'

export const BinderContext = createContext(null)

export function useBinder() {
  const context = useContext(BinderContext)

  if (!context) {
    throw new Error('useBinder must be used inside BinderProvider.')
  }

  return context
}
