"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Chat, Message } from "@/types/chat"
interface ChatStore {
  // State
  chats: Record<string, Chat>
  currentChatId: string | null

  // Actions
  createNewChat: () => string
  setCurrentChat: (chatId: string) => void
  sendMessage: (chatId: string, content: string, role: "user" | "assistant") => Promise<void>
  deleteChat: (chatId: string) => void
  updateChatTitle: (chatId: string, title: string) => void
  clearAllChats: () => void
}

/**
 * Chat Store - Global state management for chat functionality
 * Uses Zustand for state management with persistence
 *
 * Features:
 * - Create and manage multiple chat conversations
 * - Send and receive messages
 * - Persist chat data to localStorage
 * - Auto-generate chat titles from first message
 */
export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // Initial state
      chats: {},
      currentChatId: null,

      /**
       * Create a new chat conversation
       * Returns the new chat ID
       */
      createNewChat: () => {
        const chatId = generateChatId()
        const newChat: Chat = {
          id: chatId,
          title: "New Chat",
          messages: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        set((state) => ({
          chats: {
            ...state.chats,
            [chatId]: newChat,
          },
          currentChatId: chatId,
        }))

        return chatId
      },

      /**
       * Set the currently active chat
       */
      setCurrentChat: (chatId: string) => {
        set({ currentChatId: chatId })
      },

      /**
       * Send a message to a specific chat
       */
      sendMessage: async (chatId: string, content: string, role: "user" | "assistant") => {
        const message: Message = {
          id: generateMessageId(),
          content,
          role,
          timestamp: new Date().toISOString(),
        }

        set((state) => {
          const chat = state.chats[chatId]
          if (!chat) return state

          const updatedChat = {
            ...chat,
            messages: [...chat.messages, message],
            updatedAt: new Date().toISOString(),
            // Auto-generate title from first user message
            title: chat.messages.length === 0 && role === "user" ? generateChatTitle(content) : chat.title,
          }

          return {
            ...state,
            chats: {
              ...state.chats,
              [chatId]: updatedChat,
            },
          }
        })
      },

      /**
       * Delete a chat conversation
       */
      deleteChat: (chatId: string) => {
        set((state) => {
          const { [chatId]: deletedChat, ...remainingChats } = state.chats

          // If we're deleting the current chat, clear the current chat ID
          const newCurrentChatId = state.currentChatId === chatId ? null : state.currentChatId

          return {
            chats: remainingChats,
            currentChatId: newCurrentChatId,
          }
        })
      },

      /**
       * Update the title of a chat
       */
      updateChatTitle: (chatId: string, title: string) => {
        set((state) => {
          const chat = state.chats[chatId]
          if (!chat) return state

          return {
            ...state,
            chats: {
              ...state.chats,
              [chatId]: {
                ...chat,
                title,
                updatedAt: new Date().toISOString(),
              },
            },
          }
        })
      },

      /**
       * Clear all chats (useful for logout or reset)
       */
      clearAllChats: () => {
        set({
          chats: {},
          currentChatId: null,
        })
      },
    }),
    {
      name: "chat-store", // localStorage key
      // Only persist the chats and currentChatId
      partialize: (state) => ({
        chats: state.chats,
        currentChatId: state.currentChatId,
      }),
    },
  ),
)

/**
 * Generate a unique chat ID
 */
function generateChatId(): string {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Generate a unique message ID
 */
function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Generate a chat title from the first message
 * Takes the first few words of the message as the title
 */
function generateChatTitle(content: string): string {
  const words = content.trim().split(" ")
  const title = words.slice(0, 6).join(" ")
  return title.length > 50 ? title.substring(0, 47) + "..." : title
}

