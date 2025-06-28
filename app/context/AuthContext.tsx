// context/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { apiService } from '../utils/api';
import { usePathname } from 'next/navigation'
const AuthContext = createContext({
  isLoggedIn: false,
  loading: true,
  hasCheckedLogin: false,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const [hasCheckedLogin, setHasCheckedLogin] = useState(false)
  useEffect(() => {
    // Không check ở route public
    const publicPaths = ['/', '/login', '/home','/about','/register']
    if (publicPaths.includes(pathname)) {
      setLoading(false)
      return
    }

    const checkLogin = async () => {
      try {
        const res = await apiService.get('/api/user/me')
        if (res.status === 200) {
          setIsLoggedIn(true)
        }
      } catch (err) {
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    checkLogin()
  }, [pathname])

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading,hasCheckedLogin  }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
