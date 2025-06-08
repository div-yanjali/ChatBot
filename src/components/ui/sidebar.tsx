"use client"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatHistoryItem } from "@/components/chat-history-item"
import { UserProfile } from "@/components/user-profile"
import { useChatStore } from "@/hooks/use-chat-store"
import { PlusIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Sidebar Component - Left navigation panel
 * Contains:
 * - New chat button
 * - Chat history list
 * - User profile section
 * - Responsive behavior for mobile/desktop
 */
export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { chats, createNewChat, currentChatId } = useChatStore()

  // Convert chats object to array for rendering, sorted by last updated
  const chatList = Object.values(chats).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )

  /**
   * Handle creating a new chat conversation
   * Closes mobile sidebar after creation
   */
  const handleNewChat = () => {
    createNewChat()
    onClose() // Close sidebar on mobile after creating new chat
  }

  return (
    <>
      {/* Mobile Overlay - Dark background when sidebar is open on mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar Container */}
      <div
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-semibold">ChatGPT Clone</h1>

          {/* Close button - Only visible on mobile */}
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <XIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Button
            onClick={handleNewChat}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
            variant="outline"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Chat History List */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2">
            {chatList.length > 0 ? (
              chatList.map((chat) => (
                <ChatHistoryItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                  onSelect={() => onClose()} // Close sidebar when chat is selected on mobile
                />
              ))
            ) : (
              // Empty state when no chats exist
              <div className="text-gray-400 text-sm text-center py-8">
                No conversations yet.
                <br />
                Start a new chat to begin!
              </div>
            )}
          </div>
        </ScrollArea>

        {/* User Profile Section - Bottom of sidebar */}
        <div className="border-t border-gray-700">
          <UserProfile />
        </div>
      </div>
    </>
  )
}
