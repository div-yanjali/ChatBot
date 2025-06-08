/**
 * Type definitions for the chat system
 * Defines the structure of chat-related data
 */

/**
 * Message interface - Represents a single message in a chat
 */
export interface Message {
  id: string // Unique identifier for the message
  content: string // The actual message text
  role: "user" | "assistant" // Who sent the message
  timestamp: string // ISO string of when message was sent
}

/**
 * Chat interface - Represents a complete chat conversation
 */
export interface Chat {
  id: string // Unique identifier for the chat
  title: string // Display title for the chat (auto-generated or user-set)
  messages: Message[] // Array of all messages in this chat
  createdAt: string // ISO string of when chat was created
  updatedAt: string // ISO string of when chat was last updated
}

/**
 * Chat state interface - For managing chat UI state
 */
export interface ChatState {
  isLoading: boolean // Whether AI is currently generating a response
  error: string | null // Any error message to display
}

/**
 * User interface - Represents user information
 */
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}
