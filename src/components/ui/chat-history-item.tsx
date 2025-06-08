"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useChatStore } from "@/hooks/use-chat-store"
import type { Chat } from "@/types/chat"
import { MessageSquareIcon, MoreHorizontalIcon, TrashIcon, EditIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ChatHistoryItemProps {
  chat: Chat
  isActive: boolean
  onSelect: () => void
}

/**
 * Chat History Item Component - Individual chat item in sidebar
 * Features:
 * - Chat title display with truncation
 * - Active state styling
 * - Context menu with edit/delete options
 * - Hover effects and interactions
 */
export function ChatHistoryItem({ chat, isActive, onSelect }: ChatHistoryItemProps) {
  const { setCurrentChat, deleteChat, updateChatTitle } = useChatStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(chat.title)

  /**
   * Handle selecting this chat
   */
  const handleSelect = () => {
    setCurrentChat(chat.id)
    onSelect()
  }

  /**
   * Handle deleting this chat
   */
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(chat.id)
    }
  }

  /**
   * Handle starting edit mode
   */
  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  /**
   * Handle saving edited title
   */
  const handleSaveEdit = () => {
    const trimmedTitle = editTitle.trim()
    if (trimmedTitle && trimmedTitle !== chat.title) {
      updateChatTitle(chat.id, trimmedTitle)
    } else {
      setEditTitle(chat.title) // Reset if empty or unchanged
    }
    setIsEditing(false)
  }

  /**
   * Handle canceling edit
   */
  const handleCancelEdit = () => {
    setEditTitle(chat.title)
    setIsEditing(false)
  }

  /**
   * Handle key press in edit mode
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit()
    } else if (e.key === "Escape") {
      handleCancelEdit()
    }
  }

  // Get preview of the last message
  const lastMessage = chat.messages[chat.messages.length - 1]
  const messagePreview = lastMessage
    ? lastMessage.content.slice(0, 50) + (lastMessage.content.length > 50 ? "..." : "")
    : "No messages yet"

  return (
    <div
      className={cn(
        "group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-800",
        isActive && "bg-gray-800 border border-gray-600",
      )}
      onClick={handleSelect}
    >
      {/* Chat Icon */}
      <div className="flex-shrink-0">
        <MessageSquareIcon className="w-4 h-4 text-gray-400" />
      </div>

      {/* Chat Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          /* Edit Mode */
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyPress}
            className="w-full bg-gray-700 text-white text-sm px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          /* Display Mode */
          <div>
            <div className="text-sm font-medium text-white truncate">{chat.title}</div>
            <div className="text-xs text-gray-400 truncate mt-1">{messagePreview}</div>
          </div>
        )}
      </div>

      {/* Action Menu - Show on hover or when active */}
      {!isEditing && (
        <div
          className={cn(
            "flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
            isActive && "opacity-100",
          )}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={handleStartEdit}>
                <EditIcon className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleDelete} className="text-red-600 dark:text-red-400">
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Active Indicator */}
      {isActive && <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r" />}
    </div>
  )
}
