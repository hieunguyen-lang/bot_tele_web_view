// context/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { apiService } from '../utils/api';
import { usePathname } from 'next/navigation'

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  hasCheckedLogin: boolean;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loading: true,
  hasCheckedLogin: false,
  refreshAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const [hasCheckedLogin, setHasCheckedLogin] = useState(false)

  const checkLogin = async () => {
    try {
      const res = await apiService.get('user/me')
      if (res.status === 200) {
        setIsLoggedIn(true)
      }
    } catch (err) {
      setIsLoggedIn(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Không check ở route public
    const publicPaths = ['/', '/login', '/home','/about','/register']
    if (publicPaths.includes(pathname)) {
      setLoading(false)
      return
    }
    checkLogin()
  }, [pathname])

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, hasCheckedLogin, refreshAuth: checkLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
