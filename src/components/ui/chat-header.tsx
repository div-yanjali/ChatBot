"use client"

import { Button } from "@/components/ui/button"
import { MenuIcon, MoreVerticalIcon, ShareIcon, SettingsIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ChatHeaderProps {
  title: string
  onToggleSidebar: () => void
}

/**
 * Chat Header Component - Top bar of the chat interface
 * Features:
 * - Chat title display
 * - Sidebar toggle for mobile
 * - Action menu with options
 * - Responsive design
 */
export function ChatHeader({ title, onToggleSidebar }: ChatHeaderProps) {
  /**
   * Handle sharing the current chat
   */
  const handleShare = () => {
    // Implement share functionality
    console.log("Share chat:", title)
  }

  /**
   * Handle opening chat settings
   */
  const handleSettings = () => {
    // Implement settings functionality
    console.log("Open settings for:", title)
  }

  /**
   * Handle clearing the current chat
   */
  const handleClear = () => {
    // Implement clear chat functionality
    console.log("Clear chat:", title)
  }

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      {/* Left Section - Menu toggle and title */}
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="lg:hidden text-gray-600 dark:text-gray-400"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>

        {/* Chat title */}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{title}</h1>
      </div>

      {/* Right Section - Action menu */}
      <div className="flex items-center gap-2">
        {/* Share button - visible on larger screens */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="hidden sm:flex text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ShareIcon className="h-4 w-4 mr-2" />
          Share
        </Button>

        {/* More options dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <MoreVerticalIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            {/* Share option - mobile only */}
            <DropdownMenuItem onClick={handleShare} className="sm:hidden">
              <ShareIcon className="h-4 w-4 mr-2" />
              Share Chat
            </DropdownMenuItem>

            {/* Settings option */}
            <DropdownMenuItem onClick={handleSettings}>
              <SettingsIcon className="h-4 w-4 mr-2" />
              Chat Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Clear chat option */}
            <DropdownMenuItem onClick={handleClear} className="text-red-600 dark:text-red-400">
              Clear Chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
