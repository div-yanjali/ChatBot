"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  login: (user: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("govguide-user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save user to localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("govguide-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("govguide-user")
    }
  }, [user])

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("govguide-user")
  }

  const value = {
    user,
    setUser,
    login,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
