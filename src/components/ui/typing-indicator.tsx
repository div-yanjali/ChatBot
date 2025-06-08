"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BotIcon } from "lucide-react"

/**
 * Typing Indicator Component - Shows when AI is generating a response
 * Features:
 * - Animated dots to indicate typing
 * - Consistent styling with message bubbles
 * - AI avatar display
 */
export function TypingIndicator() {
  return (
    <div className="flex gap-4 px-4 py-6">
      {/* AI Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="w-8 h-8 bg-green-600">
          <AvatarFallback className="text-white text-sm">
            <BotIcon className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Typing Animation */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-sm">ChatGPT Clone</span>
          <span className="text-xs text-gray-500">is typing...</span>
        </div>

        {/* Animated Dots */}
        <div className="flex items-center gap-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
