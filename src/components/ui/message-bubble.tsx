"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Message } from "@/types/chat"
import { CopyIcon, ThumbsUpIcon, ThumbsDownIcon, UserIcon, BotIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  message: Message
  isLast?: boolean
}

/**
 * Message Bubble Component - Individual message display
 * Features:
 * - Different styling for user vs AI messages
 * - Copy message functionality
 * - Like/dislike buttons for AI messages
 * - Avatar display
 * - Timestamp formatting
 */
export function MessageBubble({ message, isLast = false }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null)

  const isUser = message.role === "user"
  const isAssistant = message.role === "assistant"

  /**
   * Copy message content to clipboard
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy message:", error)
    }
  }

  /**
   * Handle feedback (like/dislike) for AI messages
   */
  const handleFeedback = (type: "like" | "dislike") => {
    setFeedback(feedback === type ? null : type)
    // In a real app, you'd send this feedback to your backend
    console.log(`Feedback for message ${message.id}: ${type}`)
  }

  return (
    <div
      className={cn(
        "group flex gap-4 px-4 py-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
        isUser && "bg-gray-50 dark:bg-gray-800/30",
      )}
    >
      {/* Avatar Section */}
      <div className="flex-shrink-0">
        <Avatar className={cn("w-8 h-8", isUser ? "bg-blue-600" : "bg-green-600")}>
          <AvatarFallback className="text-white text-sm">
            {isUser ? <UserIcon className="w-4 h-4" /> : <BotIcon className="w-4 h-4" />}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Message Content Section */}
      <div className="flex-1 min-w-0">
        {/* Message Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-sm">{isUser ? "You" : "ChatGPT Clone"}</span>
          <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>

        {/* Message Text */}
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>

        {/* Message Actions - Only show on hover or for last message */}
        <div
          className={cn(
            "flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity",
            isLast && "opacity-100",
          )}
        >
          {/* Copy Button */}
          <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 px-2 text-gray-500 hover:text-gray-700">
            <CopyIcon className="w-4 h-4" />
            {copied && <span className="ml-1 text-xs">Copied!</span>}
          </Button>

          {/* Feedback Buttons - Only for AI messages */}
          {isAssistant && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFeedback("like")}
                className={cn(
                  "h-8 px-2 text-gray-500 hover:text-green-600",
                  feedback === "like" && "text-green-600 bg-green-50",
                )}
              >
                <ThumbsUpIcon className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFeedback("dislike")}
                className={cn(
                  "h-8 px-2 text-gray-500 hover:text-red-600",
                  feedback === "dislike" && "text-red-600 bg-red-50",
                )}
              >
                <ThumbsDownIcon className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
