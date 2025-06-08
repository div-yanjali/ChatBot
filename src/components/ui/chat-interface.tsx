"use client"

import { useState, useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageList } from "@/components/message-list"
import { MessageInput } from "@/components/message-input"
import { ChatHeader } from "@/components/chat-header"
import { useChatStore } from "@/hooks/use-chat-store"

interface ChatInterfaceProps {
  onToggleSidebar: () => void
}

/**
 * Chat Interface Component - Main chat area
 * Contains:
 * - Chat header with menu toggle
 * - Message list display
 * - Message input area
 * - Auto-scroll functionality
 */
export function ChatInterface({ onToggleSidebar }: ChatInterfaceProps) {
  const { currentChatId, chats, sendMessage } = useChatStore()
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get current chat data
  const currentChat = currentChatId ? chats[currentChatId] : null

  /**
   * Auto-scroll to bottom when new messages are added
   * Ensures user always sees the latest message
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [currentChat?.messages])

  /**
   * Handle sending a new message
   * Simulates AI response with loading state
   */
  const handleSendMessage = async (content: string) => {
    if (!currentChatId || !content.trim()) return

    setIsLoading(true)

    try {
      // Send user message
      await sendMessage(currentChatId, content, "user")

      // Simulate AI response delay (replace with actual API call)
      setTimeout(async () => {
        const aiResponse = generateAIResponse(content)
        await sendMessage(currentChatId, aiResponse, "assistant")
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
    }
  }

  // Early return if no chat is selected
  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">No chat selected</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Chat Header */}
      <ChatHeader title={currentChat.title} onToggleSidebar={onToggleSidebar} />

      {/* Messages Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 px-4">
          <div className="max-w-4xl mx-auto py-4">
            {/* Message List Component */}
            <MessageList messages={currentChat.messages} isLoading={isLoading} />

            {/* Scroll anchor for auto-scroll functionality */}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input Area */}
        <div className="border-t bg-white dark:bg-gray-800 px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <MessageInput
              onSendMessage={handleSendMessage}
              disabled={isLoading}
              placeholder="Message ChatGPT Clone..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Simulate AI response generation
 * In a real app, this would be replaced with an API call to your backend
 */
function generateAIResponse(userMessage: string): string {
  // Simple response simulation - replace with actual AI API integration
  const responses = [
    "I understand your question about: " + userMessage + ". Let me help you with that.",
    "That's an interesting point. Here's what I think about " + userMessage + "...",
    "Based on your message about " + userMessage + ", I can provide some insights.",
    "Thank you for asking about " + userMessage + ". Here's my response...",
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}
