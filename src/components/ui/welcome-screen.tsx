"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useChatStore } from "@/hooks/use-chat-store"
import {
  MenuIcon,
  MessageSquareIcon,
  LightbulbIcon,
  CodeIcon,
  PenToolIcon,
  BookOpenIcon,
  CalculatorIcon,
  GlobeIcon,
} from "lucide-react"

interface WelcomeScreenProps {
  onToggleSidebar: () => void
}

/**
 * Welcome Screen Component - Shown when no chat is active
 * Features:
 * - Welcome message and branding
 * - Example prompts to get users started
 * - Quick action buttons
 * - Responsive grid layout
 */
export function WelcomeScreen({ onToggleSidebar }: WelcomeScreenProps) {
  const { createNewChat, sendMessage } = useChatStore()

  /**
   * Handle starting a new chat with a predefined prompt
   */
  const handleStartChat = async (prompt: string) => {
    const chatId = createNewChat()
    // Small delay to ensure chat is created before sending message
    setTimeout(() => {
      sendMessage(chatId, prompt, "user")
    }, 100)
  }

  // Predefined example prompts to help users get started
  const examplePrompts = [
    {
      icon: <LightbulbIcon className="w-5 h-5" />,
      title: "Creative Writing",
      prompt: "Help me write a creative short story about a time traveler who gets stuck in the past",
      category: "Creative",
    },
    {
      icon: <CodeIcon className="w-5 h-5" />,
      title: "Code Help",
      prompt: "Explain how to create a REST API with Node.js and Express",
      category: "Programming",
    },
    {
      icon: <BookOpenIcon className="w-5 h-5" />,
      title: "Learning",
      prompt: "Explain quantum physics in simple terms that a beginner can understand",
      category: "Education",
    },
    {
      icon: <PenToolIcon className="w-5 h-5" />,
      title: "Writing Assistant",
      prompt: "Help me improve this email to make it more professional and clear",
      category: "Writing",
    },
    {
      icon: <CalculatorIcon className="w-5 h-5" />,
      title: "Math Problem",
      prompt: "Solve this calculus problem step by step: find the derivative of x²sin(x)",
      category: "Math",
    },
    {
      icon: <GlobeIcon className="w-5 h-5" />,
      title: "General Knowledge",
      prompt: "What are the current major challenges in climate change and potential solutions?",
      category: "Knowledge",
    },
  ]

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="lg:hidden">
          <MenuIcon className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">ChatGPT Clone</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Welcome Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquareIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to ChatGPT Clone</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Your AI-powered assistant for conversations, creativity, and problem-solving
            </p>
          </div>

          {/* Features Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              What can I help you with today?
            </h2>

            {/* Example Prompts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examplePrompts.map((example, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                  onClick={() => handleStartChat(example.prompt)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                        {example.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm">{example.title}</h3>
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                            {example.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{example.prompt}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Capabilities Section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">💬 Conversations</h4>
                <p className="text-gray-600 dark:text-gray-400">Engage in natural conversations on any topic</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">🎨 Creative Tasks</h4>
                <p className="text-gray-600 dark:text-gray-400">Writing, brainstorming, and creative problem solving</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">🔧 Technical Help</h4>
                <p className="text-gray-600 dark:text-gray-400">Coding assistance, explanations, and debugging</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ready to start? Click on any example above or start typing below!
            </p>
            <Button
              onClick={() => handleStartChat("Hello! I'd like to start a conversation.")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Start New Conversation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
