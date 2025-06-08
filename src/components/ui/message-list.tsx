"use client"

import { MessageBubble } from "@/components/message-bubble"
import { TypingIndicator } from "@/components/typing-indicator"
import type { Message } from "@/types/chat"

interface MessageListProps {
  messages: Message[]
  isLoading?: boolean
}

/**
 * Message List Component - Renders all messages in a conversation
 * Handles:
 * - Displaying user and AI messages
 * - Loading states with typing indicator
 * - Message grouping and spacing
 */
export function MessageList({ messages, isLoading = false }: MessageListProps) {
  return (
    <div className="space-y-6">
      {/* Render all existing messages */}
      {messages.map((message, index) => (
        <MessageBubble key={message.id} message={message} isLast={index === messages.length - 1} />
      ))}

      {/* Show typing indicator when AI is responding */}
      {isLoading && (
        <div className="flex justify-start">
          <TypingIndicator />
        </div>
      )}

      {/* Empty state when no messages exist */}
      {messages.length === 0 && !isLoading && (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg mb-2">Start a conversation</p>
          <p className="text-sm">Type a message below to begin chatting</p>
        </div>
      )}
    </div>
  )
}
