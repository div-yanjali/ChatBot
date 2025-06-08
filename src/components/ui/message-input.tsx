"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SendIcon, PaperclipIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

/**
 * Message Input Component - Text input area for sending messages
 * Features:
 * - Auto-resizing textarea
 * - Send button with loading state
 * - Keyboard shortcuts (Enter to send, Shift+Enter for new line)
 * - File attachment button (UI only)
 * - Character limit indication
 */
export function MessageInput({
  onSendMessage,
  disabled = false,
  placeholder = "Type your message...",
}: MessageInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Maximum message length
  const MAX_LENGTH = 4000

  /**
   * Auto-resize textarea based on content
   */
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px"
    }
  }

  // Adjust height when message changes
  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  /**
   * Handle sending message
   */
  const handleSend = () => {
    const trimmedMessage = message.trim()
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage)
      setMessage("")
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  /**
   * Handle keyboard shortcuts
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Send message on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  /**
   * Handle file attachment (UI only - implement actual file handling)
   */
  const handleFileAttach = () => {
    // Placeholder for file attachment functionality
    console.log("File attachment clicked - implement file upload logic")
  }

  const isMessageValid = message.trim().length > 0 && message.length <= MAX_LENGTH
  const isNearLimit = message.length > MAX_LENGTH * 0.8

  return (
    <div className="relative">
      {/* Input Container */}
      <div className="relative flex items-end gap-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        {/* File Attachment Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFileAttach}
          disabled={disabled}
          className="flex-shrink-0 text-gray-500 hover:text-gray-700 p-2"
        >
          <PaperclipIcon className="w-5 h-5" />
        </Button>

        {/* Message Textarea */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "min-h-[44px] max-h-[200px] resize-none border-0 shadow-none focus-visible:ring-0 p-0",
              "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            )}
            maxLength={MAX_LENGTH}
          />

          {/* Character Count - Show when approaching limit */}
          {isNearLimit && (
            <div
              className={cn(
                "absolute -bottom-6 right-0 text-xs",
                message.length > MAX_LENGTH ? "text-red-500" : "text-gray-400",
              )}
            >
              {message.length}/{MAX_LENGTH}
            </div>
          )}
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={disabled || !isMessageValid}
          size="sm"
          className={cn(
            "flex-shrink-0 p-2 transition-all",
            isMessageValid
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed",
          )}
        >
          <SendIcon className="w-5 h-5" />
        </Button>
      </div>

      {/* Helper Text */}
      <div className="flex justify-between items-center mt-2 px-1">
        <p className="text-xs text-gray-500">Press Enter to send, Shift + Enter for new line</p>

        {disabled && <p className="text-xs text-orange-500">AI is typing...</p>}
      </div>
    </div>
  )
}
