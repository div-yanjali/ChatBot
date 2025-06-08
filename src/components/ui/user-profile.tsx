"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserIcon, SettingsIcon, LogOutIcon, MoonIcon, SunIcon, HelpCircleIcon, CreditCardIcon } from "lucide-react"
import { useTheme } from "next-themes"

/**
 * User Profile Component - User account section in sidebar
 * Features:
 * - User avatar and name display
 * - Theme toggle (dark/light mode)
 * - Settings and account options
 * - Logout functionality
 */
export function UserProfile() {
  const { theme, setTheme } = useTheme()
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null, // In real app, this would be user's avatar URL
  })

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    // Implement logout logic
    console.log("User logout")
  }

  /**
   * Handle opening settings
   */
  const handleSettings = () => {
    // Implement settings navigation
    console.log("Open settings")
  }

  /**
   * Handle opening help/support
   */
  const handleHelp = () => {
    // Implement help navigation
    console.log("Open help")
  }

  /**
   * Handle opening billing/subscription
   */
  const handleBilling = () => {
    // Implement billing navigation
    console.log("Open billing")
  }

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-start gap-3 p-3 h-auto hover:bg-gray-800 text-left">
            {/* User Avatar */}
            <Avatar className="w-8 h-8 bg-blue-600">
              <AvatarFallback className="text-white text-sm">
                {user.avatar ? (
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-4 h-4" />
                )}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex-1 min-w-0 text-left">
              <div className="text-sm font-medium text-white truncate">{user.name}</div>
              <div className="text-xs text-gray-400 truncate">{user.email}</div>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" side="top" className="w-56 mb-2">
          {/* User Info Header */}
          <div className="px-3 py-2 border-b">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>

          {/* Theme Toggle */}
          <DropdownMenuItem onClick={toggleTheme}>
            {theme === "dark" ? (
              <>
                <SunIcon className="h-4 w-4 mr-2" />
                Light Mode
              </>
            ) : (
              <>
                <MoonIcon className="h-4 w-4 mr-2" />
                Dark Mode
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Account Options */}
          <DropdownMenuItem onClick={handleSettings}>
            <SettingsIcon className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleBilling}>
            <CreditCardIcon className="h-4 w-4 mr-2" />
            Billing & Plans
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleHelp}>
            <HelpCircleIcon className="h-4 w-4 mr-2" />
            Help & Support
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Logout */}
          <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
            <LogOutIcon className="h-4 w-4 mr-2" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
