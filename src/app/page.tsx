"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ChatInterface } from "@/components/chat-interface"
import { WelcomeScreen } from "@/components/welcome-screen"
import { useChatStore } from "@/hooks/use-chat-store"

export default function ChatGPTClone() {
  const { currentChatId, chats } = useChatStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const hasActiveChat = currentChatId && chats[currentChatId]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        {hasActiveChat ? (
          <ChatInterface onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        ) : (
          <WelcomeScreen onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        )}
      </div>
    </div>
  )
}